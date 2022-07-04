import React, { useState, useEffect, useCallback } from 'react';
import { getReadPostDetail } from '../../../../network/post/http';
import { useDispatch, useSelector } from 'react-redux';
import { getPostData } from '../../../../redux/slice/postSlice';
import { pinnedCommentId } from '../../../../redux/slice/commentSlice';
import PostPostPresenter from './PostPost.style';

export default function PostPost({ postId }) {
  const tkn = useSelector((state) => state.authToken).accessToken;
  const [postDetail, setPostDetail] = useState({
    targetAge: '',
    content: '',
    title: '',
    owner: { nickname: '', _id: '' },
    createAt: '',
    hashtag: [],
    like: false,
    bookmark: false,
    meta: { likes: 0, views: 0 },
  });
  const dispatch = useDispatch();

  const loadPostDetail = useCallback(async () => {
    try {
      if (tkn) {
        const response = await getReadPostDetail(postId, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tkn}`,
          },
        });
        setPostDetail(response.data);
        dispatch(getPostData(postId, response.data.owner.nickname));
      } else {
        const response = await getReadPostDetail(postId);
        setPostDetail(response.data);
        dispatch(getPostData(postId, response.data.owner.nickname));
      }
    } catch (error) {
      console.error(error);
    }
  }, [postId, tkn, dispatch]);

  useEffect(() => {
    if (postDetail.meta.pinnedCmnt) {
      dispatch(pinnedCommentId(postDetail.meta.pinnedCmnt));
    }
    loadPostDetail();
  }, [loadPostDetail, dispatch, postDetail.meta.pinnedCmnt]);

  const date = new Date(postDetail.createAt);

  return <PostPostPresenter postDetail={postDetail} postId={postId} date={date} />;
}
