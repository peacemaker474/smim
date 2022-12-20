import Post from '../models/Post.js';
import User from '../models/User.js';
import Like from '../models/Like.js';
import Comment from '../models/Comment.js';

// 게시물 생성(Post Create)
export const postPostCreate = async (req, res) => {
  const {
    title,
    content: { para },
    hashtag,
    targetAge,
  } = req.body;
  const {
    user: { _id },
  } = req.body;

  try {
    const user = await User.findById(_id);
    const post = await Post.create({
      title,
      hashtag,
      content: para,
      targetAge,
      owner: _id,
    });
    await Like.create({
      postId: post._id,
    });

    user.posts.push(post._id);
    await user.save();
    return res.status(201).send({
      success: true,
      message: '새로운 게시글 작성이 완료되었습니다.',
      postId: post.id,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: '내부 서버 오류입니다.',
    });
  }
};

// 게시물 수정(Post Edit)
export const putPostEdit = async (req, res) => {
  const { id: postId } = req.params;
  const {
    content: { para },
  } = req.body;

  try {
    await Post.findByIdAndUpdate(postId, { ...req.body, content: para });
    return res.status(201).send({
      success: true,
      message: '게시글 수정이 완료되었습니다.',
      postId,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: '내부 서버 오류입니다.',
    });
  }
};
// 게시물 보기(Post Detail Read)
export const getPostDetail = async (req, res) => {
  const { id: postId } = req.params;
  const post = req.post;

  try {
    const owner = await User.findById(String(post.owner));
    const like = await Like.findOne({ postId });

    const age = String(post._doc.targetAge);

    if (Object.keys(req.body).includes('user')) {
      // 로그인 했을 때
      const {
        user: { _id },
      } = req.body;
      const user = await User.findOne({ _id: _id });
      return res.status(200).send({
        ...post._doc,
        targetAge: age,
        bookmark: user.bookmarks.includes(postId),
        like: like.userArray.includes(_id),
        owner: {
          _id: owner._id,
          userId: owner.userId,
          nickname: owner.nickname,
          imageUrl: owner.imageUrl,
          ageGroup: owner.ageGroup,
        },
      });
    }

    // 로그인 안했을 때
    return res.status(200).send({
      ...post._doc,
      targetAge: age,
      owner: {
        _id: owner._id,
        userId: owner.userId,
        nickname: owner.nickname,
        imageUrl: owner.imageUrl,
        ageGroup: owner.ageGroup,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: '내부 서버 오류입니다.',
    });
  }
};

// 나이별 게시물 보기(Post List Read)
export const getPostList = async (req, res) => {
  const { age, page, filter, tag, keyword } = req.query;

  if (
    !(
      age === '10' ||
      age === '20' ||
      age === '30' ||
      age === '40' ||
      age === '50'
    )
  ) {
    return res.status(404).send({
      success: false,
      message: '해당 연령대는 존재하지 않습니다',
    });
  }

  let pageNum = parseInt(page);
  let skipNum = pageNum === 1 ? 0 : (pageNum - 1) * 6;
  let nextNum = pageNum * 6;
  let filterOption = {};

  if (filter === 'newer') {
    filterOption = { createAt: -1 };
  } else if (filter === 'popular') {
    filterOption = { 'meta.likes': -1, createAt: -1 };
  } else if (filter === 'older') {
    filterOption = { createAt: 1 };
  }

  try {
    let postDataList = await Post.find({
      targetAge: age,
      [tag]: new RegExp(keyword),
    })
      .sort(filterOption)
      .skip(skipNum)
      .limit(10);
    let nextPostList = await Post.find({
      targetAge: age,
      [tag]: new RegExp(keyword),
    })
      .sort(filterOption)
      .skip(nextNum);

    let postDataUserList = await Promise.all(
      postDataList.map(async (el) => {
        const user = await User.findById(String(el.owner));
        return {
          ...el._doc,
          owner: {
            _id: user._id,
            nickname: user.nickname,
            userId: user.userId,
            imageUrl: user.imageUrl,
            ageGroup: user.ageGroup,
          },
        };
      })
    );

    return res.status(200).send({
      data: postDataUserList,
      page: pageNum,
      lastPage: !Boolean(nextPostList.length),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: '내부 서버 오류입니다.',
    });
  }
};

// 게시물 삭제(Post List Delete)
export const deletePost = async (req, res) => {
  const { id: postId } = req.params;
  const {
    user: { _id },
  } = req.body;

  try {
    const owner = await User.findById(_id);
    const post = await Post.findById(postId);

    const createdPostArr = owner.posts.filter((id) => id !== postId);
    owner.posts = createdPostArr;
    await owner.save();

    await Promise.all(
      post.meta.bookmarks.map(async (el) => {
        const user = await User.findById(el);
        const bookmarkPostArr = user.bookmarks.filter((id) => id !== postId);
        user.bookmarks = bookmarkPostArr;
        await user.save();
      })
    );

    await Post.deleteOne({ _id: postId });
    await Like.deleteOne({ _id: postId });
    await Comment.deleteMany({ _id: postId });

    return res.status(200).send({
      success: true,
      message: '게시글 삭제가 완료되었습니다.',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: '내부 서버 오류입니다.',
    });
  }
};

// 게시물 조회수
export const getPostView = async (req, res) => {
  try {
    const post = req.post;

    post.meta.views += 1;
    await post.save();
    return res.status(200).send({
      success: true,
      message: '게시글을 조회했습니다.',
      data: {
        views: post.meta.views,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: '내부 서버 오류입니다.',
    });
  }
};

export const getMainPageLists = async (req, res) => {
  try {
    const postLists = {
      10: [],
      20: [],
      30: [],
      40: [],
      50: [],
    };
    const posts = await Post.find().sort({ createAt: -1 });

    const newPosts = await Promise.all(
      posts.map(async (el) => {
        const user = await User.findById(String(el.owner));
        return {
          ...el._doc,
          owner: { nickname: user.nickname },
        };
      })
    );

    const answerNotPosts = newPosts.filter(
      (item) => item.meta.answer === false
    );
    const answerPosts = newPosts.filter((item) => item.meta.answer === true);

    answerNotPosts.forEach((el) => {
      if (postLists[el.targetAge].length < 5)
        return postLists[el.targetAge].push(el);
    });

    answerPosts.forEach((el) => {
      if (postLists[el.targetAge].length < 5)
        return postLists[el.targetAge].push(el);
    });

    return res.status(200).send({ success: true, lists: postLists });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: '다시 시도해주세요.' });
  }
};

export const postPostImageUpload = (req, res) => {
  res.json({ url: `${req.file.location}`, key: req.file.key });
};
