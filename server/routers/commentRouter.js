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
import { verifyToken } from '../controllers/tokenControllers.js';

// import { existPostCheckAndData } from '../middlewares.js';

export const commentRouter = express.Router();

commentRouter
  .route('/:id')
  .get(getComment)
  .put(verifyToken, putCommentEdit)
  .delete(verifyToken, deleteComment);
commentRouter.get('/:id/detail', verifyToken, getComment);
commentRouter.get('/:id/pinned', verifyToken, getCommentPinned);
commentRouter.get('/:id/unpinned', verifyToken, getCommentUnpinned);
commentRouter.get('/:id/like', verifyToken, getCommentLike);
commentRouter.get('/:id/unlike', verifyToken, getCommentUnlike);
