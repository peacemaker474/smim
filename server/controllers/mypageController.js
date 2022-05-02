import User from '../models/User.js';
import Post from '../models/Post.js';

// 추후에 응답에 대한 HTTP 상태 코드 넣을 것

/* 

// 마이 프로필 수정하는 부분 작성중

export const postEditUser = async (req, res) => {
  const { userId, nickname, email } = req.body;
  const checkUser = await User.exists({
    $or: [{userId}, {nickname}, {email}],
  });
  
  if (checkUser) return res.send("이미 존재하는 ")

  return res.redirect("/my");
};

export const postEditName = async (req, res) => {
  const { nickname, _id } = req.body;
  const checkName = await User.exists({nickname});
  if (checkName) return res.send("이미 존재하는 닉네임입니다.");

  const updateName = await User.findByIdAndUpdate(_id, { nickname }, {new: true}); 
}

*/

export const getWriteLists = async (req, res) => {
  const { userId } = req.query;
  const { posts } = await User.findOne({userId});
  if (posts.length === 0) return res.send("작성한 게시글이 없습니다.");
  
  const writeLists = await Promise.all(
    posts.map(async (list) => {
      const post = await Post.findById(list);
      return post;
    })
  );
  
  return res.json({ success: true, writeLists});
};

export const getFavoriteLists = async (req, res) => {
  const { userId } = req.query;
  const { bookmarks } = await User.findOne({userId});
  if (bookmarks.length === 0) return res.send("즐겨찾기한 게시글이 없습니다.");

  const favoriteLists = await Promise.all(
    bookmarks.map(async (list) => {
      const post = await Post.findById(list);
      return post;
    })
  );
  
  return res.json({ success: true, favoriteLists});
};