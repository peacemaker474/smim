import User from '../models/User.js';
import Post from '../models/Post.js';
import bcrypt from 'bcrypt';
import { createToken } from './tokenControllers.js';

/*

// 유저 정보 수정 부분은 추후에 코드 수정이 필요
// 서버 응답코드 넣어야 함


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

export const putChangeUserInfo = async (req, res) => {
  const { 
    body: { userId, nickname, email},
    file
  } = req;
  const user = await User.findOne({email});
  const checkId = await User.findOne({ userId });
  const checkName = await User.findOne({ nickname });
  if (checkId !== null) return res.json({ success: false, message: "이미 존재하는 아이디입니다."})
  if (checkName !== null) return res.json({ success: false, message: "이미 존재하는 닉네임입니다."})
  
  const updateUser = await User.findByIdAndUpdate(user._id, {
    userId,
    nickname,
    imageUrl: file ? file.path : user.imageUrl,
  }, {new: true});
  const token = createToken(user._id);
  
  return res.json({
    id: updateUser.userId,
    name: updateUser.nickname,
    email: updateUser.email,
    accessToken: token,
    success: true,
    imageUrl: updateUser.imageUrl ? updateUser.imageUrl : "",
    message: "성공적으로 정보를 변경하였습니다.",
  })
}

export const putChangePassword = async (req, res) => {
  const { userId, oldPassword, newPassword, newPassword2} = req.body;
  const user = await User.findOne({userId});
  const checkPassword = await bcrypt.compare(oldPassword, user.password);
  if (!checkPassword) {
    return res.json({
      success: false,
      message: "비밀번호를 다시 입력하세요.",
    });
  }
  if (newPassword !== newPassword2) {
    return res.json({
      success: false,
      message: "새 비밀번호와 비밀번호 확인이 일치하지 않습니다.",
    })
  }
  user.password = newPassword;
  await user.save();
  return res.send("성공적으로 비밀번호를 변경하였습니다.");
};