import Like from '../models/Like.js';

// 게시물 좋아요
export const getPostLike = async (req, res) => {
  const {
    user: { _id },
  } = req.body;
  const post = req.post;
  try {
    const like = await Like.findOne({ post_id: post._id });

    if (like.user_array.includes(_id)) {
      return res.status(404).send({
        success: false,
        message: '이미 좋아요한 게시물입니다.',
      });
    }

    post.meta.likes += 1;
    await post.save();

    like.user_array.push(_id);
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
    const like = await Like.findOne({ post_id: post._id });

    if (!like.user_array.includes(_id)) {
      return res.status(404).send({
        success: true,
        message: '좋아요를 누르지 않은 게시물입니다.',
      });
    }

    post.meta.likes -= 1;
    await post.save();
    like.user_array = like.user_array.filter((el) => toString(el) !== toString(_id));
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
    user: { _id },
  } = req.body;
  const { comment } = req;

  try {
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
  const { comment } = req;

  try {
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
