import User from "../models/User.js";
import bcrypt from 'bcrypt';

export const postLogin = async (req, res) => {
  const {name, password} = req.body;
  const user = await User.findOne({ name });
  const ok = await bcrypt.compare(password, user.password);
  if (!user) {
    console.log("아이디");
    return res.json({ success: false, message: "아이디가 존재하지 않습니다." });
  }

  if (!ok) {
    console.log("비밀번호");
    return res.json({ success: false, message: "비밀번호가 일치하지 않습니다." });
  }
  console.log("성공");
  return res.redirect("/");
}