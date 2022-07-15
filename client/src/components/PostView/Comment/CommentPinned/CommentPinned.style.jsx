import React from 'react';
import styled from 'styled-components';
import CommentWrapper from '../CommentWrapper/CommentWrapper';

export default function CommentPinnedPresenter({ pinnedComment, pinnedId }) {
  return (
    <>
      {pinnedId ? (
        <CommentPinnedDiv>
          <CommentWrapper cmntData={pinnedComment} />
        </CommentPinnedDiv>
      ) : null}
    </>
  );
}

const CommentPinnedDiv = styled.div`
  border: solid 1px red;
`;
