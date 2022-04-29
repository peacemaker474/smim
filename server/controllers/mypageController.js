import User from '../models/User.js';

export const getWriteLists = async (req, res) => {
  const { userId } = req.query;
  const { posts } = await User.findOne({userId});
  if (posts.length === 0) return res.send("작성한 게시글이 없습니다.")
  return res.send("성공");
};

export const getFavoriteLists = async (req, res) => {
  const { userId } = req.query;
  const { likes } = await User.findOne({userId});
  if (likes.length === 0) return res.send("즐겨찾기한 게시글이 없습니다.")
  return res.send("성공");
};