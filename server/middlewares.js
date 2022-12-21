import Post from './models/Post.js';
import Comment from './models/Comment.js';
import Report from './models/Report.js';

// Post Middleware

// 요청한 User가 작성한 게시글인지를 체크하는 미들웨어
export const existPostAndOwnerCheck = async (req, res, next) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.body; // user id
  try {
    const exist = await Post.exists({ _id: id, owner: _id });

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
    const post = await Post.findOne({ _id: postId });

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

// 보낸 데이터에서 누락한 field의 유무를 체크하는 미들웨어
export const fieldCheck = async (req, res, next) => {
  const {
    title,
    content: { para },
    hashtag,
    targetAge,
  } = req.body;

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
  } else if (!para) {
    return res.status(400).send({
      success: false,
      message: 'para가 undefined입니다.',
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

// Commment Middleware

export const checkCommentUndefined = async (req, res, next) => {
  const { id: commentId } = req.params; // comment id

  if (!commentId) {
    return res.status(400).send({
      success: false,
      message: 'commentId가 undefined입니다.',
    });
  }

  next();
};

export const checkPostExistAndContent = async (req, res, next) => {
  const { postId } = req.body;
  const { content } = req.body;

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
    const postExist = await Post.exists({ _id: postId });

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

export const checkParamCommentExistAndData = async (req, res, next) => {
  const { id: commentId } = req.params;

  try {
    const comment = await Comment.findOne({ _id: commentId });

    if (!comment) {
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
      message: error.message,
    });
  }
};

export const checkCommentPinned = async (req, res, next) => {
  const { id: commentId } = req.params;
  const {
    user: { _id },
  } = req.body;

  try {
    const comment = await Comment.findOne({
      _id: commentId,
      parentId: null,
    });

    const post = await Post.findOne({ _id: comment.postId, owner: _id });

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
    req.post = post;

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

export const addAgeGroup = (req, res, next) => {
  const { birthday } = req.body;

  const nowYear = new Date().getFullYear();
  const age = +birthday.slice(0, 4);
  const calculate = nowYear - age;
  let ageGroup;

  if (calculate < 20) {
    ageGroup = 10;
  } else if (calculate < 30) {
    ageGroup = 20;
  } else if (calculate < 40) {
    ageGroup = 30;
  } else if (calculate < 50) {
    ageGroup = 40;
  } else {
    ageGroup = 50;
  }

  req.body = {
    ...req.body,
    ageGroup,
  };
  next();
};

//Report Middleware
export const checkReportExist = async (req, res, next) => {
  const { id } = req.params;
  const { user } = req.body;

  try {
    const existingReport = await Report.findOne({
      targetId: id,
    });

    if (existingReport) {
      req.body.report = existingReport;
    }

    if (existingReport && existingReport.reporter.includes(user._id)) {
      return res.status(200).send({
        success: true,
        message: '이미 신고한 게시물 또는 댓글입니다',
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

export const checkPostAndCommentExist = async (req, res, next) => {
  const { id, target } = req.params;
  let exist = false;

  try {
    if (target === 'post') {
      exist = await Post.exists({ _id: id });
    } else {
      exist = await Comment.exists({ _id: id });
    }

    if (!exist) {
      return res.status(200).send({
        success: true,
        message: '존재하지 않는 게시물 또는 댓글입니다',
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
