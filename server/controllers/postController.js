import Post from '../models/Post.js';
import User from '../models/User.js';
import Like from '../models/Like.js';
// import Tag from '../models/Tag.js';

// 게시물 생성(Post Create)
export const postCreate = async (req, res) => {
  const { title, content, hashtag, targetAge } = req.body;
  const {
    user: { _id },
  } = req.body;
  const user = await User.findById({ _id: _id });
  if (!title) {
    return res.json({
      success: false,
      message: 'title이 undefined입니다.',
    });
  } else if (!hashtag) {
    return res.json({
      success: false,
      message: 'hashtag가 undefined입니다.',
    });
  } else if (!content) {
    return res.json({
      success: false,
      message: 'content가 undefined입니다.',
    });
  } else if (
    !(
      targetAge === '10' ||
      targetAge === '20' ||
      targetAge === '30' ||
      targetAge === '40' ||
      targetAge === '50'
    )
  ) {
    return res.json({
      success: false,
      message: '해당 연령대는 존재하지 않습니다',
    });
  } else {
    try {
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
      return res.json({
        success: true,
        message: '새로운 게시글 작성이 완료되었습니다.',
      });
    } catch (error) {
      console.log(error);
    }
  }
};
// 게시물 수정(Post Edit)
export const putEdit = async (req, res) => {
  const { id } = req.params;
  const { title, content, hashtag, targetAge } = req.body;

  try {
    const exist = await Post.exists({ _id: id, being: true });
    if (!exist) {
      return res.json({
        success: false,
        message: '존재하지 않거나 삭제된 게시물입니다.',
      });
    }

    if (!title) {
      return res.json({
        success: false,
        message: 'title이 undefined입니다.',
      });
    } else if (!hashtag) {
      return res.json({
        success: false,
        message: 'hashtag가 undefined입니다.',
      });
    } else if (!content) {
      return res.json({
        success: false,
        message: 'content가 undefined입니다.',
      });
    } else if (
      !(
        targetAge === '10' ||
        targetAge === '20' ||
        targetAge === '30' ||
        targetAge === '40' ||
        targetAge === '50'
      )
    ) {
      return res.json({
        success: false,
        message: '해당 연령대는 존재하지 않습니다',
      });
    } else {
      await Post.findByIdAndUpdate(id, { ...req.body });
      return res.json({
        success: true,
        message: '게시글 수정이 완료되었습니다.',
      });
    }
  } catch {
    return res.json({
      success: false,
      message: '게시물의 아이디가 올바르지 않습니다.',
    });
  }
};
// 게시물 보기(Post Detail Read)
export const getPostDetail = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id, nickname, userId },
  } = req.body;
  try {
    const postData = await Post.findById(id);

    if (!postData) {
      return res.json({
        success: false,
        message: '존재하지 않거나 삭제된 게시물입니다.',
      });
    }

    const owner = await User.findById(String(postData.owner));
    const user = await User.findOne({ _id: _id });
    const like = await Like.findOne({ post_id: id });

    if (!user) {
      return res.json({
        ...postData._doc,
        owner: { _id, userId, nickname, imageUrl: owner.imageUrl },
      });
    }

    return res.json({
      ...postData._doc,
      bookmark: user.bookmarks.includes(id),
      like: like.user_array.includes(_id),
      owner: { _id, userId, nickname, imageUrl: owner.imageUrl },
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: '에러가 발생했습니다.',
    });
  }
};

// 나이별 게시물 보기(Post List Read)
export const getPostList = async (req, res) => {
  const { age } = req.query;
  console.log(age);

  if (!(age === '10' || age === '20' || age === '30' || age === '40' || age === '50')) {
    return res.json({
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

  return res.json(postDataList);
};

// 게시물 삭제(Post List Delete)
export const deletePost = async (req, res) => {
  const { id } = req.params; // post id
  const {
    user: { _id, nickname, userId },
  } = req.body; // user id
  try {
    const postData = await Post.find({ _id: id, owner: _id, being: true });

    if (postData.length === 0) {
      return res.json({
        success: false,
        message: '존재하지 않거나 삭제된 게시물입니다.',
      });
    }

    await Post.findByIdAndUpdate(id, { being: false });
    return res.json({
      success: true,
      message: '게시글 삭제가 완료되었습니다.',
    });
  } catch {
    return res.json({
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
    return res.json({
      success: false,
      message: '존재하지 않거나 삭제된 게시물입니다.',
    });
  }

  post.meta.views += 1;
  await post.save();
  return res.json('succes');
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
    return res.json({ success: true, lists: postLists });
  });
};
