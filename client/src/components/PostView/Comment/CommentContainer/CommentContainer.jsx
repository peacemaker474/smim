import React from 'react';
// import { useSelector } from 'react-redux';
import CommentContainerPresenter from './CommentContainer.style';

export default function CommentContainer() {
  // const pinnedId = useSelector((state) => state.comment).pinnedId;

  // const pinnedLoadedComment =
  //   loadedComments && loadedComments.filter((el) => String(el[0]._id) === pinnedId);
  // const pinnedUploadingComment = createdComments.filter((el) => String(el._id) === pinnedId);

  return (
    <CommentContainerPresenter
    // pinnedLoadedComment={pinnedLoadedComment}
    // pinnedUploadingComment={pinnedUploadingComment}
    // pinnedId={pinnedId}
    />
  );
}
