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

export const commentRouter = express.Router();

commentRouter
  .route('/:id')
  .get(getComment)
  .put(verifyToken, putCommentEdit)
  .delete(verifyToken, deleteComment);
commentRouter.get('/:id/detail', verifyRefreshToken, getComment);
commentRouter.get('/:id/pinned', verifyToken, getCommentPinned);
commentRouter.get('/:id/unpinned', verifyToken, getCommentUnpinned);
commentRouter.get('/:id/like', verifyToken, getCommentLike);
commentRouter.get('/:id/unlike', verifyToken, getCommentUnlike);
