import express from 'express';
import cors from 'cors';
import { postRouter } from './routers/postRouter.js';
import { rootRouter } from './routers/rootRouter.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', rootRouter);
app.use('/posts', postRouter);

export default app;