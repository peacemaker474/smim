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
import { getBookmark, deleteBookmark } from '../controllers/bookmarkController.js';
import { verifyToken } from '../controllers/tokenControllers.js';
import {
  postCommentCreate,
  getCommentList,
  postCommentPinned,
} from '../controllers/commentController.js';
import {
  existPostAndOwnerCheck,
  existPostCheckAndData,
  existPostCheck,
  fieldCheck,
} from '../middlewares.js';

export const postRouter = express.Router();

postRouter.get('/target', getPostList);
postRouter.get('/search', getPostSearch);
postRouter.post('/create', verifyToken, fieldCheck, postPostCreate);
postRouter.route('/comment').get(getCommentList).post(verifyToken, postCommentCreate);
postRouter.post('/pinnedComment', verifyToken, postCommentPinned);

postRouter
  .route('/:id')
  .get(existPostCheckAndData, getPostDetail)
  .put(verifyToken, fieldCheck, existPostAndOwnerCheck, putPostEdit)
  .delete(verifyToken, existPostAndOwnerCheck, deletePost);

postRouter.route('/:id/detail').get(verifyToken, existPostCheckAndData, getPostDetail);
postRouter.route('/:id/view').get(existPostCheckAndData, getPostView);
postRouter.route('/:id/bookmark').get(verifyToken, existPostCheck, getBookmark);
postRouter.route('/:id/unbookmark').get(verifyToken, existPostCheck, deleteBookmark);
postRouter.route('/:id/like').get(verifyToken, existPostCheckAndData, getPostLike);
postRouter.route('/:id/unlike').get(verifyToken, existPostCheckAndData, getPostUnlike);
