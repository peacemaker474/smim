import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { getLogout } from './controllers/loginController.js';

import { postRouter } from './routers/postRouter.js';
import { commentRouter } from './routers/commentRouter.js';
import rootRouter from './routers/rootRouter.js';
import loginRouter from './routers/loginRouter.js';
import myRouter from './routers/myRouter.js';
import { reissueAccessToken } from './controllers/tokenControllers.js';

const app = express();

let corsOption = {
  origin: ['http://localhost:3000'],
  credentials: true,
}


app.use(cookieParser());
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/uploads', express.static('uploads'));

app.use('/', rootRouter);
app.use('/post', postRouter);
app.use('/comment', commentRouter);
app.use('/login', loginRouter);
app.use('/my', myRouter);
app.get('/logout', getLogout);
app.get('/token', reissueAccessToken);

export default app;
