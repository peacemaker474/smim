import React from 'react';
import styled from 'styled-components';
import CommentInput from '../CommentInput/CommentInput';
import CommentItemInner from '../CommentItemInner/CommentItemInner';

export default function CommentItemPresenter({
  cmntData,
  groupId,
  isTargetVisible,
  handleClickCancel,
  handleTextChange,
  itemText,
  handleClickShow,
}) {
  return (
    <>
      {isTargetVisible ? (
        <CommentInput
          postId={cmntData.post_id}
          parentId={cmntData.parent_id}
          groupId={groupId}
          isTargetVisible={isTargetVisible}
          handleClickCancel={handleClickCancel}
          id={cmntData._id}
          handleTextChange={handleTextChange}
          main={true}
        />
      ) : (
        <CommentItemContainer>
          <CommentItemInner
            itemText={itemText}
            handleClickShow={handleClickShow}
            groupId={groupId}
            cmntData={cmntData}
          />
        </CommentItemContainer>
      )}
    </>
  );
}

export const CommentItemContainer = styled.div`
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
`;
