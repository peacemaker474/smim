import React from 'react';
import styled from 'styled-components';
import CommentWrapper from '../CommentWrapper/CommentWrapper';
export default function CommentContainerPresenter({
  uploadingComments,
  sortedLoadedComments,
  pinnedComment,
  pinnedId,
}) {
  return (
    <>
      {pinnedId && pinnedComment ? (
        <CommentPinnedDiv>
          <CommentWrapper cmntData={pinnedComment} />
        </CommentPinnedDiv>
      ) : null}
      <CommentList>
        {uploadingComments.length !== 0 &&
          uploadingComments.map((el, idx) => <CommentWrapper key={idx} cmntData={el} />)}
        {sortedLoadedComments &&
          sortedLoadedComments.map((el, idx) => <CommentWrapper key={idx} cmntData={el} />)}
      </CommentList>
    </>
  );
}

const CommentPinnedDiv = styled.div`
  border: solid 1px red;
`;
const CommentList = styled.div``;
