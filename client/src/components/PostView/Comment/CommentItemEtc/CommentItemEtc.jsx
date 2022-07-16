import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useVisible from '../../../../hooks/useVisible';
import { isLoginCheckToggle } from '../../../../redux/slice/toggleSlice';
import CommentItemEtcPresenter from './CommentItemEtc.style';

export default function CommentItemEtc({ cmntData, groupId }) {
  const [isTargetVisible, handleClickShow] = useVisible(false);
  const tkn = useSelector((state) => state.authToken).accessToken;
  const dispatch = useDispatch();

  const handleClickCancel = () => {
    handleClickShow(!isTargetVisible);
  };

  return (
    <CommentItemEtcPresenter
      isTargetVisible={isTargetVisible}
      handleClickShow={() => {
        if (tkn) {
          handleClickShow();
        } else {
          dispatch(isLoginCheckToggle());
        }
      }}
      createAt={cmntData.createAt}
      groupId={groupId}
      postId={cmntData.post_id}
      parentId={cmntData._id}
      handleClickCancel={handleClickCancel}
      id={cmntData._id}
      cmntData={cmntData}
    />
  );
}
