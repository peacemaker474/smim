import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getReadPostDetail } from '../../../../network/post/http';
import LoadingPage from '../../../../pages/LoadingPage';
import NotFound from '../../../../pages/NotFound';
import PostPostPresenter from './PostPost.style';
import { getPinnedCommentData } from '../../../../redux/services/comment';
import { pinnedInitCommentId } from '../../../../redux/slice/commentSlice';
import { getPostData } from '../../../../redux/slice/postSlice';
import { getCookie } from '../../../../utils/cookie';
import { postCreateAccessToken } from '../../../../network/main/http';
import { SET_TOKEN } from '../../../../redux/auth';

function PostPost() {
  const tkn = useSelector((state) => state.authToken).accessToken;
  const user = useSelector((state) => state.user);
  const { id: postId } = useParams();

  const dispatch = useDispatch();
  const { authenticated, expireTime } = useSelector(
    (state) => ({
      authenticated: state.authToken.authenticated,
      expireTime: state.authToken.expireTime,
    }),
    shallowEqual
  );
  const { pathname } = useLocation();

  useEffect(() => {
    if (authenticated && expireTime - new Date().getTime() < 5000) {
      console.log('재발급');
      let data = {
        refreshToken: getCookie(),
      };
      postCreateAccessToken(data).then((res) => {
        if (res.data.success) {
          dispatch(SET_TOKEN(res.data.accessToken));
        }
      });
    }
  }, [authenticated, dispatch, expireTime, pathname]);

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
      console.error(error);
      return error;
    }
  };

  const { data: postDetail, isLoading, isError } = useQuery([('postDetail', { postId })], fetchAPI);

  console.log('PostPost render');

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
