import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import PostPost from './Post/PostPost/PostPost';
import PostComment from './Comment/PostComment/PostComment';
import { getPinnedCommentData } from '../../redux/services/comment';
import { pinnedInitCommentId } from '../../redux/slice/commentSlice';
import { getPostData } from '../../redux/slice/postSlice';
import { getCookie } from '../../utils/cookie';
import { getReadPostDetail } from '../../network/post/http';
import LoadingPage from '../../pages/LoadingPage';
import NotFoundPage from '../../pages/NotFound';

function PostViewContent() {
  const tkn = getCookie();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { id: postId } = useParams();

  const fetchAPI = async ({ queryKey }) => {
    const [{ postId }] = queryKey;
    let post;
    try {
      if (tkn) {
        const response = await getReadPostDetail(postId, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tkn}`,
          },
        });
        post = response.data;
      } else {
        const response = await getReadPostDetail(postId);
        post = response.data;
      }

      if (post.meta.pinnedCmnt) {
        dispatch(getPinnedCommentData({ pinnedId: post.meta.pinnedCmnt, tkn }));
      } else {
        dispatch(pinnedInitCommentId());
      }

      dispatch(getPostData(post._id, post.owner.nickname));

      return post;
    } catch (error) {
      return error.response.status;
    }
  };

  const {
    data: postDetail,
    isLoading,
    isFetching,
  } = useQuery([('postDetail', { postId })], fetchAPI);

  if (isLoading || isFetching) {
    return <LoadingPage />;
  }

  if (postDetail === 404) {
    return <NotFoundPage />;
  }

  const date = new Date(postDetail.createAt);

  return (
    <>
      <PostPost postDetail={postDetail} postId={postId} date={date} user={user} />
      <PostComment />
    </>
  );
}

export default PostViewContent;
