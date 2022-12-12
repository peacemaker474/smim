import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const ACCESS_KEY = process.env.ACCESS_KEY;
const REFRESH_KEY = process.env.REFRESH_KEY;

export const createAccessToken = (userId) => {
  return jwt.sign({ user_id: userId.toString() }, ACCESS_KEY, {
    expiresIn: '10m',
  });
};

export const createRefreshToken = (userId) => {
  return jwt.sign({ user_id: userId.toString() }, REFRESH_KEY, {
    expiresIn: '30 days',
  });
};

export const verifyToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({
      success: false,
      message: '토큰이 존재하지 않습니다. 다시 로그인해주세요.',
    });
  }

  const token = req.headers.authorization.split('Bearer ')[1];

  jwt.verify(token, ACCESS_KEY, async (err, decoded) => {
    if (err)
      return res.status(401).json({
        success: false,
        message: '토큰이 만료되었거나 유효하지 않은 토큰입니다.',
      });
    if (!decoded)
      return res
        .status(403)
        .json({ success: false, message: '유효하지 않은 토큰입니다. ' });
    const userData = await User.findOne({ _id: decoded.user_id, being: true });
    if (!userData) {
      return res.status(400).send({
        success: false,
        message: '존재하지 않거나 탈퇴한 사용자입니다.',
      });
    }
    req.body.user = {
      nickname: userData.nickname,
      _id: userData._id,
      userId: userData.userId,
    };
    next();
  });
}; // jwt token decoding

export const verifyRefreshToken = (req, res, next) => {
  const refreshToken = req.cookies['users'];
  // console.log(refreshToken);

  if (refreshToken) {
    jwt.verify(refreshToken, REFRESH_KEY, async (err, decoded) => {
      if (err)
        return res.status(401).json({
          success: false,
          message: '토큰이 만료되었거나 유효하지 않은 토큰입니다.',
        });
      if (!decoded)
        return res
          .status(403)
          .json({ success: false, message: '유효하지 않은 토큰입니다. ' });

      const userData = await User.findOne({
        _id: decoded.user_id,
        being: true,
      });

      if (!userData) {
        return res.status(400).send({
          success: false,
          message: '존재하지 않거나 탈퇴한 사용자입니다.',
        });
      }
      req.body.user = {
        nickname: userData.nickname,
        _id: userData._id,
        userId: userData.userId,
        ageGroup: userData.ageGroup,
      };
    });
  }

  next();
};

export const verifyAccessToken = (req, res, next) => {
  const accessToken = req.headers.authorization.split('Bearer ')[1];

  if (!accessToken)
    return res.status(401).json({
      success: false,
      message: '토큰이 존재하지 않습니다. 다시 로그인해주세요.',
    });

  jwt.verify(accessToken, ACCESS_KEY, (err, decoded) => {
    if (err)
      return res.status(401).json({
        success: false,
        message: '토큰이 만료되었거나 유효하지 않은 토큰입니다.',
      });
    next();
  });
};

export const reissueAccessToken = (req, res) => {
  const refreshToken = req.cookies['users'];

  jwt.verify(refreshToken, REFRESH_KEY, async (err, decoded) => {
    if (err) console.log(err);
    if (!decoded)
      return res
        .status(403)
        .json({ success: false, message: '유효하지 않은 토큰입니다. ' });

    return res.status(201).json({
      success: true,
      accessToken: jwt.sign(
        { user_id: decoded.user_id.toString() },
        ACCESS_KEY,
        {
          expiresIn: '10m',
        }
      ),
    });
  });
};
