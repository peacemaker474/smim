import User from "../models/User.js";

export const getExistedIdCheck = async (req, res) => {
  const { userId } = req.query;
  const user = await User.findOne({ userId });
  try {
    if (user) {
      throw "이미 사용중이거나 탈퇴한 아이디입니다.";
    } else {
      return res.status(200).json({ success: true, message: "사용 가능한 아이디입니다."});
    }
  } catch (err) {
    return res.status(409).json({ success: false, message: err})
  }
};

export const getExistedNameCheck = async (req, res) => {
  const { nickname } = req.query;
  const user = await User.findOne({ nickname });
  try {
    if (user) {
      throw "이미 사용중인 닉네임입니다."
    } else {
      return res.status(200).json({ success: true, message: '사용이 가능한 닉네임입니다.' });
    }
  } catch (err) {
    return res.status(409).json({ success: false, message: err });
  }
}

export const getExistedEmailCheck = async (req, res) => {
  const { email } = req.query;
  const user = await User.findOne({ email });
  try {
    if (user) {
      throw "이미 사용중이거나 탈퇴한 이메일입니다."
    } else {
      return res.status(200).json({ success: true, message: '사용이 가능한 이메일입니다.' });
    }
  } catch (err) {
    return res.status(409).json({ success: false, message: err });
  }
}