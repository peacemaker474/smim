import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PostHeadPresenter from './PostHead.style';
import { getPostView } from '../../../../network/post/http';

export default function PostHead({ postDetail, date }) {
  const { owner: author } = postDetail;
  const [view, setView] = useState(0);
  const { id: userId } = useSelector((state) => state.user);

  const fetchAPI = useCallback(async () => {
    const view = await getPostView(postDetail._id);
    setView(view.data.data.views);
  }, [postDetail._id]);

  useEffect(() => {
    fetchAPI();
  }, [fetchAPI]);

  const postDate = date.toLocaleDateString();

  return <PostHeadPresenter author={author} userId={userId} postDate={postDate} postViews={view} />;
}
