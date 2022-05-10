import express from 'express';
import { getFavoriteLists, getWriteLists, putChangePassword, putChangeUserInfo } from '../controllers/mypageController.js';

const myRouter = express.Router();

myRouter.get("/writeLists", getWriteLists);
myRouter.get("/favoriteLists", getFavoriteLists);
myRouter.put("/changepw", putChangePassword);
myRouter.put("/", putChangeUserInfo);

export default myRouter;