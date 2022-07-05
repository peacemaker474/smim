import express from 'express';
import { getFavoriteLists, getWriteLists, putChangePassword, putChangeUserInfo } from '../controllers/mypageController.js';
import { getExistedIdCheck, getExistedNameCheck } from '../controllers/verifyUser.js';
import { userImgUpload } from '../middlewares.js';

const myRouter = express.Router();

myRouter.get("/writeLists", getWriteLists);
myRouter.get("/bookmarkLists", getFavoriteLists);
myRouter.put("/", userImgUpload.single("file"), putChangeUserInfo);
myRouter.get("/id-check", getExistedIdCheck);
myRouter.get("/name-check", getExistedNameCheck);
myRouter.put("/changepw", putChangePassword);

export default myRouter;