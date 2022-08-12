import express from 'express';
import {
  putCommentEdit,
  deleteComment,
  getCommentLike,
  getCommentUnlike,
  getCommentPinned,
  getCommentUnpinned,
  getComment,
} from '../controllers/commentController.js';
import { verifyToken, verifyRefreshToken } from '../controllers/tokenControllers.js';
import {
  checkCommentUndefined,
  checkBodyContentUndefined,
  checkBodyPostUndefined,
  checkBodyPostExist,
  checkParamCommentExistAndData,
  checkCommentPinned,
} from '../middlewares.js';

export const commentRouter = express.Router();

commentRouter
  .route('/:id')
  .get(checkParamCommentExistAndData, getComment)
  .put(
    verifyToken,
    checkCommentUndefined,
    checkBodyPostUndefined,
    checkBodyContentUndefined,
    checkBodyPostExist,
    checkParamCommentExistAndData,
    putCommentEdit
  )
  .delete(verifyToken, checkCommentUndefined, checkParamCommentExistAndData, deleteComment);
commentRouter.get('/:id/detail', verifyRefreshToken, checkParamCommentExistAndData, getComment);
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
