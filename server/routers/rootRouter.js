import express from 'express';
import { postSignup } from "../controllers/userController.js";

const rootRouter = express.Router();

rootRouter.post("/signup", postSignup);

export default rootRouter;