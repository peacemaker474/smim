import express from 'express';
import { getFavoriteLists, getWriteLists, putChangePassword, putChangeUserInfo } from '../controllers/mypageController.js';
import { verifyToken } from '../controllers/tokenControllers.js';
import { userImgUpload } from '../middlewares.js';

const myRouter = express.Router();

myRouter.get("/writeLists", getWriteLists);
myRouter.get("/bookmarkLists", getFavoriteLists);
myRouter.put("/changepw", verifyToken, putChangePassword);
myRouter.put("/", userImgUpload.single("file"), putChangeUserInfo);

export default myRouter;