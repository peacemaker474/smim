import Post from '../models/Post.js';
import Like from '../models/Like.js';

// 게시물 좋아요
export const getPostLike = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.body;
  try {
    const post = await Post.findOne({ _id: id, being: true });
    const like = await Like.findOne({ post_id: post._id });

    if (!post) {
      return res.json({
        success: false,
        message: '존재하지 않거나 삭제된 게시물입니다.',
      });
    }

    if (like.user_array.includes(_id)) {
      return res.json({
        success: false,
        message: '이미 좋아요한 게시물입니다.',
      });
    }

    post.meta.likes += 1;
    await post.save();

    like.user_array.push(_id);
    await like.save();

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
  const {
    user: { _id },
  } = req.body;
  try {
    const post = await Post.findOne({ _id: id, being: true });
    const like = await Like.findOne({ post_id: post._id });

    if (!post) {
      return res.json({
        success: false,
        message: '존재하지 않거나 삭제된 게시물입니다.',
      });
    }

    if (!like.user_array.includes(_id)) {
      return res.json({
        success: true,
        message: '좋아요를 누르지 않은 게시물입니다.',
      });
    }

    post.meta.likes -= 1;
    await post.save();
    like.user_array = like.user_array.filter((el) => el !== user_id);

    await like.save();

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
