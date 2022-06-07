import React from 'react';
import styled from 'styled-components';
import CommentWrapperPresenter from '../CommentWrapper/CommentWrapper.style';
export default function CommentContainerPresenter({ uploadingComments, loadedComments }) {
  return (
    <CommentList>
      {uploadingComments.length !== 0 &&
        uploadingComments
          .sort((a, b) => {
            return a.createAt > b.createAt ? -1 : a.create < b.create ? 1 : 0;
          })
          .map((el) => <CommentWrapperPresenter key={el._id} cmntData={el} />)}
      {loadedComments &&
        loadedComments
          .sort((a, b) => {
            return a.createAt > b.createAt ? -1 : a.create < b.create ? 1 : 0;
          })
          .map((el) => <CommentWrapperPresenter key={el._id} cmntData={el} />)}
    </CommentList>
  );
}

const CommentList = styled.div``;
