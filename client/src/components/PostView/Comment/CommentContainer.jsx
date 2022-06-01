import React, { useEffect, useCallback, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { getCommentListRead } from '../../../network/comment/http';
import { getCookie } from '../../../utils/cookie';
import CommentWrapper from './CommentWrapper';

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
    <CommentList>
      {uploadingComments.length !== 0 &&
        uploadingComments
          .sort((a, b) => {
            return a.createAt > b.createAt ? -1 : a.create < b.create ? 1 : 0;
          })
          .map((el) => <CommentWrapper key={el._id} cmntData={el} />)}
      {loadedComments &&
        loadedComments
          .sort((a, b) => {
            return a.createAt > b.createAt ? -1 : a.create < b.create ? 1 : 0;
          })
          .map((el) => <CommentWrapper key={el._id} cmntData={el} />)}
    </CommentList>
  );
}

const CommentList = styled.div``;
