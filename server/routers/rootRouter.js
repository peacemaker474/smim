import express from 'express';
import { getMainPageLists } from '../controllers/postController.js';
import { postSignup } from '../controllers/signupController.js';
import { getExistedIdCheck, getExistedNameCheck, getExistedEmailCheck } from '../controllers/verifyUser.js';

const rootRouter = express.Router();

rootRouter.get("/", getMainPageLists);

rootRouter.get('/signup/id-check', getExistedIdCheck);
rootRouter.get('/signup/email-check', getExistedEmailCheck);
rootRouter.get('/signup/name-check', getExistedNameCheck);
rootRouter.post('/signup', postSignup);

export default rootRouter;
