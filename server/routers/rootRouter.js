import express from 'express';
import { getMainPageLists } from '../controllers/postController.js';
import {
  postSignup,
  getGoogleAuth,
  getGoogleCallback,
} from '../controllers/signupController.js';
import { getExistedIdCheck, getExistedNameCheck, getExistedEmailCheck } from '../controllers/verifyUser.js';
import { userImgUpload } from '../middlewares.js';

const rootRouter = express.Router();

rootRouter.get("/", getMainPageLists);

rootRouter.get('/signup/id-check', getExistedIdCheck);
rootRouter.get('/signup/email-check', getExistedEmailCheck);
rootRouter.get('/signup/name-check', getExistedNameCheck);
rootRouter.post('/signup', userImgUpload.single("users"), postSignup);

// google oauth
rootRouter.get('/login/google', getGoogleAuth);
rootRouter.get('/login/google/callback', getGoogleCallback);

export default rootRouter;
