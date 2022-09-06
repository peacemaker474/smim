import React from 'react';
import CommentWrapper from '../CommentWrapper/CommentWrapper';

export default function CommentUploadedPresenter({ sortedLoadedComments }) {
  return (
    <>
      {sortedLoadedComments &&
        sortedLoadedComments.map((el, idx) => <CommentWrapper key={idx} cmntData={el} />)}
    </>
  );
}
