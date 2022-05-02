import Post from '../models/Post.js';
import User from '../models/User.js';
// import Tag from '../models/Tag.js';

// 게시물 생성(Post Create)
export const postCreate = async (req, res) => {
  const { title, content, hashtag, targetAge } = req.body;
  const { user: user_id } = req.body;
  const user = await User.findById({ _id: user_id });
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
    const post = await Post.create({
      title,
      hashtag,
      content,
      targetAge,
      owner: user_id,
    });
    user.posts.push(post._id);
    await user.save();
    return res.json({
      success: true,
      message: '새로운 게시글 작성이 완료되었습니다.',
    });
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
    console.log('put edit controller error');
  }
};

// 게시물 보기(Post Detail Read)
export const getPostDetail = async (req, res) => {
  const { id } = req.params;

  try {
    const postData = await Post.findById(id);

    if (!postData) {
      return res.json({
        success: false,
        message: '존재하지 않거나 삭제된 게시물입니다.',
      });
    }
    // console.log({ ...postData._doc });
    const user = await User.findById(String(postData.owner));

    return res.json({
      ...postData._doc,
      owner: { _id: user._id, nickname: user.nickname, imageUrl: user.imageUrl },
    });
  } catch {
    console.log('get post detail error');
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
  console.log(postList);
  // const userList = await Promise.all(
  //   postList.map((el) => {
  //     const user = User.findById(el.owner);
  //     return user;
  //   })
  // );

  return res.json(postList);

  // const postData = await Promise.all(
  //   postList.map((el) => {
  //     const user = User.findById(String(el.owner));
  //     console.log(user);
  //     return {
  //       ...el._doc,
  //       owner: { _id: user._id, nickname: user.nickname, imageUrl: user.imageUrl },
  //     };
  // })
  // );
  // res.json(postData);
};

// 게시물 삭제(Post List Delete)
export const deletePost = async (req, res) => {
  const { id } = req.params; // post id
  const { user: user_id } = req.body; // user id
  const postData = await Post.find({ _id: id, owner: user_id, being: true });

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

// 게시물 좋아요
export const getPostLike = async (req, res) => {
  const { id } = req.params;
  const { user: user_id } = req.body;
  const post = await Post.findOne({ _id: id, being: true });
  const user = await User.findById({ _id: user_id });

  if (post.length === 0) {
    return res.json({
      success: false,
      message: '존재하지 않거나 삭제된 게시물입니다.',
    });
  }

  post.meta.likes += 1;
  await post.save();

  user.likes.push(id);
  await user.save();

  return res.json({
    success: true,
    message: '좋아요를 눌렀습니다.',
  });
};

// 게시물 좋아요 취소
export const getPostUnlike = async (req, res) => {
  const { id } = req.params;
  const { user: user_id } = req.body;
  const post = await Post.findOne({ _id: id, being: true });
  const user = await User.findById({ _id: user_id });

  if (post.length === 0) {
    return res.json({
      success: false,
      message: '존재하지 않거나 삭제된 게시물입니다.',
    });
  }

  if (!user.likes.includes(id)) {
    return res.json({
      success: true,
      message: '좋아요를 누르지 않은 게시물입니다.',
    });
  }

  post.meta.likes -= 1;
  await post.save();
  user.likes.push(id);
  await user.save();

  return res.json({
    success: true,
    message: '좋아요를 취소했습니다.',
  });
};
