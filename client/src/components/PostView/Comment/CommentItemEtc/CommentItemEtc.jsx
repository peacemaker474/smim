import React from 'react';
import { useSelector } from 'react-redux';
import CommentItemEtcPresenter from './CommentItemEtc.style';
import useVisible from '../../../../hooks/useVisible';
import { elapsedText } from '../../../../utils/elapsedText';

export default function CommentItemEtc({ cmntData, groupId, writer }) {
  const { accessToken } = useSelector((state) => state.authToken);
  const [isTargetVisible, handleTargetShow] = useVisible(false);

  const handleClickCancel = (e) => {
    e.target.value = '';
    handleTargetShow(false);
  };

  const create = new Date(cmntData.createAt);
  const createAt = elapsedText(create);

  return (
    <CommentItemEtcPresenter
      handleClickShow={() => {
        if (accessToken) {
          handleTargetShow(true);
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
