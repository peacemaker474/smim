import React from 'react';
import CommentWrapper from '../CommentWrapper/CommentWrapper';

export default function CommentCreatedPresenter({ uploadingComments }) {
  return (
    <>
      {uploadingComments.length !== 0 &&
        uploadingComments.map((el, idx) => <CommentWrapper key={idx} cmntData={el} />)}
    </>
  );
}
