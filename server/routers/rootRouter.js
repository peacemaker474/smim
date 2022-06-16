import express from 'express';
import { getMainPageLists } from '../controllers/postController.js';
import {
  getEmailCheck,
  getIdCheck,
  getNameCheck,
  postSignup,
  getGoogleAuth,
  getGoogleCallback,
} from '../controllers/signupController.js';
import { userImgUpload } from '../middlewares.js';

const rootRouter = express.Router();

rootRouter.get("/", getMainPageLists);

rootRouter.get('/signup/id-check', getIdCheck);
rootRouter.get('/signup/email-check', getEmailCheck);
rootRouter.get('/signup/name-check', getNameCheck);
rootRouter.post('/signup', userImgUpload.single("users"), postSignup);

// google oauth
rootRouter.get('/login/google', getGoogleAuth);
rootRouter.get('/login/google/callback', getGoogleCallback);

export default rootRouter;
