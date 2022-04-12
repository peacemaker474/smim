import express from 'express';
import {
  getCheckEmail,
  getCheckId,
  getCheckName,
  postSignup,
  getGoogleAuth,
  getGoogleCallback,
} from '../controllers/signupController.js';

const rootRouter = express.Router();

rootRouter.get('/signup/id-check', getCheckId);
rootRouter.get('/signup/email-check', getCheckEmail);
rootRouter.get('/signup/name-check', getCheckName);
rootRouter.post('/signup', postSignup);

// google oauth
rootRouter.get('/login/google', getGoogleAuth);
rootRouter.get('/login/google/callback', getGoogleCallback);

export default rootRouter;
