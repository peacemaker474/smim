import express from 'express';
import {
  getReportTargets,
  postReportTarget,
  deleteReportTarget,
} from '../controllers/reportController.js';

const reportRouter = express.Router();

reportRouter.get('/:target', getReportTargets); // 신고내역 가져오기(관리자) report/post + report/comment
reportRouter.post('/:target/:id', postReportTarget); // 신고하기 report/id(post)
reportRouter.delete('/:target/:id', deleteReportTarget); // 신고 해제하기

export default reportRouter;
