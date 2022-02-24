import express from 'express';
import rootRouter from './routers/rootRouter.js';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

// app.use('/', () => {
//   res.send('home');
// });

app.use("/", rootRouter);

export default app;
