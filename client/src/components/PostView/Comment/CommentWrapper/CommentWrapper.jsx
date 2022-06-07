import React from 'react';
import useVisible from '../../../../hooks/useVisible';
import { useSelector } from 'react-redux';
import CommentWrapperPresenter from './CommentWrapper.style';

export default function CommentWrapper({ cmntData }) {
  const [isTargetVisible, handleTargetShow] = useVisible(false);
  const createdComments = useSelector((state) => state.commentReducer);

  const parentData = cmntData.find((el) => el.parent_id == null);
  const childrenData = cmntData.slice(1);

  const uploadingReplies = createdComments.filter((el) => el.parent_id === parentData._id);

  return (
    <CommentWrapperPresenter
      childrenData={childrenData}
      uploadingReplies={uploadingReplies}
      isTargetVisible={isTargetVisible}
      handleTargetShow={handleTargetShow}
    />
  );
}
