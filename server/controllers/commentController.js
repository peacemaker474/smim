import Comment from '../models/Comment.js';
import Post from '../models/Post.js';
import User from '../models/User.js';

// 댓글 생성(Comment Create)
export const postCommentCreate = async (req, res) => {
  const { postId, content, parentId } = req.body;
  const {
    user: { _id },
  } = req.body;

  try {
    if (parentId !== null) {
      if (parentId === undefined) {
        return res.status(400).send({
          success: false,
          message: 'parentId가 undefined입니다.',
        });
      }

      const commentExist = await Comment.exists({ _id: parentId });

      if (!commentExist) {
        return res.status(400).send({
          success: false,
          message: '존재하지 않는 댓글입니다.',
        });
      }
    }

    const comment = await Comment.create({
      text: content,
      writer: _id,
      postId,
      parentId,
    });

    if (parentId !== null) {
      const parentComment = await Comment.findOne({ _id: parentId });
      parentComment.children.push(comment._id);
      await parentComment.save();
    }

    return res.status(200).send({
      success: true,
      comment_id: comment._id,
      message: '댓글 작성 성공했습니다.',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

// 댓글 리스트 가져오기
export const getCommentList = async (req, res) => {
  const { id: postId } = req.params;

  const userData = {
    _id: undefined,
    nickname: undefined,
    userId: undefined,
    ageGroup: undefined,
  };

  if (!postId) {
    return res.status(400).send({
      success: false,
      message: 'postId가 undefined입니다.',
    });
  }

  if (Object.keys(req.body).includes('user')) {
    // 로그인 했을 때
    const {
      user: { _id, nickname, userId, ageGroup },
    } = req.body;
    userData._id = _id;
    userData.nickname = nickname;
    userData.userId = userId;
    ageGroup.ageGroup = ageGroup;
  }

  try {
    const postExist = await Post.exists({ _id: postId });

    if (!postExist) {
      return res.status(400).send({
        success: false,
        message: '존재하지 않거나 삭제된 게시물입니다.',
      });
    }

    const commentList = await Comment.find({
      postId,
      parentId: null,
    });

    const DATA = [];

    async function repeat(comment, check) {
      if (comment.length === 0) {
        return;
      }
      const commentDataList = await Promise.all(
        comment.map(async (el) => {
          const children = await Comment.find({
            parentId: el._id,
            postId: el.postId,
          });
          const writer = await User.findOne({ _id: el.writer });

          if (userData._id) {
            // 로그인 했을 때
            return {
              ...el._doc,
              children,
              writer: {
                userId: writer.userId,
                _id: writer._id,
                nickname: writer.nickname,
                imageUrl: writer.imageUrl,
                ageGroup: writer.ageGroup,
              },
              like: el._doc.likeUsers.includes(userData._id),
            };
          } else {
            // 로그인 안했을 때
            return {
              ...el._doc,
              children,
              writer: {
                userId: writer.userId,
                _id: writer._id,
                nickname: writer.nickname,
                imageUrl: writer.imageUrl,
                ageGroup: writer.ageGroup,
              },
            };
          }
        })
      );

      for (let i = 0; i < commentDataList.length; i++) {
        if (commentDataList[i].parentId === null) {
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
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

// 댓글 가져오기
export const getComment = async (req, res) => {
  const { comment } = req;
  const userData = {
    _id: undefined,
    nickname: undefined,
    userId: undefined,
    ageGroup: undefined,
  };

  if (Object.keys(req.body).includes('user')) {
    // 로그인 했을 때
    const {
      user: { _id, nickname, userId, ageGroup },
    } = req.body;
    userData._id = _id;
    userData.nickname = nickname;
    userData.userId = userId;
    userData.ageGroup = ageGroup;
  }

  try {
    const DATA = [];
    const parentWriter = await User.findOne({ _id: comment.writer });
    if (userData._id) {
      // 로그인 했을 때
      DATA.push({
        ...comment._doc,
        writer: {
          userId: parentWriter.userId,
          _id: parentWriter._id,
          nickname: parentWriter.nickname,
          imageUrl: parentWriter.imageUrl,
          ageGroup: parentWriter.ageGroup,
        },
        like: comment.likeUsers.includes(userData._id),
      });
    } else {
      // 로그인 안했을 때
      DATA.push({
        ...comment._doc,
        writer: {
          userId: parentWriter.userId,
          _id: parentWriter._id,
          nickname: parentWriter.nickname,
          imageUrl: parentWriter.imageUrl,
          ageGroup: parentWriter.ageGroup,
        },
      });
    }

    async function repeat(children) {
      if (children.length === 0) {
        return;
      }

      await Promise.all(
        children.map(async (el) => {
          const child = await Comment.findById(el);

          const writer = await User.findOne({ _id: child.writer });
          if (userData._id) {
            // 로그인 했을 때
            DATA.push({
              ...child._doc,
              writer: {
                userId: writer.userId,
                _id: writer._id,
                nickname: writer.nickname,
                imageUrl: writer.imageUrl,
                ageGroup: writer.ageGroup,
              },
              like: child.likeUsers.includes(userData._id),
            });
          } else {
            // 로그인 안했을 때
            DATA.push({
              ...el._doc,
              writer: {
                userId: writer.userId,
                _id: writer._id,
                nickname: writer.nickname,
                imageUrl: writer.imageUrl,
                ageGroup: writer.ageGroup,
              },
            });
          }
          await repeat(child.children);
        })
      );
    }

    await repeat(comment.children);

    return res.status(200).send({
      success: true,
      data: DATA,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: '내부 서버 오류입니다.',
    });
  }
};

// 댓글 고정하기
export const getCommentPinned = async (req, res) => {
  const { id: commentId } = req.params;
  const { post } = req;

  try {
    post.meta.pinnedCmnt = commentId;
    post.meta.answer = true;
    await post.save();

    return res.status(200).send({
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

// 댓글 고정 취소하기
export const getCommentUnpinned = async (req, res) => {
  const { post } = req;

  try {
    post.meta.pinnedCmnt = null;
    post.meta.answer = false;
    await post.save();

    return res.status(200).send({
      success: true,
      message: '고정댓글을 해제했습니다.',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

// 댓글 수정하기
export const putCommentEdit = async (req, res) => {
  const { id: commentId } = req.params;
  const { content: content } = req.body;

  try {
    await Comment.findByIdAndUpdate(commentId, { text: content });

    return res.status(200).send({
      success: true,
      message: '댓글 수정이 완료되었습니다.',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

// 댓글 삭제하기
export const deleteComment = async (req, res) => {
  const { id: commentId } = req.params; // comment id

  try {
    const comment = await Comment.findOne({
      _id: commentId,
    });

    if (comment.parentId !== null) {
      const parentComment = await Comment.findOne({
        _id: comment.parentId,
      });
      const childrenCmnts = parentComment.children.filter(
        (el) => el !== commentId
      );
      parentComment.children = childrenCmnts;
      await parentComment.save();
    }

    await Comment.deleteOne({ _id: commentId });
    return res.status(200).send({
      success: true,
      message: '댓글 삭제가 완료되었습니다.',
    });
  } catch {
    return res.status(500).send({
      success: false,
      message: '내부 서버 오류입니다.',
    });
  }
};
