import User from '../models/User.js';

export const getSignup = (req, res) => {
  return res.send({pageTitle: "SignUp"});
}

export const getCheckId = (req, res) => {
  const { name } = req.query;
  User.findOne({name})
    .then((data) => {
      if (data) {
        return res.json({ success: false, message: "이미 사용중이거나 탈퇴한 아이디입니다."});
      } else {
        return res.json({ success: true, message: "사용이 가능한 아이디입니다."});
      }
    })
    .catch((err) => console.log(err));
}

export const getCheckEmail = (req, res) => {
  const {email} = req.query;
  User.findOne({email})
    .then((data) => {
      if(data) {
        return res.json({ success: false, message: "이미 사용중이거나 탈퇴한 이메일입니다."});
      } else {
        return res.json({ success: true, message: "사용이 가능한 이메일입니다."});
      }
    })
    .catch((err) => console.log(err));
}

export const getCheckName = (req, res) => {
  const {nickname} = req.query;
  User.findOne({nickname})
    .then((data) => {
      if(data) {
        return res.json({ success: false, message: "이미 사용중인 닉네임입니다."});
      } else {
        return res.json({ success: true, message: "사용이 가능한 닉네임입니다."});
      }
    }).catch((err) => console.log(err));
}

export const postSignup = async (req, res) => {
  const {name, email, nickname, birthday, password, password2} = req.body;
  if (password !== password2) {
    return res.json({ success: false, message: "비밀번호가 서로 다릅니다."});
  }
  try {
    await User.create({
      name,
      email,
      nickname,
      birthday,
      password,
    });
    return res.json({ success: true, message: "회원가입에 성공하셨습니다."});
  } catch (error) {
    console.log(error);
  }
}