import express from 'express';
import {
  postPostCreate,
  putPostEdit,
  deletePost,
  getPostDetail,
  getPostList,
  getPostView,
  getPostSearch,
} from '../controllers/postController.js';
import { getPostLike, getPostUnlike } from '../controllers/likeController.js';
import { getBookmark, getUnbookmark } from '../controllers/bookmarkController.js';
import { verifyToken } from '../controllers/tokenControllers.js';
import { postCommentCreate, getCommentList } from '../controllers/commentController.js';
import {
  existPostAndOwnerCheck,
  existPostCheckAndData,
  existPostCheck,
  fieldCheck,
  postImageUpload,
} from '../middlewares.js';

export const postRouter = express.Router();

postRouter.get('/target', getPostList);
postRouter.get('/search', getPostSearch);
postRouter.post('/create', verifyToken, fieldCheck, postPostCreate);
postRouter.post('/comment', verifyToken, postCommentCreate);
postRouter.post('/img', postImageUpload.single('img'), () => {
  console.log('전달받은 파일', req.file);
  console.log('저장된 파일의 이름', req.file.filename);

  // 파일이 저장된 경로를 클라이언트에게 반환해준다.
  const IMG_URL = `http://localhost:4000/uploads/${req.file.filename}`;
  console.log(IMG_URL);
  res.json({ url: IMG_URL });
});

postRouter
  .route('/:id')
  .get(existPostCheckAndData, getPostDetail)
  .put(verifyToken, fieldCheck, existPostAndOwnerCheck, putPostEdit)
  .delete(verifyToken, existPostAndOwnerCheck, deletePost);

postRouter.get('/:id/detail', verifyToken, existPostCheckAndData, getPostDetail);
postRouter.get('/:id/view', existPostCheckAndData, getPostView);
postRouter.get('/:id/bookmark', verifyToken, existPostCheck, getBookmark);
postRouter.get('/:id/unbookmark', verifyToken, existPostCheck, getUnbookmark);
postRouter.get('/:id/like', verifyToken, existPostCheckAndData, getPostLike);
postRouter.get('/:id/unlike', verifyToken, existPostCheckAndData, getPostUnlike);
postRouter.get('/:id/comment', getCommentList);
postRouter.get('/:id/comment/detail', verifyToken, getCommentList);
postRouter.get('/:id/detailComment', verifyToken, getCommentList);
