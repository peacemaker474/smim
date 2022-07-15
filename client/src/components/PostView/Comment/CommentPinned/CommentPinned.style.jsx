import React from 'react';
import styled from 'styled-components';
import CommentWrapper from '../CommentWrapper/CommentWrapper';

export default function CommentPinnedPresenter({ pinnedComment, pinnedId }) {
  console.log(pinnedComment);
  return (
    <>
      {pinnedId ? (
        <CommentPinnedDiv>
          {pinnedComment &&
            pinnedComment.map((el, idx) => <CommentWrapper key={idx} cmntData={el} />)}
        </CommentPinnedDiv>
      ) : null}{' '}
    </>
  );
}

const CommentPinnedDiv = styled.div`
  border: solid 1px red;
`;
