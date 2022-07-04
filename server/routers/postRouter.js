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
import { getBookmark, getUnbookmark } from '../controllers/bookmarkController.js';
import { verifyToken } from '../controllers/tokenControllers.js';
import { postCommentCreate, getCommentList } from '../controllers/commentController.js';
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
postRouter.post('/comment', verifyToken, postCommentCreate);

postRouter
  .route('/:id')
  .get(existPostCheckAndData, getPostDetail)
  .put(verifyToken, fieldCheck, existPostAndOwnerCheck, putPostEdit)
  .delete(verifyToken, existPostAndOwnerCheck, deletePost);

postRouter.get('/:id/detail', verifyToken, existPostCheckAndData, getPostDetail);
postRouter.get('/:id/view', existPostCheckAndData, getPostView);
postRouter.get('/:id/bookmark', verifyToken, existPostCheck, getBookmark);
postRouter.get('/:id/unbookmark', verifyToken, existPostCheck, getUnbookmark);
postRouter.get('/:id/like', verifyToken, existPostCheckAndData, getPostLike);
postRouter.get('/:id/unlike', verifyToken, existPostCheckAndData, getPostUnlike);
postRouter.get('/:id/comment', getCommentList);
postRouter.get('/:id/comment/detail', verifyToken, getCommentList);
postRouter.get('/:id/detailComment', verifyToken, getCommentList);
