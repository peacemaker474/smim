import React from 'react';
import { useSelector } from 'react-redux';
import CommentCreatedPresenter from './CommentCreated.style';

export default function CommentCreated() {
  const { pinnedId } = useSelector((state) => state.comment);
  const { commentArray: createdComments } = useSelector((state) => state.commentCreate);

  const uploadingComments = createdComments
    .filter((el) => el.parent_id === null)
    .filter((el) => String(el._id) !== pinnedId)
    .sort((a, b) => {
      return a.createAt > b.createAt ? -1 : a.create < b.create ? 1 : 0;
    });

  return <CommentCreatedPresenter uploadingComments={uploadingComments} />;
}
