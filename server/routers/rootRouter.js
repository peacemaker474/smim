import express from 'express';

export const rootRouter = express.Router();

rootRouter.get('/', (req, res) => {
  return res.send('home');
});
