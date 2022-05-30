import React, { useEffect, useCallback, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { commentListRead } from '../../../network/comment/http';
import { getCookie } from '../../../utils/cookie';
import CommentContainerItem from './CommentContainerItem';

export default function CommentContainer({ postId }) {
  const tkn = getCookie('users');
  const [readedComments, setReadedComments] = useState();
  const commentContent = useSelector((state) => state.commentCreateReducer);

  const commentsRead = useCallback(async () => {
    const response = await commentListRead(
      { post_id: postId },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tkn}`,
        },
      }
    );

    setReadedComments(response.data);
  }, [postId, tkn]);

  useEffect(() => {
    commentsRead();
  }, [commentsRead]);

  const cmntMainData = commentContent.filter((el) => el.parent_id == null);

  return (
    <CommentArrayContainer>
      {cmntMainData.length !== 0 &&
        cmntMainData
          .sort((a, b) => {
            return a.createAt > b.createAt ? -1 : a.create < b.create ? 1 : 0;
          })
          .map((el) => <CommentContainerItem key={el._id} data={el} />)}
      {readedComments &&
        readedComments
          .sort((a, b) => {
            return a.createAt > b.createAt ? -1 : a.create < b.create ? 1 : 0;
          })
          .map((el) => <CommentContainerItem key={el._id} data={el} />)}
    </CommentArrayContainer>
  );
}

const CommentArrayContainer = styled.div``;
