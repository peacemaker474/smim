import Post from '../models/Post.js';
// import Tag from '../models/Tag.js';

// 게시물 생성
export const postCreate = async (req, res) => {
  const { title, tagArray, textContent, targetAge } = req.body;
  console.log(req.body);
  try {
    await Post.create({
      title,
      tagArray,
      textContent,
      targetAge,
      owner: req.body.user.user_id,
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

// 게시물 수정
export const putEdit = async (req, res) => {
  const { id } = req.params;
  // const { title, tagArray, textContent, targetAge } = req.body;
  // console.log(title, tagArray, textContent, targetAge);
  const postData = await Post.exists({ _id: id });
  if (postData) {
    await Post.findByIdAndUpdate(id, { title: req.body.title });
    return res.json({ result: 'success' });
  }
  return res.json(id);
};

// 게시물 보기
export const getPostDetail = async (req, res) => {
  const { id } = req.params;
  const exist = await Post.exists({ _id: id });
  if (exist) {
    const postData = await Post.findById(id);
    return res.json(postData);
  }
  return res.json({ result: 'success' });
};

// 나이별 게시물 보기
export const getPostList = async (req, res) => {
  const { age } = req.query;
  const postList = await Post.find({ age });
  res.json(postList);
};

// 게시물 삭제
export const deletePost = async (req, res) => {
  const { id } = req.params;
  const postData = await Post.exists({ _id: id });
  if (postData) {
    await Post.findByIdAndUpdate(id, { being: false });
    return res.json({ result: 'success' });
  }
  return res.json(id);
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
