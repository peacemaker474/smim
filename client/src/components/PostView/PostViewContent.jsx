import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import PostPost from './Post/PostPost/PostPost';
import PostComment from './Comment/PostComment/PostComment';
import { getPinnedCommentData } from '../../redux/services/comment';
import { pinnedInitCommentId } from '../../redux/slice/commentSlice';
import { getPostData } from '../../redux/slice/postSlice';
import { getReadPostDetail } from '../../network/post/http';
import LoadingPage from '../../pages/LoadingPage';
import NotFoundPage from '../../pages/NotFound';

function PostViewContent() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const { id: postId } = useParams();

  const fetchAPI = async ({ queryKey }) => {
    const [{ postId }] = queryKey;

    try {
      const { data } = await getReadPostDetail(postId);

      if (data.meta.pinnedCmnt) {
        dispatch(getPinnedCommentData({ pinnedId: data.meta.pinnedCmnt }));
      } else {
        dispatch(pinnedInitCommentId());
      }
      dispatch(
        getPostData({
          postId: data._id,
          postWriter: data.owner.nickname,
          postAge: data.targetAge,
        })
      );

      return data;
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

  const date = new Date(postDetail.updateAt);

  return (
    <>
      <PostPost postDetail={postDetail} postId={postId} date={date} user={user} />
      <PostComment />
    </>
  );
}

export default PostViewContent;
