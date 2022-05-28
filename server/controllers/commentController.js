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

    if (parent_id != null) {
      if (parent_id === undefined) {
        return res.json({
          success: false,
          message: 'parent_id가 undefined입니다.',
        });
      }

      const commentExist = await Comment.exists({ _id: parent_id, being: true });

      if (!commentExist) {
        return res.json({
          success: false,
          message: '존재하지 않는 댓글입니다.',
        });
      }
    }

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
    } else {
      const comment = await Comment.create({
        text: content,
        writer_id: user_id,
        post_id,
        parent_id,
      });

      return res.json({
        success: true,
        comment_id: comment._id,
        message: '댓글 작성 성공했습니다.',
      });
    }
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getCommentList = async (req, res) => {
  const { post_id } = req.query;
  console.log(post_id);

  try {
    const postExist = await Post.exists({ _id: post_id, being: true });

    if (!postExist) {
      return res.json({
        success: false,
        message: '존재하지 않거나 삭제된 게시물입니다.',
      });
    }

    if (!post_id) {
      return res.json({
        success: false,
        message: 'post_id가 undefined입니다.',
      });
    } else {
      const commentList = await Comment.find({
        post_id,
        parent_id: null,
      });

      const commentDataList = await Promise.all(
        commentList.map(async (el) => {
          const children = await Comment.find({ parent_id: el._id, post_id: el.post_id });
          return {
            ...el._doc,
            children,
          };
        })
      );
      return res.json(commentDataList);
    }
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
