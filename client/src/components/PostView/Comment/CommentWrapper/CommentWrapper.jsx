import React from 'react';
import useVisible from '../../../../hooks/useVisible';
import { useSelector } from 'react-redux';
import CommentWrapperPresenter from './CommentWrapper.style';

export default function CommentWrapper({ cmntData }) {
  const [isTargetVisible, handleTargetShow] = useVisible(false);
  const createdComments = useSelector((state) => state.commentCreate);

  const parentData = Array.isArray(cmntData)
    ? cmntData && cmntData.find((el) => el.parent_id == null)
    : cmntData;

  const childrenData = Array.isArray(cmntData) ? cmntData && cmntData.slice(1) : [];

  const uploadingReplies = createdComments.filter((el) => el.group_id === parentData._id);

  return (
    <CommentWrapperPresenter
      parentData={parentData}
      childrenData={childrenData}
      uploadingReplies={uploadingReplies}
      isTargetVisible={isTargetVisible}
      handleTargetShow={handleTargetShow}
    />
  );
}
