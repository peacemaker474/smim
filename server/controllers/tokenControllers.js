import jwt, { decode } from 'jsonwebtoken';
import User from '../models/User.js';

const SECRET_KEY = process.env.SECRET_KEY;

export const createAccessToken = ( userId ) => {
  return jwt.sign({ user_id: userId.toString() }, SECRET_KEY, {
    expiresIn: '10m',
  });
};

export const createRefreshToken = ( userId ) => {
  return jwt.sign({ user_id: userId.toString() }, SECRET_KEY, {
    expiresIn: '30 days',
  });
};

export const verifyToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.json({ result: 'access token이 없습니다.' });
  }
  const token = req.headers.authorization.split('Bearer ')[1];

  jwt.verify(token, SECRET_KEY, async (err, decoded) => {
    if (err) return res.status(500).json({ result: err });
    if (!decoded) {
      return res.status(500).json({ result: '유효하지 않은 토큰입니다.' });
    }
    // console.log(decoded)
    const userData = await User.findById({ _id: decoded.user_id });
    req.body.user = { nickname: userData.nickname, _id: userData._id, userId: userData.userId };
    next();
  });

  // return res.status(500).json({ result: '유효하지 않은 토큰입니다.' });
}; // jwt token decoding

export const reissueAccessToken = (req, res) => {
  const { refreshToken } = req.body;

  jwt.verify(refreshToken, SECRET_KEY, async (err, decoded) => {
    if (err) console.log(err);
    if (!decoded) return res.status(403).json({ success: false, message: "유효하지 않은 토큰입니다. "});

    return res.status(201).json({
      success: true,
      accessToken: jwt.sign({ userid: decoded.user_id.toString() }, SECRET_KEY, {
        expiresIn: '10m',
      }),
    })
  })
}