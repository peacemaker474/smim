import express from 'express';
import { getCheckMyId, getCheckMyName, getFavoriteLists, getWriteLists, putChangePassword, putChangeUserInfo } from '../controllers/mypageController.js';
import { userImgUpload } from '../middlewares.js';

const myRouter = express.Router();

myRouter.get("/writeLists", getWriteLists);
myRouter.get("/bookmarkLists", getFavoriteLists);
myRouter.put("/changepw", putChangePassword);
myRouter.get("/id-check", getCheckMyId);
myRouter.get("/name-check", getCheckMyName);
myRouter.put("/", userImgUpload.single("file"), putChangeUserInfo);

export default myRouter;