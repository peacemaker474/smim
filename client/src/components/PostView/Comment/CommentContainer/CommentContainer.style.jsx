import React from 'react';
import styled from 'styled-components';
import CommentWrapper from '../CommentWrapper/CommentWrapper';
export default function CommentContainerPresenter({ uploadingComments, sortedLoadedComments }) {
  return (
    <CommentList>
      {uploadingComments.length !== 0 &&
        uploadingComments.map((el, idx) => <CommentWrapper key={idx} cmntData={el} />)}
      {sortedLoadedComments &&
        sortedLoadedComments.map((el, idx) => <CommentWrapper key={idx} cmntData={el} />)}
    </CommentList>
  );
}

const CommentList = styled.div``;
