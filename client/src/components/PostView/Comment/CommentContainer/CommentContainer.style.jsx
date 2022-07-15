import React from 'react';
import styled from 'styled-components';
// import CommentWrapper from '../CommentWrapper/CommentWrapper';
import CommentCreated from '../CommentCreated/CommentCreated';
import CommentPinned from '../CommentPinned/CommentPinned';
import CommentUploaded from '../CommentUploaded/CommentUploaded';
export default function CommentContainerPresenter() {
  return (
    <>
      <CommentList>
        <CommentPinned />
        <CommentCreated />
        <CommentUploaded />
      </CommentList>
    </>
  );
}

const CommentList = styled.div``;
