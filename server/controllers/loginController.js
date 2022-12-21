import User from '../models/User.js';
import bcrypt from 'bcrypt';
import { createAccessToken, createRefreshToken } from './tokenControllers.js';

export const postLogin = async (req, res) => {
  const { userId, password } = req.body;
  try {
    const user = await User.findOne({ userId });
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: '아이디가 존재하지 않습니다.' });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res
        .status(401)
        .json({ success: false, message: '비밀번호가 일치하지 않습니다.' });

    if (user.expiredAt)
      return res
        .status(401)
        .json({ success: false, message: '이미 탈퇴한 회원입니다.' });

    const accessToken = createAccessToken(user._id);
    const refreshToekn = createRefreshToken(user._id);

    res.cookie('users', refreshToekn, {
      httpOnly: true,
      expires: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      secure: true,
      sameSite: 'none',
    });

    return res.status(200).json({
      id: user.userId,
      name: user.nickname,
      email: user.email,
      accessToken,
      refreshToekn,
      success: true,
      imageUrl: user.imageUrl ? user.imageUrl : '',
      ageGroup: user.ageGroup,
      message: '',
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send('잠시 후에 다시 시도해주세요.');
  }
};

export const getLogout = (req, res) => {
  res.clearCookie('users');
  return res.status(200).json({ success: true });
};
