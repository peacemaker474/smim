import express from 'express';
import { postUpload } from '../controllers/postController.js';

export const postRouter = express.Router();

postRouter.post('/create', postUpload);
