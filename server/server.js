import express from 'express';

const app = express();

app.use('/', () => {
  res.send('home');
});

export default app;
