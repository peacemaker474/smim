import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPostView, getReadPostDetail } from '../../../../network/post/http';
import LoadingPage from '../../../../pages/LoadingPage';
import NotFound from '../../../../pages/NotFound';
import PostPostPresenter from './PostPost.style';
import { getPinnedCommentData } from '../../../../redux/services/comment';
import { getPostData } from '../../../../redux/slice/postSlice';

function PostPost() {
  const tkn = useSelector((state) => state.authToken).accessToken;
  const user = useSelector((state) => state.user);
  const { id: postId } = useParams();
  const dispatch = useDispatch();

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
      const view = await getPostView(postId);
      console.log(view.data.data);
      if (post.meta.pinnedCmnt) {
        dispatch(getPinnedCommentData({ pinnedId: post.meta.pinnedCmnt, tkn }));
      }

      dispatch(getPostData(post._id, post.owner.nickname));

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

  const date = new Date(postDetail.createAt);

  return <PostPostPresenter postDetail={postDetail} postId={postId} date={date} user={user} />;
}

export default PostPost;
