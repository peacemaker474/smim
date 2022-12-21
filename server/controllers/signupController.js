import User from '../models/User.js';

/* 
  회원가입에서 발생하는 유효성 검사를 서버단에서 처리할 것인지
  클라이언트 단에서 처리할 것인지 정해야 한다.
*/

export const postSignup = async (req, res) => {
  const { userId, email, nickname, birthday, password, ageGroup } = req.body;

  try {
    await User.create({
      userId,
      email,
      nickname,
      birthday,
      password,
      ageGroup,
    });
    return res.status(201).json({ success: true, message: '회원가입에 성공하셨습니다.' });
  } catch (error) {
    console.log(error);
  }
};