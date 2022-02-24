import Post from '../models/Post.js';
// import Tag from '../models/Tag.js';

export const postUpload = async (req, res) => {
  console.log(req.body);
  const { title, tag, content, targetAge } = req.body;
  try {
    await Post.create({
      title,
      tagData: tag,
      content,
      targetAge,
    });

    return res.json({
      success: true,
      post_id: '1111',
      message: '새로운 게시글 작성이 완료되었습니다.',
    });
  } catch (error) {
    console.log(error);
    return res.json({ Error: error });
  }
};

// export const tagUpload = async (req, res) => {
//   const { text } = req.body;
//   try {
//     await Tag.create({
//       text,
//     });

//     return res.json({
//       success: true,
//       post_id: '1111',
//       message: '새로운 태그 작성이 완료되었습니다.',
//     });
//   } catch (error) {
//     console.log(error);
//     return res.json({ Error: error });
//   }
// };
