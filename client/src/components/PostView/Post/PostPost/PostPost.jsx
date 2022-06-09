import React, { useState, useEffect, useCallback } from 'react';
import { postReadPostDetail } from '../../../../network/post/http';
import { getCookie } from '../../../../utils/cookie';
import PostPostPresenter from './PostPost.style';

export default function PostPost({ postId }) {
  const tkn = getCookie('users');
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

  const loadPostDetail = useCallback(async () => {
    try {
      if (tkn) {
        const response = await postReadPostDetail(postId, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tkn}`,
          },
        });
        setPostDetail(response.data);
      } else {
        const response = await postReadPostDetail(postId);
        setPostDetail(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }, [postId, tkn]);

  useEffect(() => {
    loadPostDetail();
  }, [loadPostDetail]);

  const date = new Date(postDetail.createAt);

  return <PostPostPresenter postDetail={postDetail} postId={postId} date={date} />;
}
