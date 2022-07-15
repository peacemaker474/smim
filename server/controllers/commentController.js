import Comment from '../models/Comment.js';
import User from '../models/User.js';
import Post from '../models/Post.js';

// 댓글 생성(Comment Create)
export const postCommentCreate = async (req, res) => {
  const { post_id: postId, content, parent_id: parentId } = req.body;
  const {
    user: { _id },
  } = req.body;

  try {
    const userExist = await User.exists({ _id: _id });
    const postExist = await Post.exists({ _id: postId, being: true });

    if (parentId != null) {
      if (parentId === undefined) {
        return res.status(400).send({
          success: false,
          message: 'parentId가 undefined입니다.',
        });
      }

      const commentExist = await Comment.exists({ _id: parentId, being: true });

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

    if (!postId) {
      return res.status(400).send({
        success: false,
        message: 'postId가 undefined입니다.',
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
        post_id: postId,
        parent_id: parentId,
      });

      if (parentId != null) {
        const parentComment = await Comment.findOne({ _id: parentId });
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

// 댓글 리스트 가져오기
export const getCommentList = async (req, res) => {
  const { id: postId } = req.params;
  const userData = {
    _id: undefined,
    nickname: undefined,
    userId: undefined,
  };
  if (Object.keys(req.body).includes('user')) {
    // 로그인 했을 때
    const {
      user: { _id, nickname, userId },
    } = req.body;
    userData._id = _id;
    userData.nickname = nickname;
    userData.userId = userId;
  }

  try {
    const postExist = await Post.exists({ _id: postId, being: true });

    if (!postExist) {
      return res.status(400).send({
        success: false,
        message: '존재하지 않거나 삭제된 게시물입니다.',
      });
    }

    if (!postId) {
      return res.status(400).send({
        success: false,
        message: 'postId가 undefined입니다.',
      });
    } else {
      const commentList = await Comment.find({
        post_id: postId,
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

            if (userData._id) {
              return {
                ...el._doc,
                children,
                writer: {
                  userId: writer.userId,
                  _id: writer._id,
                  nickname: writer.nickname,
                  imageUrl: writer.imageUrl,
                },
                like: el._doc.like_users.includes(userData._id),
              };
            } else {
              return {
                ...el._doc,
                children,
                writer: {
                  userId: writer.userId,
                  _id: writer._id,
                  nickname: writer.nickname,
                  imageUrl: writer.imageUrl,
                },
              };
            }
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
      // console.log(DATA);

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

// 댓글 고정하기
export const getCommentPinned = async (req, res) => {
  const { id: commentId } = req.params;

  const {
    user: { _id },
  } = req.body;

  try {
    if (!commentId) {
      return res.status(400).send({
        success: false,
        message: 'commentId가 undefined입니다.',
      });
    }

    const userExist = await User.exists({ _id: _id });
    const comment = await Comment.findOne({
      state: true,
      _id: commentId,
      parent_id: null,
    });

    const post = await Post.findOne({ _id: comment.post_id, being: true, owner: _id });

    if (!comment) {
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

    post.meta.pinnedCmnt = commentId;
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

// 댓글 고정하기
export const getCommentUnpinned = async (req, res) => {
  const { id: commentId } = req.params;

  const {
    user: { _id },
  } = req.body;

  try {
    if (!commentId) {
      return res.status(400).send({
        success: false,
        message: 'commentId가 undefined입니다.',
      });
    }

    const userExist = await User.exists({ _id: _id });
    const comment = await Comment.findOne({
      state: true,
      _id: commentId,
      parent_id: null,
    });

    const post = await Post.findOne({ _id: comment.post_id, being: true, owner: _id });

    if (!comment) {
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
    post.meta.pinnedCmnt = null;
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

// 댓글 좋아요
export const getCommentLike = async (req, res) => {
  const {
    user: { _id },
  } = req.body;
  const { id: commentId } = req.params;
  try {
    const comment = await Comment.findById(commentId);

    if (!commentId) {
      return res.status(400).send({
        success: false,
        message: '존재하지 않는 댓글입니다.',
      });
    }

    if (comment.like_users.includes(_id)) {
      return res.status(404).send({
        success: false,
        message: '이미 좋아요한 댓글입니다.',
      });
    }

    comment.like_count += 1;
    comment.like_users.push(_id);
    await comment.save();

    return res.status(200).send({
      success: true,
      message: '좋아요를 눌렀습니다.',
      data: {
        likes: comment.like_count,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: '내부 서버 오류입니다.',
    });
  }
};

// 댓글 좋아요 취소
export const getCommentUnlike = async (req, res) => {
  const {
    user: { _id },
  } = req.body;
  const { id: commentId } = req.params;
  try {
    const comment = await Comment.findById(commentId);

    if (!commentId) {
      return res.status(400).send({
        success: false,
        message: '존재하지 않는 댓글입니다.',
      });
    }

    if (!comment.like_users.includes(_id)) {
      return res.status(404).send({
        success: false,
        message: '좋아요를 하지않은 댓글입니다.',
      });
    }

    comment.like_count -= 1;
    comment.like_users = comment.like_users.filter((el) => el !== String(_id));
    await comment.save();

    return res.status(200).send({
      success: true,
      message: '좋아요를 취소하였습니다.',
      data: {
        likes: comment.like_count,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: '내부 서버 오류입니다.',
    });
  }
};

// 댓글 가져오기
export const getComment = async (req, res) => {
  const { id: commentId } = req.params; // comment id
  const userData = {
    _id: undefined,
    nickname: undefined,
    userId: undefined,
  };

  if (Object.keys(req.body).includes('user')) {
    // 로그인 했을 때
    const {
      user: { _id, nickname, userId },
    } = req.body;
    userData._id = _id;
    userData.nickname = nickname;
    userData.userId = userId;
  }

  if (!commentId) {
    return res.status(400).send({
      success: false,
      message: 'comment Id가 undefined입니다.',
    });
  }

  try {
    const comment = await Comment.findOne({ _id: commentId, being: true });

    if (userData._id) {
      const user = await User.findOne({ _id: userData._id, being: true });
      if (!user) {
        return res.status(400).send({
          success: false,
          message: '존재하지 않거나 탈퇴한 사용자입니다.',
        });
      }
    }

    if (!comment) {
      return res.status(400).send({
        success: false,
        message: '존재하지 않는 댓글입니다.',
      });
    }

    const DATA = [];
    const parentWriter = await User.findOne({ _id: comment.writer });
    DATA.push({
      ...comment._doc,
      writer: {
        userId: parentWriter.userId,
        _id: parentWriter._id,
        nickname: parentWriter.nickname,
        imageUrl: parentWriter.imageUrl,
      },
    });

    async function repeat(children, check) {
      if (children.length === 0) {
        return;
      }
      children.forEach(async (el) => {
        const child = await Comment.findById(el);
        const writer = await User.findOne({ _id: child.writer });
        console.log(writer);
        if (userData._id) {
          DATA.push({
            ...el._doc,

            writer: {
              userId: writer.userId,
              _id: writer._id,
              nickname: writer.nickname,
              imageUrl: writer.imageUrl,
            },
            like: el._doc.like_users.includes(userData._id),
          });
        } else {
          DATA.push({
            ...el._doc,
            writer: {
              userId: writer.userId,
              _id: writer._id,
              nickname: writer.nickname,
              imageUrl: writer.imageUrl,
            },
          });
        }
        await repeat(el.children);
      });
    }

    await repeat(comment.children);

    console.log(DATA);

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

// 댓글 수정하기
export const putCommentEdit = async (req, res) => {
  const { id: commentId } = req.params;
  const { post_id: postId, content: content } = req.body;
  const {
    user: { _id },
  } = req.body;

  if (!postId) {
    return res.status(400).send({
      success: false,
      message: 'postId가 undefined입니다.',
    });
  }
  if (!content) {
    return res.status(400).send({
      success: false,
      message: 'content가 undefined입니다.',
    });
  }

  try {
    const userExist = await User.exists({ _id: _id });
    const postExist = await Post.exists({ _id: postId, being: true });

    const commentData = await Comment.exists({ _id: commentId, being: true });

    if (!commentData) {
      return res.status(400).send({
        success: false,
        message: '존재하지 않는 댓글입니다.',
      });
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
    await Comment.findByIdAndUpdate(commentId, { being: false });
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
