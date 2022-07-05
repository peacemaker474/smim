import React from 'react';
import styled from 'styled-components';
import CommentWrapper from '../CommentWrapper/CommentWrapper';
export default function CommentContainerPresenter({
  uploadingComments,
  sortedLoadedComments,
  pinnedLoadedComment,
  pinnedUploadingComment,
  pinnedId,
}) {
  return (
    <>
      {pinnedId ? (
        <CommentPinnedDiv>
          {pinnedUploadingComment.length !== 0 &&
            pinnedUploadingComment.map((el, idx) => <CommentWrapper key={idx} cmntData={el} />)}
          {pinnedLoadedComment &&
            pinnedLoadedComment.map((el, idx) => <CommentWrapper key={idx} cmntData={el} />)}
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
