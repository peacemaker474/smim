import jwt from 'jsonwebtoken'

export const isAuthorized = (req) => {
  const accessToken = req.body.accessToken;
  if (!accessToken) return null;
  try {
    return jwt.verify(accessToken, process.env.ACCESS_KEY);
  } catch (err) {
    console.log(err);
    return null;
  }
}