import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isLoginCheckToggle } from '../../../../redux/slice/toggleSlice';
import CommentItemEtcPresenter from './CommentItemEtc.style';
import useVisible from '../../../../hooks/useVisible';
import { elapsedText } from '../../../../utils/elapsedText';

export default function CommentItemEtc({ cmntData, groupId, writer }) {
  const tkn = useSelector((state) => state.authToken).accessToken;
  const [isTargetVisible, handleTargetShow] = useVisible(false);
  const dispatch = useDispatch();

  const handleClickCancel = (e) => {
    e.target.value = '';
    handleTargetShow(false);
  };

  const create = new Date(cmntData.createAt);
  const createAt = elapsedText(create);

  return (
    <CommentItemEtcPresenter
      handleClickShow={() => {
        if (tkn) {
          handleTargetShow(true);
        } else {
          dispatch(isLoginCheckToggle());
        }
      }}
      createAt={createAt}
      groupId={groupId}
      postId={cmntData.post_id}
      parentId={cmntData._id}
      id={cmntData._id}
      cmntData={cmntData}
      isTargetVisible={isTargetVisible}
      handleClickCancel={handleClickCancel}
      writer={writer}
    />
  );
}
