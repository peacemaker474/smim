import User from '../models/User.js';
import axios from 'axios';

const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const GOOGLE_AUTH_REDIRECT_URL = 'http://localhost:4000/login/google/callback';
const GOOGLE_AUTH_TOKEN_URL = 'https://oauth2.googleapis.com/token';

export const getSignup = (req, res) => {
  return res.send({ pageTitle: 'SignUp' });
};

export const getCheckId = (req, res) => {
  const { name } = req.query;
  User.findOne({ name })
    .then((data) => {
      if (data) {
        return res.json({ success: false, message: '이미 사용중이거나 탈퇴한 아이디입니다.' });
      } else {
        return res.json({ success: true, message: '사용이 가능한 아이디입니다.' });
      }
    })
    .catch((err) => console.log(err));
};

export const getCheckEmail = (req, res) => {
  const { email } = req.query;
  User.findOne({ email })
    .then((data) => {
      if (data) {
        return res.json({ success: false, message: '이미 사용중이거나 탈퇴한 이메일입니다.' });
      } else {
        return res.json({ success: true, message: '사용이 가능한 이메일입니다.' });
      }
    })
    .catch((err) => console.log(err));
};

export const getCheckName = (req, res) => {
  const { nickname } = req.query;
  User.findOne({ nickname })
    .then((data) => {
      if (data) {
        return res.json({ success: false, message: '이미 사용중인 닉네임입니다.' });
      } else {
        return res.json({ success: true, message: '사용이 가능한 닉네임입니다.' });
      }
    })
    .catch((err) => console.log(err));
};

export const postSignup = async (req, res) => {
  const { name, email, nickname, birthday, password, password2 } = req.body;
  if (password !== password2) {
    return res.json({ success: false, message: '비밀번호가 서로 다릅니다.' });
  }
  try {
    await User.create({
      name,
      email,
      nickname,
      birthday,
      password,
    });
    return res.json({ success: true, message: '회원가입에 성공하셨습니다.' });
  } catch (error) {
    console.log(error);
  }
};

export const getGoogleAuth = (req, res) => {
  return res.redirect(
    `${GOOGLE_AUTH_URL}?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_AUTH_REDIRECT_URL}&response_type=code&include_granted_scopes=true&scope=https://www.googleapis.com/auth/userinfo.profile`
  );
};

export const getGoogleCallback = async (req, res) => {
  console.log(req.query);
  const { code } = req.query;
  const { data } = await axios({
    method: 'POST',
    url: `${GOOGLE_AUTH_TOKEN_URL}`,
    headers: {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
    params: {
      grant_type: 'authorization_code',
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_SECRET_ID,
      redirectUri: GOOGLE_AUTH_REDIRECT_URL,
      code: code,
    },
  });
  // console.log(data);
  const access_token = data['access_token'];
  const { data: me } = await axios.get(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
  );
  console.log(me);
  return res.redirect('http://localhost:3000');
};
