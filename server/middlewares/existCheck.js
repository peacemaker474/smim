import Post from '../models/Post.js';

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
