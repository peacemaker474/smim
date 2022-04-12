import express from 'express';
import {
  postCreate,
  putEdit,
  deletePost,
  getPostDetail,
  getPostList,
} from '../controllers/postController.js';
import { verifyToken } from '../controllers/tokenControllers.js';

export const postRouter = express.Router();

postRouter.get('/target', getPostList);
postRouter.post('/create', verifyToken, postCreate);
postRouter.route('/:id').get(getPostDetail).put(putEdit).delete(deletePost);
