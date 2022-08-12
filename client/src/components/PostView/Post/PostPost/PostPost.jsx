import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getReadPostDetail } from '../../../../network/post/http';
import LoadingPage from '../../../../pages/LoadingPage';
import PostPostPresenter from './PostPost.style';
import { getPinnedCommentData } from '../../../../redux/services/comment';
import { pinnedInitCommentId } from '../../../../redux/slice/commentSlice';
import { getPostData } from '../../../../redux/slice/postSlice';
import { getCookie } from '../../../../utils/cookie';

function PostPost({ setPostViewState }) {
  const tkn = getCookie();
  const user = useSelector((state) => state.user);
  const { id: postId } = useParams();
  const dispatch = useDispatch();

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
      setPostViewState(true);
      return error.response.status;
    }
  };

  const { data: postDetail, isLoading } = useQuery([('postDetail', { postId })], fetchAPI);

  if (isLoading) {
    return <LoadingPage />;
  }

  const date = new Date(postDetail.createAt);

  return <PostPostPresenter postDetail={postDetail} postId={postId} date={date} user={user} />;
}

export default PostPost;
