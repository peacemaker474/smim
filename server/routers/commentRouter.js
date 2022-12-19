import express from 'express';
import {
  putCommentEdit,
  deleteComment,
  getCommentPinned,
  getCommentUnpinned,
  getComment,
} from '../controllers/commentController.js';
import {
  getCommentLike,
  getCommentUnlike,
} from '../controllers/likeController.js';
import {
  verifyToken,
  verifyRefreshToken,
} from '../controllers/tokenControllers.js';
import {
  checkCommentUndefined,
  checkPostExistAndContent,
  checkParamCommentExistAndData,
  checkCommentPinned,
} from '../middlewares.js';

export const commentRouter = express.Router();

commentRouter
  .route('/:id')
  .get(verifyRefreshToken, checkParamCommentExistAndData, getComment)
  .put(
    verifyToken,
    checkCommentUndefined,
    checkPostExistAndContent,
    checkParamCommentExistAndData,
    putCommentEdit
  )
  .delete(
    verifyToken,
    checkCommentUndefined,
    checkParamCommentExistAndData,
    deleteComment
  );
commentRouter.get(
  '/:id/pinned',
  verifyToken,
  checkCommentUndefined,
  checkCommentPinned,
  getCommentPinned
);
commentRouter.get(
  '/:id/unpinned',
  verifyToken,
  checkCommentUndefined,
  checkCommentPinned,
  getCommentUnpinned
);
commentRouter.get(
  '/:id/like',
  verifyToken,
  checkCommentUndefined,
  checkParamCommentExistAndData,
  getCommentLike
);
commentRouter.get(
  '/:id/unlike',
  verifyToken,
  checkCommentUndefined,
  checkParamCommentExistAndData,
  getCommentUnlike
);
