import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPostView, getReadPostDetail } from '../../../../network/post/http';
import { pinnedCommentId } from '../../../../redux/slice/commentSlice';
import LoadingPage from '../../../../pages/LoadingPage';
import NotFound from '../../../../pages/NotFound';
import PostPostPresenter from './PostPost.style';

function PostPost() {
  const tkn = useSelector((state) => state.authToken).accessToken;
  const dispatch = useDispatch();
  const { id: postId } = useParams();
  console.log('rendering post');

  const getDetail = async () => {
    try {
      if (tkn) {
        const response = await getReadPostDetail(postId, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tkn}`,
          },
        });
        const post = response.data;
        console.log(post);
        const viewResponse = await getPostView(postId);
        const view = viewResponse.data;
        console.log(view);

        return post;
      } else {
        const response = await getReadPostDetail(postId);
        const post = response.data;
        const viewResponse = await getPostView(postId);
        const view = viewResponse.data;
        console.log(view);

        return post;
      }
    } catch (error) {
      console.error(error);
      alert('Token Error');
    }
  };

  const { data: postDetail, isLoading, isError } = useQuery('postDetail', getDetail);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError) {
    alert('Token Error');
    return <NotFound />;
  }

  if (postDetail.meta.pinnedCmnt) {
    dispatch(pinnedCommentId(postDetail.meta.pinnedCmnt));
  }

  const date = new Date(postDetail.createAt);

  return <PostPostPresenter postDetail={postDetail} postId={postId} date={date} />;
}

export default PostPost;
