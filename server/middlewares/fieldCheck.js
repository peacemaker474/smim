export const fieldCheck = async (req, res) => {
  const { title, content, hashtag, targetAge } = req.body;

  if (!title) {
    return res.status(400).send({
      success: false,
      message: 'title이 undefined입니다.',
    });
  } else if (!hashtag) {
    return res.status(400).send({
      success: false,
      message: 'hashtag가 undefined입니다.',
    });
  } else if (!content) {
    return res.status(400).send({
      success: false,
      message: 'content가 undefined입니다.',
    });
  } else if (
    !(
      targetAge === '10' ||
      targetAge === '20' ||
      targetAge === '30' ||
      targetAge === '40' ||
      targetAge === '50'
    )
  ) {
    return res.status(400).send({
      success: false,
      message: '해당 연령대는 존재하지 않습니다',
    });
    // 400을 할지 404를 할지
  } else {
    next();
  }
};
