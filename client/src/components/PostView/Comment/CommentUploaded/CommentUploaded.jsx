import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getCommentListRead } from '../../../../network/comment/http';
import CommentUploadedPresenter from './CommentUploaded.style';
import LoadingPage from '../../../../pages/LoadingPage';

export default function CommentUploaded() {
  const tkn = useSelector((state) => state.authToken).accessToken;
  const pinnedId = useSelector((state) => state.comment).pinnedId;
  const { id: postId } = useParams();

  const loadComments = async () => {
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

    return response.data.data;
  };

  const { data: loadedComments, isLoading } = useQuery('commentArray', loadComments);
  if (isLoading) {
    return <LoadingPage />;
  }

  const sortedLoadedComments =
    loadedComments &&
    loadedComments
      .filter((el) => String(el[0]._id) !== pinnedId)
      .sort((a, b) => {
        return a[0].createAt > b[0].createAt ? -1 : a[0].create < b[0].create ? 1 : 0;
      });

  return <CommentUploadedPresenter sortedLoadedComments={sortedLoadedComments} />;
}
