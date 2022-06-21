import Comment from '../models/Comment.js';
import User from '../models/User.js';
import Post from '../models/Post.js';

// 댓글 생성(Comment Create)
export const postCommentCreate = async (req, res) => {
  const { post_id, content, parent_id } = req.body;
  const {
    user: { _id },
  } = req.body;

  try {
    const userExist = await User.exists({ _id: _id });
    const postExist = await Post.exists({ _id: post_id, being: true });

    if (parent_id != null) {
      if (parent_id === undefined) {
        return res.status(400).send({
          success: false,
          message: 'parent_id가 undefined입니다.',
        });
      }

      const commentExist = await Comment.exists({ _id: parent_id, being: true });

      if (!commentExist) {
        return res.status(400).send({
          success: false,
          message: '존재하지 않는 댓글입니다.',
        });
      }
    }

    if (!postExist) {
      return res.status(400).send({
        success: false,
        message: '존재하지 않거나 삭제된 게시물입니다.',
      });
    }

    if (!userExist) {
      return res.status(400).send({
        success: false,
        message: '존재하지 않거나 탈퇴한 사용자입니다.',
      });
    }

    if (!post_id) {
      return res.status(400).send({
        success: false,
        message: 'post_id가 undefined입니다.',
      });
    } else if (!content) {
      return res.status(400).send({
        success: false,
        message: 'content가 undefined입니다.',
      });
    } else {
      const comment = await Comment.create({
        text: content,
        writer: _id,
        post_id,
        parent_id,
      });

      if (parent_id != null) {
        const parentComment = await Comment.findOne({ _id: parent_id });
        parentComment.children.push(comment._id);
        await parentComment.save();
      }

      return res.status(200).send({
        success: true,
        comment_id: comment._id,
        message: '댓글 작성 성공했습니다.',
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

export const getCommentList = async (req, res) => {
  const { post_id } = req.query;

  try {
    const postExist = await Post.exists({ _id: post_id, being: true });

    if (!postExist) {
      return res.status(400).send({
        success: false,
        message: '존재하지 않거나 삭제된 게시물입니다.',
      });
    }

    if (!post_id) {
      return res.status(400).send({
        success: false,
        message: 'post_id가 undefined입니다.',
      });
    } else {
      const commentList = await Comment.find({
        post_id,
        parent_id: null,
      });

      const DATA = [];

      async function repeat(comment, check) {
        if (comment.length === 0) {
          return;
        }
        const commentDataList = await Promise.all(
          comment.map(async (el) => {
            const children = await Comment.find({ parent_id: el._id, post_id: el.post_id });
            const writer = await User.findOne({ _id: el.writer });

            return {
              ...el._doc,
              children,
              writer: {
                userId: writer.userId,
                _id: writer._id,
                nickname: writer.nickname,
              },
            };
          })
        );

        for (let i = 0; i < commentDataList.length; i++) {
          if (commentDataList[i].parent_id == null) {
            check = i;
            DATA[check] = [];
          }
          DATA[check].push(commentDataList[i]);
          await repeat(commentDataList[i].children, check);
        }
      }

      await repeat(commentList, 0);

      return res.status(200).send({
        success: true,
        data: DATA,
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

export const postCommentPinned = async (req, res) => {
  const { post_id, comment_id } = req.body;
  const {
    user: { _id },
  } = req.body;

  try {
    if (!post_id) {
      return res.status(400).send({
        success: false,
        message: 'post_id가 undefined입니다.',
      });
    } else if (!comment_id) {
      return res.status(400).send({
        success: false,
        message: 'comment_id가 undefined입니다.',
      });
    }

    const userExist = await User.exists({ _id: _id });
    const post = await Post.findOne({ _id: post_id, being: true, owner: _id });
    const commentExist = await Comment.exists({
      post_id: post_id,
      state: true,
      _id: comment_id,
      parent_id: null,
    });

    if (!commentExist) {
      return res.status(400).send({
        success: false,
        message: '고정할 수 없는 댓글입니다.',
      });
    }

    if (!post) {
      return res.status(400).send({
        success: false,
        message: '존재하지 않거나 삭제된 게시물입니다.',
      });
    }

    if (!userExist) {
      return res.status(400).send({
        success: false,
        message: '존재하지 않거나 탈퇴한 사용자입니다.',
      });
    }
    post.meta.pinnedCmnt = comment_id;
    await post.save();

    return res.status(201).send({
      success: true,
      message: '댓글 고정을 성공했습니다.',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};
