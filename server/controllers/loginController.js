import User from "../models/User.js";
import bcrypt from 'bcrypt';
import { createToken } from "./tokenControllers.js";

export const postLogin = async (req, res) => {
  const {userId, password} = req.body;
  const user = await User.findOne({ userId });
  if (!user) {
    return res.json({ success: false, message: "아이디가 존재하지 않습니다." });
  }

  if (user) {
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.json({ success: false, message: "비밀번호가 일치하지 않습니다." });
  }

  const token = createToken(user._id);
  console.log("성공");
  return res.status(201).json({
    id: user.userId,
    name: user.nickname,
    email: user.email,
    social: user.socialOnly,
    accessToken: token,
    success: true,
    message: "",
  })
}

export const getLogout = (req, res) => {
  return res.status(201).json({ success: true });
}