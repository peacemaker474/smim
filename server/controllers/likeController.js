import Like from '../models/Like.js';

// 게시물 좋아요
export const getPostLike = async (req, res) => {
  const {
    user: { _id },
  } = req.body;
  const post = req.post;
  try {
    const like = await Like.findOne({ postId: post._id });

    if (like.userArray.includes(_id)) {
      return res.status(404).send({
        success: false,
        message: '이미 좋아요한 게시물입니다.',
      });
    }

    post.meta.likes += 1;
    await post.save();

    like.userArray.push(_id);
    await like.save();

    return res.status(200).send({
      success: true,
      message: '좋아요를 눌렀습니다.',
      data: {
        likes: post.meta.likes,
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

// 게시물 좋아요 취소
export const getPostUnlike = async (req, res) => {
  const {
    user: { _id },
  } = req.body;
  const post = req.post;
  try {
    const like = await Like.findOne({ postId: post._id });

    if (!like.userArray.includes(_id)) {
      return res.status(404).send({
        success: true,
        message: '좋아요를 누르지 않은 게시물입니다.',
      });
    }

    post.meta.likes -= 1;
    await post.save();
    like.userArray = like.userArray.filter(
      (el) => toString(el) !== toString(_id)
    );
    await like.save();

    return res.status(200).send({
      success: true,
      message: '좋아요를 취소했습니다.',
      data: {
        likes: post.meta.likes,
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

// 댓글 좋아요
export const getCommentLike = async (req, res) => {
  const {
    user: { userId },
  } = req.body;
  const { comment } = req;

  try {
    if (comment.likeUsers.includes(userId)) {
      return res.status(404).send({
        success: false,
        message: '이미 좋아요한 댓글입니다.',
      });
    }

    comment.likeCount += 1;
    comment.likeUsers.push(userId);
    await comment.save();

    return res.status(200).send({
      success: true,
      message: '좋아요를 눌렀습니다.',
      data: {
        likes: comment.likeCount,
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
    user: { userId },
  } = req.body;
  const { comment } = req;

  try {
    if (!comment.likeUsers.includes(userId)) {
      return res.status(404).send({
        success: false,
        message: '좋아요를 하지않은 댓글입니다.',
      });
    }

    comment.likeCount -= 1;
    comment.likeUsers = comment.likeUsers.filter((el) => el !== String(userId));
    await comment.save();

    return res.status(200).send({
      success: true,
      message: '좋아요를 취소하였습니다.',
      data: {
        likes: comment.likeCount,
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
