import React, { useEffect, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { getCommentListRead } from '../../../../network/comment/http';
import { getCookie } from '../../../../utils/cookie';
import CommentContainerPresenter from './CommentContainer.style';

export default function CommentContainer({ postId }) {
  const tkn = getCookie('users');
  const [loadedComments, setLoadedComments] = useState();
  const createdComments = useSelector((state) => state.commentReducer);

  const loadComments = useCallback(async () => {
    const response = await getCommentListRead(
      { post_id: postId },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tkn}`,
        },
      }
    );

    setLoadedComments(response.data);
  }, [postId, tkn]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  const uploadingComments = createdComments.filter((el) => el.parent_id == null);

  return (
    <CommentContainerPresenter
      uploadingComments={uploadingComments}
      loadedComments={loadedComments}
    />
  );
}
