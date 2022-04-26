import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const SECRET_KEY = process.env.SECRET_KEY;

export const createToken = (userId) => {
  const token = jwt.sign({ user_id: userId.toString() }, SECRET_KEY, {
    expiresIn: '2h',
  });
  return token;
};

export const verifyToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.json({ result: 'access token이 없습니다.' });
  }
  const token = req.headers.authorization.split('Bearer ')[1];
  try {
    jwt.verify(token, SECRET_KEY, async (err, decoded) => {
      const exist = await User.findById({ _id: decoded.user_id });

      if (!exist) {
        console.log(exist);
        return res.status(500).json({ result: '유효하지 않은 토큰입니다.' });
      }

      req.body.user = decoded.user_id;
      next();
      // console.log(decoded);
      // return res.json({ message: '유효한 토큰입니다.' });
    });
  } catch {
    return res.status(500).json({ result: '유효하지 않은 토큰입니다.' });
  }
}; // jwt token decoding
