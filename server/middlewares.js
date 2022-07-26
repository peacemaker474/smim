import multer from 'multer';
import path from 'path';
import Post from './models/Post.js';

// 요청한 User가 작성한 게시글인지를 체크하는 미들웨어
export const existPostAndOwnerCheck = async (req, res, next) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.body; // user id
  try {
    const exist = await Post.exists({ _id: id, owner: _id, being: true });

    if (!exist) {
      return res.status(400).send({
        success: false,
        message: '존재하지 않거나 삭제된 게시물입니다.',
      });
    }
    next();
  } catch {
    return res.status(500).send({
      success: false,
      message: '내부 서버 오류입니다.',
    });
  }
};

// post id가 DB에 존재하는지 체크하고, req.post에 post Data를 넣어서 보내주는 미들웨어
export const existPostCheckAndData = async (req, res, next) => {
  const { id: postId } = req.params;
  try {
    const post = await Post.findOne({ _id: postId, being: true });

    if (!post) {
      return res.status(404).send({
        success: false,
        message: '존재하지 않거나 삭제된 게시물입니다.',
      });
    }
    req.post = post;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: '내부 서버 오류입니다.',
    });
  }
};

// User와 상관없이 DB에 존재하는 게시글인지 체크하는 미들웨어
export const existPostCheck = async (req, res, next) => {
  const { id } = req.params;
  try {
    const exist = await Post.exists({ _id: id, being: true });

    if (!exist) {
      return res.status(404).send({
        success: false,
        message: '존재하지 않거나 삭제된 게시물입니다.',
      });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: '내부 서버 오류입니다.',
    });
  }
};

// 보낸 데이터에서 누락한 field의 유무를 체크하는 미들웨어
export const fieldCheck = async (req, res, next) => {
  const { title, content, hashtag, targetAge } = req.body;

  if (!title) {
    return res.status(400).send({
      success: false,
      message: 'title이 undefined입니다.',
    });
  } else if (!hashtag) {
    return res.status(400).send({
      success: false,
      message: 'hashtag가 undefined입니다.',
    });
  } else if (!content) {
    return res.status(400).send({
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
    return res.status(400).send({
      success: false,
      message: '해당 연령대는 존재하지 않습니다',
    });
    // 400을 할지 404를 할지
  } else {
    next();
  }
};

export const userImgUpload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/users/');
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
    limits: {
      fileSize: 5 * 1024 * 1024,
    },
  }),
});

export const checkCommentLike = async (req, res) => {
  const {
    user: { _id },
  } = req.body;
  const { id: commentId } = req.params;

  if (!commentId) {
    return res.status(400).send({
      success: false,
      message: 'commentId가 undefined입니다.',
    });
  }

  try {
    const userExist = await User.exists({ _id: _id });

    if (!userExist) {
      return res.status(400).send({
        success: false,
        message: '존재하지 않거나 탈퇴한 사용자입니다.',
      });
    }
    const comment = await Comment.findById(commentId);

    if (!commentId) {
      return res.status(400).send({
        success: false,
        message: '존재하지 않는 댓글입니다.',
      });
    }

    req.comment = comment;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: '내부 서버 오류입니다.',
    });
  }
};

export const checkCommentPinned = async (req, res) => {
  const { id: commentId } = req.params;

  const {
    user: { _id },
  } = req.body;

  if (!commentId) {
    return res.status(400).send({
      success: false,
      message: 'commentId가 undefined입니다.',
    });
  }

  try {
    const userExist = await User.exists({ _id: _id });

    if (!userExist) {
      return res.status(400).send({
        success: false,
        message: '존재하지 않거나 탈퇴한 사용자입니다.',
      });
    }

    const comment = await Comment.findOne({
      state: true,
      _id: commentId,
      parent_id: null,
    });

    const post = await Post.findOne({ _id: comment.post_id, being: true, owner: _id });

    if (!post) {
      return res.status(400).send({
        success: false,
        message: '존재하지 않거나 삭제된 게시물입니다.',
      });
    }

    req.post = post;
    req.comment = comment;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

export const checkParentIdComment = async (req, res) => {
  const { parent_id: parentId } = req.body;

  if (parentId != null) {
    // parentId가 null이 아닌데 undefined인 경우
    if (parentId === undefined) {
      return res.status(400).send({
        success: false,
        message: 'parentId가 undefined입니다.',
      });
    }
  }
  next();
};

export const existUserAndPost = async (req, res) => {
  const { post_id: postId } = req.body;
  const {
    user: { _id },
  } = req.body;

  try {
    const userExist = await User.exists({ _id: _id });
    const postExist = await Post.exists({ _id: postId, being: true });

    if (!userExist) {
      return res.status(400).send({
        success: false,
        message: '존재하지 않거나 탈퇴한 사용자입니다.',
      });
    }

    if (!postExist) {
      return res.status(400).send({
        success: false,
        message: '존재하지 않거나 삭제된 게시물입니다.',
      });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

export const checkCommentValue = async (req, res) => {
  const { id: commentId } = req.params;
  const { post_id: postId, content: content } = req.body;

  try {
    const commentData = await Comment.exists({ _id: commentId, being: true });

    if (!commentData) {
      return res.status(400).send({
        success: false,
        message: '존재하지 않는 댓글입니다.',
      });
    }

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

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

export const checkCommentCreateAndEdit = async (req, res) => {
  const { post_id: postId, content, parent_id: parentId } = req.body;

  try {
    if (parentId != null) {
      // parentId가 null이 아닌데 undefined인 경우
      if (parentId === undefined) {
        return res.status(400).send({
          success: false,
          message: 'parentId가 undefined입니다.',
        });
      }
    }

    const commentExist = await Comment.exists({ _id: parentId, being: true });

    if (!commentExist) {
      return res.status(400).send({
        success: false,
        message: '존재하지 않는 댓글입니다.',
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
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

export const postImageUpload = multer({
  storage: multer.diskStorage({
    // 저장할 장소
    destination(req, file, cb) {
      cb(null, 'public/uploads');
    },
    // 저장할 이미지의 파일명
    filename(req, file, cb) {
      const ext = path.extname(file.originalname); // 파일의 확장자
      console.log('file.originalname', file.originalname);
      // 파일명이 절대 겹치지 않도록 해줘야한다.
      // 파일이름 + 현재시간밀리초 + 파일확장자명
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  // limits: { fileSize: 5 * 1024 * 1024 } // 파일 크기 제한
});
