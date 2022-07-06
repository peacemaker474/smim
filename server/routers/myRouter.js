import express from 'express';
import { getFavoriteLists, getWriteLists, putChangePassword, putChangeUserImage, putChangeUserInfo } from '../controllers/mypageController.js';
import { getExistedIdCheck, getExistedNameCheck } from '../controllers/verifyUser.js';
import { userImgUpload } from '../middlewares.js';

const myRouter = express.Router();

myRouter.get("/writeLists", getWriteLists);
myRouter.get("/bookmarkLists", getFavoriteLists);
myRouter.put("/update-image", userImgUpload.single("file"), putChangeUserImage);
myRouter.put("/update-user", putChangeUserInfo);
myRouter.get("/id-check", getExistedIdCheck);
myRouter.get("/name-check", getExistedNameCheck);
myRouter.put("/changepw", putChangePassword);

export default myRouter;