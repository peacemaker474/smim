import React from 'react';
import { useQuery } from 'react-query';
// import React, { useState, useEffect, useCallback } from 'react';
import { getReadPostDetail } from '../../../../network/post/http';
import { useDispatch, useSelector } from 'react-redux';
import LoadingPage from '../../../../pages/LoadingPage';
// import { useDispatch, useSelector } from 'react-redux';
// import { getPostData } from '../../../../redux/slice/postSlice';
import { pinnedCommentId } from '../../../../redux/slice/commentSlice';
import PostPostPresenter from './PostPost.style';
import NotFound from '../../../../pages/NotFound';

export default function PostPost({ postId }) {
  const tkn = useSelector((state) => state.authToken).accessToken;
  const dispatch = useDispatch();

  const getDetail = async () => {
    try {
      if (tkn) {
        const response = await getReadPostDetail(postId, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tkn}`,
          },
        });
        return response.data;
      } else {
        const response = await getReadPostDetail(postId);
        return response.data;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const { data: postDetail, isLoading, isError, status } = useQuery('postDetail', getDetail);

  console.log(status);

  console.log(isLoading, isError);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError) {
    return <NotFound />;
  }

  console.log(postDetail);

  if (postDetail.meta.pinnedCmnt) {
    dispatch(pinnedCommentId(postDetail.meta.pinnedCmnt));
  }

  const date = new Date(postDetail.createAt);

  return <PostPostPresenter postDetail={postDetail} postId={postId} date={date} />;
}
