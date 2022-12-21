import User from '../models/User.js';
import Post from '../models/Post.js';
import { deleteUserImage } from '../multer.js';
import bcrypt from 'bcrypt';

/*
// 유저 정보 수정 부분은 추후에 코드 수정이 필요
// 서버 응답코드 넣어야 함

*/

export const getWriteLists = async (req, res) => {
  const { userId } = req.query;
  try {
    const { posts } = await User.findOne({ userId });
    if (posts.length === 0) return res.status(200).send("작성한 게시글이 없습니다.");

    const writeLists = await Promise.all(
      posts.map(async (list) => {
        const post = await Post.findById(list); 
        return post;
      })
    );

    return res.status(200).json({ success: true, writeLists });
  } catch (err) {
    console.log(err);
    return res.status(500).send('잠시 후 다시 시도해주세요.');
  }
};

export const getBookMarkLists = async (req, res) => {
  const { userId } = req.query;
  try {
    const { bookmarks } = await User.findOne({ userId });
    if (bookmarks.length === 0) return res.status(200).send("즐겨찾기한 게시글이 없습니다.");
    
    const bookMarkLists = await Promise.all(
      bookmarks.map(async (list) => {
        const post = await Post.findById(list);
        const user = await User.findById(String(post.owner));
        return {
          ...post._doc,
          owner: { nickname: user.nickname },
        };
      })
    );

    return res.status(200).json({ success: true, bookMarkLists });
  } catch (err) {
    console.log(err);
    return res.status(500).send('잠시 후에 다시 시도해주세요.');
  }
};

// REFACOTRING 필요

export const putChangeUserImage = async (req, res) => {
  const {
    body: { email },
    file,
  } = req;
  const user = await User.findOne({ email });
  const pastUserImage = user.imageUrl;
  const updateImage = await User.findByIdAndUpdate(
    user._id,
    {
      imageUrl: file ? file.key : user.imageUrl,
    },
    { new: true }
  );
  
  if (pastUserImage) deleteUserImage(pastUserImage);

  if (file)
    return res.status(201).json({
      success: true,
      message: '성공적으로 프로필 이미지를 변경했습니다.',
      imageUrl: updateImage.imageUrl,
    });
};

export const putChangeUserInfo = async (req, res) => {
  const { userId, nickname, email } = req.body;
  const user = await User.findOne({ email });

  const checkId = await User.findOne({ userId });
  const checkName = await User.findOne({ nickname });
  if (checkId)
    return res.status(409).json({ success: false, message: '이미 존재하는 아이디입니다.' });
  if (checkName)
    return res.status(409).json({ success: false, message: '이미 존재하는 닉네임입니다.' });

  const updateUser = await User.findByIdAndUpdate(
    user._id,
    {
      userId,
      nickname,
    },
    { new: true }
  );

  return res.status(201).json({
    id: updateUser.userId,
    name: updateUser.nickname,
    email: updateUser.email,
    success: true,
    message: '성공적으로 유저 정보를 변경하였습니다.',
  });
};

export const putChangePassword = async (req, res) => {
  const { userId, oldPassword, newPassword, newPassword2 } = req.body;

  const user = await User.findOne({ userId });
  const checkPassword = await bcrypt.compare(oldPassword, user.password);
  if (!checkPassword) {
    return res.status(400).json({
      success: false,
      message: '비밀번호를 다시 입력하세요.',
    });
  }
  if (newPassword !== newPassword2) {
    return res.status(400).json({
      success: false,
      message: '새 비밀번호와 비밀번호 확인이 일치하지 않습니다.',
    });
  }
  user.password = newPassword;
  await user.save();
  return res.status(201).json({ success: true, message: '성공적으로 비밀번호를 변경하였습니다.' });
};

export const deleteUser = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: '탈퇴하고자 하는 아이디가 올바르지 않습니다.',
    })
  }

  const user = await User.findOne({ userId });

  if (user.expiredAt) {
    return res.status(400).json({
      success: false,
      message: '이미 탈퇴를 요청한 아이디입니다.',
    })
  }

  const updateUser = await User.findByIdAndUpdate(user._id, {
    expiredAt: new Date(Date.now() + (24 * 3600 * 1000 * 7)),
  }, { new: true });

  return res.status(200).json({
    success: true,
    message: '회원 탈퇴가 완료되었으며, 7일 뒤 삭제될 예정입니다.',
  })
}
