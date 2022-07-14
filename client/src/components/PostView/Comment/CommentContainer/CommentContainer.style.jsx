import React from 'react';
import styled from 'styled-components';
// import CommentWrapper from '../CommentWrapper/CommentWrapper';
import CommentCreated from '../CommentCreated/CommentCreated';
import CommentUploaded from '../CommentUploaded/CommentUploaded';
export default function CommentContainerPresenter() {
  // uploadingComments,
  // sortedLoadedComments,
  // pinnedLoadedComment,
  // pinnedUploadingComment,
  // pinnedId,
  return (
    <>
      {/* {pinnedId ? (
        <CommentPinnedDiv>
          {pinnedUploadingComment.length !== 0 &&
            pinnedUploadingComment.map((el, idx) => <CommentWrapper key={idx} cmntData={el} />)}
          {pinnedLoadedComment &&
            pinnedLoadedComment.map((el, idx) => <CommentWrapper key={idx} cmntData={el} />)}
        </CommentPinnedDiv>
      ) : null} */}
      <CommentList>
        <CommentCreated />
        <CommentUploaded />
      </CommentList>
    </>
  );
}

// const CommentPinnedDiv = styled.div`
//   border: solid 1px red;
// `;
const CommentList = styled.div``;
