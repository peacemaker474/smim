import Report from '../models/Report.js';
import Comment from '../models/Comment.js';
import Post from '../models/Post.js';

export const postReportTarget = async (req, res) => {
  const { target, id } = req.params;
  const { type, user } = req.body;
  let { report } = req.body;

  if (!report) {
    report = await Report.create({
      targetId: id,
      target: target,
    });
  }
  report.typeCount[type].count += 1;
  report.reporter.push(user._id);
  await report.save();

  return res.status(200).send({
    success: true,
    message: '신고가 완료되었습니다',
  });
};

export const getTargetBlind = async (req, res) => {
  const { target, id } = req.params;

  if (target === 'post') {
    await Post.findByIdAndUpdate(id, { block: true });
  } else {
    await Comment.findByIdAndUpdate(id, { block: true });
  }

  return res.status(200).send({
    success: true,
    message: '게시물이 차단되었습니다.',
  });
};

export const deleteReportTarget = async (req, res) => {
  const { target, id } = req.params;
  await Report.deleteOne({ targetId: id });

  if (target === 'post') {
    await Post.findByIdAndUpdate(id, { block: false });
  } else {
    await Comment.findByIdAndUpdate(id, { block: false });
  }

  return res.status(200).send({
    success: true,
    message: '신고가 취소되었고 게시물 차단이 해제되었습니다',
  });
};
