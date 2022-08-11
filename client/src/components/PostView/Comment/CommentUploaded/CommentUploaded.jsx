import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getCommentListRead } from '../../../../network/comment/http';
import CommentUploadedPresenter from './CommentUploaded.style';
import LoadingPage from '../../../../pages/LoadingPage';
import { getCookie } from '../../../../utils/cookie';

export default function CommentUploaded() {
  const tkn = getCookie();
  const pinnedId = useSelector((state) => state.comment).pinnedId;
  const { id: postid } = useParams();

  const loadComments = async ({ queryKey }) => {
    const [{ postid }] = queryKey;
    try {
      let response;
      if (tkn) {
        response = await getCommentListRead(postid, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tkn}`,
          },
        });
      } else {
        response = await getCommentListRead(postid);
      }
      return response.data.data;
    } catch (error) {
      console.error(error);
    }
  };

  const { data: loadedComments, isLoading } = useQuery(
    [('commentArray', { postid })],
    loadComments
  );
  if (isLoading) {
    return <LoadingPage />;
  }

  const sortedLoadedComments =
    loadedComments &&
    loadedComments
      .filter((el) => String(el[0]._id) !== pinnedId)
      .filter((el) => el[0].being === true)
      .sort((a, b) => {
        return a[0].createAt > b[0].createAt ? -1 : a[0].create < b[0].create ? 1 : 0;
      });

  return <CommentUploadedPresenter sortedLoadedComments={sortedLoadedComments} />;
}
