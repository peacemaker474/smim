import User from "../models/User.js";
import bcrypt from 'bcrypt';
import { createAccessToken, createRefreshToken } from "./tokenControllers.js";

export const postLogin = async (req, res) => {
  const {userId, password} = req.body;
  const user = await User.findOne({ userId });
  if (!user) {
    return res.status(401).json({ success: false, message: "아이디가 존재하지 않습니다." });
  }
  if (user) {
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ success: false, message: "비밀번호가 일치하지 않습니다." });
  }

  const accessToken = createAccessToken(user._id);
  const refreshToekn = createRefreshToken(user._id);

  return res.status(200).json({
    id: user.userId,
    name: user.nickname,
    email: user.email,
    social: user.socialOnly,
    accessToken,
    refreshToekn,
    success: true,
    imageUrl: user.imageUrl ? user.imageUrl : "",
    message: "",
  })
}

export const getLogout = (req, res) => {
  return res.status(200).json({ success: true });
}