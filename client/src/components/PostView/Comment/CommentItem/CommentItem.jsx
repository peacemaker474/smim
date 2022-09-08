import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import useVisible from '../../../../hooks/useVisible';
import CommentItemPresenter from './CommentItem.style';

function CommentItem({ cmntData, groupId }) {
  const [itemText, setItemText] = useState(cmntData.text);
  const [isTargetVisible, handleClickShow] = useVisible(false);
  const delComment = useSelector((state) => state.comment).deletedIdArray.find(
    (el) => el === cmntData._id
  );

  const handleFormInputCancel = useCallback(
    (e) => {
      e.target.value = '';
      handleClickShow(false);
    },
    [handleClickShow]
  );

  const handleTextChange = (text) => {
    setItemText(text);
  };

  let changedText = itemText.replaceAll('<br>', '\n');

  return (
    <CommentItemPresenter
      cmntData={cmntData}
      groupId={groupId}
      isTargetVisible={isTargetVisible}
      onClickShow={handleClickShow}
      onFormInputCancel={handleFormInputCancel}
      onTextChange={handleTextChange}
      changedText={changedText}
      deleteState={Boolean(delComment)}
    />
  );
}

export default CommentItem;
