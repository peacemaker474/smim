import Report from '../models/Report.js';

export const getReportTargets = async (req, res) => {
  const { target } = req.params;

  const reportData = await Report.find({
    target: target,
  });

  return res.status(200).send({
    success: true,
    data: reportData,
  });
};

export const postReportTarget = async (req, res) => {
  const { target, id } = req.params;
  const { type } = req.body;

  const report = await Report.create({
    targetId: id,
    target: target,
  });
  report.typeCount[type].count += 1;
  await report.save();

  return res.status(200).send({
    success: true,
    message: '신고가 완료되었습니다',
  });
};

export const deleteReportTarget = async (req, res) => {
  const { id } = req.params;
  await Report.deleteOne({ targetId: id });

  return res.status(200).send({
    success: true,
    message: '신고가 해제되었습니다',
  });
};
