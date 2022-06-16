import express from 'express';
import {
  postPostCreate,
  putPostEdit,
  deletePost,
  getPostDetail,
  getPostList,
  getPostView,
  getPostSearch,
} from '../controllers/postController.js';
import { getPostLike, getPostUnlike } from '../controllers/likeController.js';
import { postBookmark, deleteBookmark, getBookmark } from '../controllers/bookmarkController.js';
import { verifyToken } from '../controllers/tokenControllers.js';
import { postCommentCreate, getCommentList } from '../controllers/commentController.js';

export const postRouter = express.Router();

postRouter.get('/target', getPostList);
postRouter.get('/search', getPostSearch);
postRouter.post('/create', verifyToken, postPostCreate);
postRouter.get('/bookmark', verifyToken, getBookmark);
postRouter.route('/comment').get(getCommentList).post(verifyToken, postCommentCreate);

postRouter
  .route('/:id')
  .get(getPostDetail)
  .put(verifyToken, putPostEdit)
  .delete(verifyToken, deletePost);

postRouter.route('/:id/detail').get(verifyToken, getPostDetail);
postRouter.route('/:id/view').get(getPostView);
postRouter.route('/:id/bookmark').get(verifyToken, postBookmark);
postRouter.route('/:id/unbookmark').get(verifyToken, deleteBookmark);
postRouter.route('/:id/like').get(verifyToken, getPostLike);
postRouter.route('/:id/unlike').get(verifyToken, getPostUnlike);
