import express from 'express';
import { getBookMarkLists, getWriteLists, putChangePassword, putChangeUserImage, putChangeUserInfo } from '../controllers/mypageController.js';
import { verifyAccessToken } from '../controllers/tokenControllers.js';
import { getExistedIdCheck, getExistedNameCheck } from '../controllers/verifyUser.js';
import { userImgUpload } from '../middlewares.js';

const myRouter = express.Router();

myRouter.get("/writeLists", getWriteLists);
myRouter.get("/bookmarkLists", getBookMarkLists);
myRouter.put("/update-image", userImgUpload.single("file"), verifyAccessToken, putChangeUserImage);
myRouter.put("/update-user", verifyAccessToken, putChangeUserInfo);
myRouter.get("/id-check", getExistedIdCheck);
myRouter.get("/name-check", getExistedNameCheck);
myRouter.put("/changepw", verifyAccessToken, putChangePassword);

export default myRouter;