import React from 'react';
import CommentWrapper from '../CommentWrapper/CommentWrapper';

export default function CommentCreatedPresenter({ uploadingComments }) {
  return (
    <>
      {uploadingComments.map((el) => (
        <CommentWrapper key={el.createAt} cmntData={[el]} />
      ))}
    </>
  );
}
