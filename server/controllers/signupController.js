import User from '../models/User.js';

const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const GOOGLE_AUTH_REDIRECT_URL = 'http://localhost:4000/login/google/callback';
const GOOGLE_AUTH_TOKEN_URL = 'https://oauth2.googleapis.com/token';

/* 
  회원가입에서 발생하는 유효성 검사를 서버단에서 처리할 것인지
  클라이언트 단에서 처리할 것인지 정해야 한다.
*/

export const postSignup = async (req, res) => {
  const { userId, email, nickname, birthday, password } = req.body;
  try {
    await User.create({
      userId,
      email,
      nickname,
      birthday,
      password,
    });
    return res.status(201).json({ success: true, message: '회원가입에 성공하셨습니다.' });
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
