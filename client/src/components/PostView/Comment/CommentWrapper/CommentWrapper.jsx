import React, { useEffect } from 'react';
import useVisible from '../../../../hooks/useVisible';
import { useDispatch, useSelector } from 'react-redux';
import CommentWrapperPresenter from './CommentWrapper.style';
import { getPinnedCommentData } from '../../../../redux/slice/commentSlice';

export default function CommentWrapper({ cmntData }) {
  const [isTargetVisible, handleTargetShow] = useVisible(false);
  const createdComments = useSelector((state) => state.commentCreate);
  const pinnedComment = useSelector((state) => state.comment).pinnedId;
  const dispatch = useDispatch();

  const parentData = Array.isArray(cmntData)
    ? cmntData && cmntData.find((el) => el.parent_id == null)
    : cmntData;

  useEffect(() => {
    if (parentData._id === pinnedComment) {
      dispatch(getPinnedCommentData(cmntData));
    }
    console.log(parentData._id);
  }, [dispatch, cmntData, parentData._id, pinnedComment]);

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
