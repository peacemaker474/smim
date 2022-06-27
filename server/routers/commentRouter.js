import express from 'express';
import {
  putCommentEdit,
  deleteComment,
  getCommentLike,
  getCommentUnlike,
  getCommentPinned,
} from '../controllers/commentController.js';
import { verifyToken } from '../controllers/tokenControllers.js';

// import { existPostCheckAndData } from '../middlewares.js';

export const commentRouter = express.Router();

commentRouter.route('/:id').put(verifyToken, putCommentEdit).delete(verifyToken, deleteComment);
commentRouter.get('/:id/pinned', verifyToken, getCommentPinned);
commentRouter.get('/:id/like', verifyToken, getCommentLike);
commentRouter.get('/:id/unlike', verifyToken, getCommentUnlike);
