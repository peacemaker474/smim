import Post from '../models/Post.js';
import User from '../models/User.js';

export const getBookmark = async (req, res) => {
  const {
    user: { _id },
  } = req.body;

  try {
    const { bookmarks } = await User.findOne({ _id: _id });

    const newBook = await Promise.all(
      bookmarks.map(async (el) => {
        const post = await Post.findOne({ _id: el, being: true });
        return post;
      })
    );

    return res.status(200).send(newBook.filter((el) => el != null));
  } catch {
    console.log('get bookmark error');
  }
};

export const postBookmark = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.body;

  try {
    const exist = await Post.exists({ _id: id, being: true });
    const user = await User.findById({ _id: _id });

    if (!exist) {
      return res.status(404).send({
        success: false,
        message: '존재하지 않거나 삭제된 게시물입니다.',
      });
    }

    const check = user.bookmarks.includes(id);
    if (check) {
      return res.status(404).send({
        success: false,
        message: '이미 즐겨찾기한 게시글입니다',
      });
    }
    user.bookmarks.push(id);
    await user.save();
    return res.status(201).send({
      success: true,
      message: '즐겨찾기 성공했습니다.',
    });
  } catch {
    return res.status(500).send({
      success: false,
      message: '내부 서버 오류입니다.',
    });
  }
};

export const deleteBookmark = async (req, res) => {
  const { id } = req.params;
  const {
    user: { _id },
  } = req.body;

  try {
    const exist = await Post.exists({ _id: id, being: true });

    if (!exist) {
      return res.status(404).send({
        success: false,
        message: '존재하지 않거나 삭제된 게시물입니다.',
      });
    }
    const user = await User.findById({ _id: _id });

    const check = user.bookmarks.includes(id);
    if (!check) {
      return res.status(404).send({
        success: false,
        message: '즐겨찾기하지 않은 게시글입니다.',
      });
    }

    const bookmarkArray = user.bookmarks.filter((el) => el !== id);
    user.bookmarks = bookmarkArray;
    await user.save();
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
