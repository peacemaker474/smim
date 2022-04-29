import express from 'express';
import {
  postCreate,
  putEdit,
  deletePost,
  getPostDetail,
  getPostList,
  getPostView,
  getPostLike,
  getPostUnlike,
} from '../controllers/postController.js';
import { postBookmark, deleteBookmark, getBookmark } from '../controllers/bookmarkController.js';
import { verifyToken } from '../controllers/tokenControllers.js';

export const postRouter = express.Router();

postRouter.get('/target', getPostList);
postRouter.post('/create', verifyToken, postCreate);
postRouter.get('/bookmark', verifyToken, getBookmark);
postRouter
  .route('/bookmark/:id')
  .post(verifyToken, postBookmark)
  .delete(verifyToken, deleteBookmark);
postRouter
  .route('/:id')
  .get(getPostDetail)
  .put(verifyToken, putEdit)
  .delete(verifyToken, deletePost);
postRouter.route('/:id/view').get(getPostView);
postRouter.route('/:id/like').get(verifyToken, getPostLike);
postRouter.route('/:id/unlike').get(verifyToken, getPostUnlike);
