import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPostView, getReadPostDetail } from '../../../../network/post/http';
import { pinnedCommentId } from '../../../../redux/slice/commentSlice';
import LoadingPage from '../../../../pages/LoadingPage';
import NotFound from '../../../../pages/NotFound';
import PostPostPresenter from './PostPost.style';
import { getPinnedCommentData } from '../../../../redux/services/comment';

function PostPost() {
  const tkn = useSelector((state) => state.authToken).accessToken;
  const dispatch = useDispatch();
  const { id: postId } = useParams();

  console.log('rendering PostPost');

  const fetchAPI = async () => {
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
      await getPostView(postId);

      return post;
    } catch (error) {
      console.error(error);
      alert('Token Error');
      return error;
    }
  };

  const { data: postDetail, isLoading, isError } = useQuery('postDetail', fetchAPI);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError) {
    return <NotFound />;
  }

  if (postDetail.meta.pinnedCmnt) {
    dispatch(pinnedCommentId(postDetail.meta.pinnedCmnt));
    console.log(tkn);
    dispatch(getPinnedCommentData({ pinnedId: postDetail.meta.pinnedCmnt, tkn }));
  }

  const date = new Date(postDetail.createAt);

  return <PostPostPresenter postDetail={postDetail} postId={postId} date={date} />;
}

export default PostPost;
