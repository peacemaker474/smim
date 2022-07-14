import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import useVisible from '../../../../hooks/useVisible';
import CommentItemPresenter from './CommentItem.style';

function CommentItem({ cmntData, groupId }) {
  const [itemText, setItemText] = useState(cmntData.text);
  const [isTargetVisible, handleClickShow] = useVisible(false); // comment input visible for Edit
  const commentModalVisible = useSelector((state) => state.toggle).commentToggled;
  const delComment = useSelector((state) => state.comment).deletedIdArray.find(
    (el) => el === cmntData._id
  );

  const handleClickCancel = (e) => {
    e.target.value = '';
    handleClickShow(false);
  };

  const handleTextChange = (text) => {
    setItemText(text);
  };

  return (
    <CommentItemPresenter
      cmntData={cmntData}
      groupId={groupId}
      isTargetVisible={isTargetVisible}
      handleClickShow={handleClickShow}
      handleClickCancel={handleClickCancel}
      handleTextChange={handleTextChange}
      itemText={itemText}
      commentModalVisible={commentModalVisible}
      deleteState={Boolean(delComment)}
    />
  );
}

export default React.memo(CommentItem);
