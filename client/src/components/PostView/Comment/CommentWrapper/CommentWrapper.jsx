import React from 'react';
import useVisible from '../../../../hooks/useVisible';
import { useSelector } from 'react-redux';
import CommentWrapperPresenter from './CommentWrapper.style';

export default function CommentWrapper({ cmntData }) {
  const [isTargetVisible, handleTargetShow] = useVisible(false);
  const createdComments = useSelector((state) => state.commentReducer);

  const uploadingReplies = createdComments.filter((el) => el.parent_id === cmntData._id);

  if (cmntData.children === undefined) {
    cmntData.children = [];
  }

  return (
    <CommentWrapperPresenter
      cmntData={cmntData}
      uploadingReplies={uploadingReplies}
      isTargetVisible={isTargetVisible}
      handleTargetShow={handleTargetShow}
    />
  );
}
