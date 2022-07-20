import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import useVisible from '../../../../hooks/useVisible';
import CommentItemPresenter from './CommentItem.style';

function CommentItem({ cmntData, groupId, width, childWidth }) {
  const [itemText, setItemText] = useState(cmntData.text);
  const [isTargetVisible, handleClickShow] = useVisible(false); // comment input visible for Edit
  const commentModalVisible = useSelector((state) => state.toggle).commentToggled;
  const [inputVisible, setInputVisible] = useState(false);

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
      width={width}
      childWidth={childWidth}
      inputVisible={inputVisible}
      setInputVisible={setInputVisible}
    />
  );
}

export default CommentItem;
