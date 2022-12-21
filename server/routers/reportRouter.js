import express from 'express';
import { verifyToken } from '../controllers/tokenControllers.js';
import { checkPostAndCommentExist, checkReportExist } from '../middlewares.js';
import {
  postReportTarget,
  getTargetBlind,
  deleteReportTarget,
} from '../controllers/reportController.js';

const reportRouter = express.Router();

reportRouter
  .route('/:target/:id')
  .get(verifyToken, checkPostAndCommentExist, checkReportExist, getTargetBlind) // 게시물 가리기(관리자)
  .post(
    verifyToken,
    checkPostAndCommentExist,
    checkReportExist,
    postReportTarget
  ) // 신고하기 report/id (사용자)
  .delete(
    verifyToken,
    checkPostAndCommentExist,
    checkReportExist,
    deleteReportTarget
  ); // 신고 해제 및 게시물 보이기(관리자)

export default reportRouter;
