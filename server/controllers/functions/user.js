import jwt from 'jsonwebtoken'

export const isAuthorized = (accessToken) => {
  try {
    return jwt.verify(accessToken, process.env.ACCESS_KEY);
  } catch (err) {
    console.log(err);
    switch (err.message) {
      case 'jwt expired':
        return "토큰이 만료되었습니다."
      case 'invalid signature':
        return "잘못된 토큰입니다. 다시 확인해주세요."
      case 'jwt malformed':
        return "토큰이 존재하지 않습니다. 다시 확인해주세요."
    }
  }
}