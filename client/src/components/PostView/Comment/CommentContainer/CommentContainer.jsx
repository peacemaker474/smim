import React, { useEffect, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { getCommentListRead } from '../../../../network/comment/http';
import CommentContainerPresenter from './CommentContainer.style';

export default function CommentContainer({ postId }) {
  const tkn = useSelector((state) => state.authToken).accessToken;
  const [loadedComments, setLoadedComments] = useState();
  const createdComments = useSelector((state) => state.commentCreate);

  const loadComments = useCallback(async () => {
    const response = await getCommentListRead(postId, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tkn}`,
      },
    });

    if (response.data.success) {
      setLoadedComments(response.data.data);
    }
  }, [postId, tkn]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  const uploadingComments = createdComments
    .filter((el) => el.parent_id == null)
    .sort((a, b) => {
      return a.createAt > b.createAt ? -1 : a.create < b.create ? 1 : 0;
    });

  const sortedLoadedComments =
    loadedComments &&
    loadedComments.sort((a, b) => {
      return a[0].createAt > b[0].createAt ? -1 : a[0].create < b[0].create ? 1 : 0;
    });

  const pinnedComment = useSelector((state) => state.comment).pinnedData;
  const pinnedId = useSelector((state) => state.comment).pinnedId;

  return (
    <CommentContainerPresenter
      uploadingComments={uploadingComments}
      sortedLoadedComments={sortedLoadedComments}
      pinnedComment={pinnedComment}
      pinnedId={pinnedId}
    />
  );
}
