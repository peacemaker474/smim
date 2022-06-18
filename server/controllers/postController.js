import Post from '../models/Post.js';
import User from '../models/User.js';
import Like from '../models/Like.js';
// import Tag from '../models/Tag.js';

// 게시물 생성(Post Create)
export const postPostCreate = async (req, res) => {
  const { title, content, hashtag, targetAge } = req.body;
  const {
    user: { _id },
  } = req.body;

  try {
    const user = await User.findById({ _id: _id });
    const post = await Post.create({
      title,
      hashtag,
      content,
      targetAge,
      owner: _id,
    });
    await Like.create({
      post_id: post._id,
    });

    user.posts.push(post._id);
    await user.save();
    return res.status(200).send({
      success: true,
      message: '새로운 게시글 작성이 완료되었습니다.',
    });
  } catch (error) {
    console.log(error);
  }
};

// 게시물 수정(Post Edit)
export const putPostEdit = async (req, res) => {
  const { id } = req.params;

  try {
    const exist = await Post.exists({ _id: id, being: true });

    if (!exist) {
      return res.status(400).send({
        success: false,
        message: '존재하지 않거나 삭제된 게시물입니다.',
      });
    }

    await Post.findByIdAndUpdate(id, { ...req.body });
    return res.status(200).send({
      success: true,
      message: '게시글 수정이 완료되었습니다.',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: '게시물의 아이디가 올바르지 않습니다.',
    });
  }
};
// 게시물 보기(Post Detail Read)
export const getPostDetail = async (req, res) => {
  const { id: postId } = req.params;

  try {
    const postData = await Post.findById(postId);

    if (!postData) {
      return res.status(400).send({
        success: false,
        message: '존재하지 않거나 삭제된 게시물입니다.',
      });
    }

    const owner = await User.findById(String(postData.owner));
    const like = await Like.findOne({ post_id: postId });

    if (Object.keys(req.body).includes('user')) {
      // 로그인 했을 때
      const {
        user: { _id, nickname, userId },
      } = req.body;
      const user = await User.findOne({ _id: _id });
      return res.status(200).send({
        ...postData._doc,
        bookmark: user.bookmarks.includes(postId),
        like: like.user_array.includes(_id),
        owner: {
          _id: owner._id,
          userId: owner.userId,
          nickname: owner.nickname,
          imageUrl: owner.imageUrl,
        },
      });
    }
    // 로그인 안했을 때
    return res.status(200).send({
      ...postData._doc,
      owner: {
        _id: owner._id,
        userId: owner.userId,
        nickname: owner.nickname,
        imageUrl: owner.imageUrl,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: '에러가 발생했습니다.',
    });
  }
};

// 나이별 게시물 보기(Post List Read)
export const getPostList = async (req, res) => {
  const { age } = req.query;

  if (!(age === '10' || age === '20' || age === '30' || age === '40' || age === '50')) {
    return res.status(400).send({
      success: false,
      message: '해당 연령대는 존재하지 않습니다',
    });
  }
  const postList = await Post.find({ targetAge: age, being: true });

  const postDataList = await Promise.all(
    postList.map(async (el) => {
      const user = await User.findById(String(el.owner));
      return {
        ...el._doc,
        owner: {
          _id: user._id,
          nickname: user.nickname,
          userId: user.userId,
          imageUrl: user.imageUrl,
        },
      };
    })
  );

  return res.status(200).send(postDataList);
};

// 게시물 삭제(Post List Delete)
export const deletePost = async (req, res) => {
  const { id } = req.params; // post id
  const {
    user: { _id },
  } = req.body; // user id
  try {
    const postData = await Post.find({ _id: id, owner: _id, being: true });

    if (postData.length === 0) {
      return res.status(400).send({
        success: false,
        message: '존재하지 않거나 삭제된 게시물입니다.',
      });
    }

    await Post.findByIdAndUpdate(id, { being: false });
    return res.status(200).send({
      success: true,
      message: '게시글 삭제가 완료되었습니다.',
    });
  } catch {
    return res.status(500).send({
      success: false,
      message: '게시물의 아이디가 올바르지 않습니다.',
    });
  }
};

// 게시물 조회수
export const getPostView = async (req, res) => {
  const { id } = req.params;
  const post = await Post.find({ _id: id, being: true });

  if (post.length === 0) {
    return res.status(400).send({
      success: false,
      message: '존재하지 않거나 삭제된 게시물입니다.',
    });
  }

  post.meta.views += 1;
  await post.save();
  return res.status(200).send('succes');
};

// 게시글 검색
export const getPostSearch = async (req, res) => {
  const { age, tag, keyword } = req.query;

  if (!(parseInt(age) >= 60)) {
    return res.json({
      success: false,
      message: '해당 연령대는 존재하지 않습니다',
    });
  }
  const postList = await Post.find({ targetAge: age, being: true });

  const postDataList = await Promise.all(
    postList
      .filter((el) => el[tag].includes(keyword))
      .map(async (el) => {
        const user = await User.findById(String(el.owner));
        return {
          ...el._doc,
          owner: { _id: user._id, nickname: user.nickname, imageUrl: user.imageUrl },
        };
      })
  );

  return res.json(postDataList);
};

export const getMainPageLists = async (req, res) => {
  Post.find((err, posts) => {
    const postLists = {
      10: [],
      20: [],
      30: [],
      40: [],
      50: [],
    };
    if (err) console.log(err);
    else {
      posts.forEach((el) => {
        if (postLists[el.targetAge].length < 5 && el.meta.pinnedCmnt === false) {
          postLists[el.targetAge].push(el);
        } else if (postLists[el.targetAge].length < 5) {
          postLists[el.targetAge].push(el);
        }
      });
    }
    return res.status(200).send({ success: true, lists: postLists });
  });
};
