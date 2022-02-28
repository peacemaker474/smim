import express from 'express';
import { getCheckId, postSignup } from "../controllers/userController.js";

const rootRouter = express.Router();


rootRouter.get("/signup", getCheckId);
rootRouter.post("/signup", postSignup);

export default rootRouter;