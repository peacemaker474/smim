import Post from '../models/Post.js';
import User from '../models/User.js';
// import Tag from '../models/Tag.js';

// 게시물 생성(Post Create)
export const postCreate = async (req, res) => {
  const { title, content, tag, targetAge } = req.body;
  console.log(req.body);

  if (!title) {
    return res.json({
      success: false,
      message: 'title이 undefined입니다.',
    });
  } else if (!tag) {
    return res.json({
      success: false,
      message: 'tag가 undefined입니다.',
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
    await Post.create({
      title,
      tagArray: tag,
      textContent: content,
      targetAge,
      owner: req.body.user.user_id,
    });
    return res.json({
      success: true,
      message: '새로운 게시글 작성이 완료되었습니다.',
    });
  }
};
// 게시물 수정
export const putEdit = async (req, res) => {
  const { id } = req.params;
  // const { title, tagArray, textContent, targetAge } = req.body;
  const postData = await Post.exists({ _id: id });
  if (postData) {
    await Post.findByIdAndUpdate(id, { title: req.body.title });
    return res.json({ result: 'success' });
  }
  return res.json(id);
};

// 게시물 보기(Post Detail Read)
export const getPostDetail = async (req, res) => {
  const { id } = req.params;
  const exist = await Post.exists({ _id: id, being: true });
  if (!exist) {
    return res.json({
      success: false,
      message: '존재하지 않거나 삭제된 게시물입니다.',
    });
  }

  const postData = await Post.findById(id);
  return res.json(postData);
};

// 나이별 게시물 보기(Post List Read)
export const getPostList = async (req, res) => {
  const { age } = req.query;

  if (!(age === '10' || age === '20' || age === '30' || age === '40' || age === '50')) {
    return res.json({
      success: false,
      message: '해당 연령대는 존재하지 않습니다',
    });
  }
  const postList = await Post.find({ age });
  res.json(postList);
};

// 게시물 삭제(Post List Delete)
export const deletePost = async (req, res) => {
  const { id } = req.params; // post id
  const { user_id } = req.body.user; // user id
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
  const { user_id } = req.body.user;
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
  const { user_id } = req.body.user;
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
