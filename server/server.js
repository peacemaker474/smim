import express from 'express';
import cors from 'cors';
import { getLogout } from './controllers/loginController.js';

import { postRouter } from './routers/postRouter.js';
import rootRouter from './routers/rootRouter.js';
import loginRouter from './routers/loginRouter.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', rootRouter);
app.use('/post', postRouter);
app.use('/login', loginRouter);
app.get('/logout', getLogout);

export default app;
