import express from 'express';
import { getCheckEmail, getCheckId, getCheckName, postSignup } from "../controllers/userController.js";

const rootRouter = express.Router();


rootRouter.get("/signup/id-check", getCheckId);
rootRouter.get("/signup/email-check", getCheckEmail);
rootRouter.get("/signup/name-check", getCheckName);
rootRouter.post("/signup", postSignup);

export default rootRouter;