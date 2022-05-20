import Comment from '../models/Comment.js';
import User from '../models/User.js';
import Post from '../models/Post.js';

// 댓글 생성(Comment Create)
export const postCommentCreate = async (req, res) => {
  const { post_id, content, parent_id } = req.body;
  const { user: user_id } = req.body;

  try {
    const userExist = await User.exists({ _id: user_id });
    const postExist = await Post.exists({ _id: post_id, being: true });

    if (!postExist) {
      return res.json({
        success: false,
        message: '존재하지 않거나 삭제된 게시물입니다.',
      });
    }

    if (!userExist) {
      return res.json({
        success: false,
        message: '존재하지 않거나 탈퇴한 사용자입니다.',
      });
    }

    if (!post_id) {
      return res.json({
        success: false,
        message: 'post_id가 undefined입니다.',
      });
    } else if (!content) {
      return res.json({
        success: false,
        message: 'content가 undefined입니다.',
      });
    } else if (parent_id === '' || parent_id === 'undefined') {
      return res.json({
        success: false,
        message: 'parent_id가 undefined입니다.',
      });
    } else {
      await Comment.create({
        text: content,
        writer_id: user_id,
        post_id,
        parent_id,
      });
      return res.json({
        success: true,
        message: '댓글 작성 성공했습니다.',
      });
    }
  } catch (error) {
    return res.json({
      success: false,
      message: error._message,
    });
  }
};
