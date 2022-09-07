import User from '../models/User.js';
import Post from '../models/Post.js';

export const getBookmark = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.body;

  try {
    const user = await User.findById(_id);

    const check = user.bookmarks.includes(id);

    if (check) {
      return res.status(404).send({
        success: false,
        message: '이미 즐겨찾기한 게시글입니다',
      });
    }
    const post = await Post.findById(id);
    user.bookmarks.push(id);
    post.meta.bookmarks.push(_id);

    await user.save();
    await post.save();

    return res.status(201).send({
      success: true,
      message: '즐겨찾기를 성공했습니다.',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: '내부 서버 오류입니다.',
    });
  }
};

export const getUnbookmark = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.body;

  try {
    const user = await User.findById({ _id: _id });

    const check = user.bookmarks.includes(id);
    if (!check) {
      return res.status(404).send({
        success: false,
        message: '즐겨찾기하지 않은 게시글입니다.',
      });
    }

    const post = await Post.findById(id);
    const userArray = post.meta.bookmarks.filter((el) => el !== _id);
    post.meta.bookmarks = userArray;

    const bookmarkPostArray = user.bookmarks.filter((el) => el !== id);
    user.bookmarks = bookmarkPostArray;

    await user.save();
    await post.save();

    return res.status(200).send({
      success: false,
      message: '즐겨찾기를 취소했습니다.',
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: '내부 서버 오류입니다.',
    });
  }
};
