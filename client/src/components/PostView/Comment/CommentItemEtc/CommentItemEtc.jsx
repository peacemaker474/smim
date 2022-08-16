import React from 'react';
import { useSelector } from 'react-redux';
import CommentItemEtcPresenter from './CommentItemEtc.style';
import useVisible from '../../../../hooks/useVisible';
import { elapsedText } from '../../../../utils/elapsedText';

export default function CommentItemEtc({ cmntData, groupId, writer }) {
  const { accessToken } = useSelector((state) => state.authToken);
  const [isTargetVisible, handleTargetShow] = useVisible(false);

  const handleFormInputCancel = (e) => {
    e.target.value = '';
    handleTargetShow(false);
  };

  const handleReplyClickShow = () => {
    if (accessToken) {
      handleTargetShow(true);
    }
  };

  const create = new Date(cmntData.createAt);
  const createAt = elapsedText(create);

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
