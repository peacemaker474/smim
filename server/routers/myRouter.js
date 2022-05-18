import express from 'express';
import { getFavoriteLists, getWriteLists, putChangePassword, putChangeUserInfo } from '../controllers/mypageController.js';
import { userImgUpload } from '../middlewares.js';

const myRouter = express.Router();

myRouter.get("/writeLists", getWriteLists);
myRouter.get("/favoriteLists", getFavoriteLists);
myRouter.put("/changepw", putChangePassword);
myRouter.put("/", userImgUpload.single("file"), putChangeUserInfo);

export default myRouter;