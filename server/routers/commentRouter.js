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
import { checkCommentUndefined } from '../middlewares.js';

export const commentRouter = express.Router();

commentRouter
  .route('/:id')
  .get(getComment)
  .put(verifyToken, checkCommentUndefined, putCommentEdit)
  .delete(verifyToken, checkCommentUndefined, deleteComment);
commentRouter.get('/:id/detail', verifyRefreshToken, checkCommentUndefined, getComment);
commentRouter.get('/:id/pinned', verifyToken, checkCommentUndefined, getCommentPinned);
commentRouter.get('/:id/unpinned', verifyToken, checkCommentUndefined, getCommentUnpinned);
commentRouter.get('/:id/like', verifyToken, checkCommentUndefined, getCommentLike);
commentRouter.get('/:id/unlike', verifyToken, checkCommentUndefined, getCommentUnlike);
