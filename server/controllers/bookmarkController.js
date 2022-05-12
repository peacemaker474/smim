import Post from '../models/Post.js';
import User from '../models/User.js';

export const getBookmark = async (req, res) => {
  const { user: user_id } = req.body;

  try {
    const { bookmarks } = await User.findOne({ _id: user_id });

    const newBook = await Promise.all(
      bookmarks.map(async (el) => {
        const post = await Post.findOne({ _id: el, being: true });
        return post;
      })
    );

    return res.json(newBook.filter((el) => el != null));
  } catch {
    console.log('get bookmark error');
  }
};

export const postBookmark = async (req, res) => {
  const { id } = req.params;
  const { user: user_id } = req.body;

  try {
    const exist = await Post.exists({ _id: id, being: true });
    const user = await User.findById({ _id: user_id });

    if (!exist) {
      return res.json({
        success: false,
        message: '존재하지 않거나 삭제된 게시물입니다.',
      });
    }

    const check = user.bookmarks.includes(id);
    if (check) {
      return res.json({
        success: false,
        message: '이미 즐겨찾기한 게시글입니다',
      });
    }
    user.bookmarks.push(id);
    await user.save();
    return res.json({
      success: true,
      message: '즐겨찾기 성공했습니다.',
    });
  } catch {
    return res.json({
      success: false,
      message: '게시물의 아이디가 올바르지 않습니다.',
    });
  }
};

export const deleteBookmark = async (req, res) => {
  const { id } = req.params;
  const { user: user_id } = req.body;

  try {
    const exist = await Post.exists({ _id: id, being: true });

    if (!exist) {
      return res.json({
        success: false,
        message: '존재하지 않거나 삭제된 게시물입니다.',
      });
    }
    const user = await User.findById({ _id: user_id });

    const check = user.bookmarks.includes(id);
    if (!check) {
      return res.json({
        success: false,
        message: '즐겨찾기하지 않은 게시글입니다.',
      });
    }

    const bookmarkArray = user.bookmarks.filter((el) => el !== id);
    user.bookmarks = bookmarkArray;
    await user.save();
    return res.json({
      success: false,
      message: '즐겨찾기를 취소했습니다.',
    });
  } catch {
    return res.json({
      success: false,
      message: '게시물의 아이디가 올바르지 않습니다.',
    });
  }
};
