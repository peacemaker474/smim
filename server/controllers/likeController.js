import Post from '../models/Post.js';
import User from '../models/User.js';

// 게시물 좋아요
export const getPostLike = async (req, res) => {
  const { id } = req.params;
  const { user: user_id } = req.body;
  try {
    const post = await Post.findOne({ _id: id, being: true });
    const user = await User.findById({ _id: user_id });

    if (!post) {
      return res.json({
        success: false,
        message: '존재하지 않거나 삭제된 게시물입니다.',
      });
    }

    if (user.likes.includes(id)) {
      return res.json({
        success: false,
        message: '이미 좋아요한 게시물입니다.',
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
  } catch {
    return res.json({
      success: false,
      message: '게시물의 아이디가 올바르지 않습니다.',
    });
  }
};

// 게시물 좋아요 취소
export const getPostUnlike = async (req, res) => {
  const { id } = req.params;
  const { user: user_id } = req.body;

  try {
    const post = await Post.findOne({ _id: id, being: true });
    const user = await User.findById({ _id: user_id });

    if (!post) {
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
    user.likes = user.likes.filter((el) => el !== id);
    console.log(user.likes);
    await user.save();

    return res.json({
      success: true,
      message: '좋아요를 취소했습니다.',
    });
  } catch {
    return res.json({
      success: false,
      message: '게시물의 아이디가 올바르지 않습니다.',
    });
  }
};
