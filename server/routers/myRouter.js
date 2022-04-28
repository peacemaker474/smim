import express from 'express';
import { getFavoriteLists, getWriteLists } from '../controllers/mypageController.js';

const myRouter = express.Router();

myRouter.get("/writeLists", getWriteLists);
myRouter.get("/favoriteLists", getFavoriteLists);

export default myRouter;