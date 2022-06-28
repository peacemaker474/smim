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
      targetAge === 10 ||
      targetAge === 20 ||
      targetAge === 30 ||
      targetAge === 40 ||
      targetAge === 50
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
