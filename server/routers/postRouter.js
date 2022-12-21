import express from 'express';
import {
  postPostCreate,
  putPostEdit,
  deletePost,
  getPostDetail,
  getPostList,
  getPostView,
  postPostImageUpload,
} from '../controllers/postController.js';
import { getPostLike, getPostUnlike } from '../controllers/likeController.js';
import {
  getBookmark,
  getUnbookmark,
} from '../controllers/bookmarkController.js';
import {
  verifyToken,
  verifyRefreshToken,
} from '../controllers/tokenControllers.js';
import {
  postCommentCreate,
  getCommentList,
} from '../controllers/commentController.js';
import {
  existPostAndOwnerCheck,
  existPostCheckAndData,
  fieldCheck,
  checkPostExistAndContent,
} from '../middlewares.js';
import {
  postSingleImageUpload,
  postImageDeleteAndUpload,
  postImageDeleteAndDelete,
  PostImageDelete,
} from '../multer.js';

export const postRouter = express.Router();

postRouter.get('/target', getPostList);
postRouter.post(
  '/create',
  verifyToken,
  fieldCheck,
  postImageDeleteAndUpload,
  postPostCreate
);
postRouter.post(
  '/comment',
  verifyToken,
  checkPostExistAndContent,
  postCommentCreate
);
postRouter.post(
  '/img',
  postSingleImageUpload.single('img'),
  postPostImageUpload
);
postRouter.delete('/img', PostImageDelete);

postRouter
  .route('/:id')
  .get(verifyRefreshToken, existPostCheckAndData, getPostDetail)
  .put(
    verifyToken,
    fieldCheck,
    existPostAndOwnerCheck,
    postImageDeleteAndUpload,
    putPostEdit
  )
  .delete(
    verifyToken,
    existPostCheckAndData,
    postImageDeleteAndDelete,
    deletePost
  );

postRouter.get('/:id/view', existPostCheckAndData, getPostView);
postRouter.get(
  '/:id/bookmark',
  verifyToken,
  existPostCheckAndData,
  getBookmark
);
postRouter.get(
  '/:id/unbookmark',
  verifyToken,
  existPostCheckAndData,
  getUnbookmark
);
postRouter.get('/:id/like', verifyToken, existPostCheckAndData, getPostLike);
postRouter.get(
  '/:id/unlike',
  verifyToken,
  existPostCheckAndData,
  getPostUnlike
);
postRouter.get('/:id/comment', verifyRefreshToken, getCommentList);
