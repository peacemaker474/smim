import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isLoginCheckToggle } from '../../../../redux/slice/toggleSlice';
import CommentItemEtcPresenter from './CommentItemEtc.style';
import useVisible from '../../../../hooks/useVisible';
import { elapsedText } from '../../../../utils/elapsedText';

export default function CommentItemEtc({ cmntData, groupId, writer }) {
  const { accessToken } = useSelector((state) => state.authToken);
  const [isTargetVisible, handleTargetShow] = useVisible(false);
  const dispatch = useDispatch();

  const handleFormInputCancel = (e) => {
    e.target.value = '';
    handleTargetShow(false);
  };

  const handleReplyClickShow = () => {
    if (accessToken) {
      handleTargetShow(true);
    } else {
      dispatch(isLoginCheckToggle());
    }
  };
  
  const createAt = elapsedText(cmntData.createAt);

  return (
    <CommentItemEtcPresenter
      createAt={createAt}
      groupId={groupId}
      postId={cmntData.post_id}
      parentId={cmntData._id}
      id={cmntData._id}
      cmntData={cmntData}
      isTargetVisible={isTargetVisible}
      onReplyClickShow={handleReplyClickShow}
      onFormInputCancel={handleFormInputCancel}
      writer={writer}
    />
  );
}
