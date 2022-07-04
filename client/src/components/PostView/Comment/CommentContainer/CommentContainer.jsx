import React, { useEffect, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { getCommentListRead } from '../../../../network/comment/http';
import CommentContainerPresenter from './CommentContainer.style';

export default function CommentContainer({ postId }) {
  const tkn = useSelector((state) => state.authToken).accessToken;
  const [loadedComments, setLoadedComments] = useState();
  const createdComments = useSelector((state) => state.commentCreate);
  const pinnedId = useSelector((state) => state.comment).pinnedId;

  const loadComments = useCallback(async () => {
    let response;
    if (tkn) {
      response = await getCommentListRead(postId, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tkn}`,
        },
      });
    } else {
      response = await getCommentListRead(postId);
    }

    if (response.data.success) {
      setLoadedComments(response.data.data);
    }
  }, [postId, tkn]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  const uploadingComments = createdComments
    .filter((el) => el.parent_id == null)
    .filter((el) => String(el._id) !== pinnedId)
    .sort((a, b) => {
      return a.createAt > b.createAt ? -1 : a.create < b.create ? 1 : 0;
    });

  const sortedLoadedComments =
    loadedComments &&
    loadedComments
      .filter((el) => String(el[0]._id) !== pinnedId)
      .sort((a, b) => {
        return a[0].createAt > b[0].createAt ? -1 : a[0].create < b[0].create ? 1 : 0;
      });

  const pinnedLoadedComment =
    loadedComments && loadedComments.filter((el) => String(el[0]._id) === pinnedId);
  const pinnedUploadingComment = createdComments.filter((el) => String(el._id) === pinnedId);

  return (
    <CommentContainerPresenter
      uploadingComments={uploadingComments}
      sortedLoadedComments={sortedLoadedComments}
      pinnedLoadedComment={pinnedLoadedComment}
      pinnedUploadingComment={pinnedUploadingComment}
      pinnedId={pinnedId}
    />
  );
}
