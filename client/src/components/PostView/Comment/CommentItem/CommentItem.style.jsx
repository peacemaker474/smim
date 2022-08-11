import React from 'react';
import styled from 'styled-components';
import CommentForm from '../CommentForm/CommentForm';
import CommentItemInner from '../CommentItemInner/CommentItemInner';

export default function CommentItemPresenter({
  cmntData,
  groupId,
  isTargetVisible,
  handleClickCancel,
  handleTextChange,
  changedText,
  handleClickShow,
  deleteState,
}) {
  return (
    <>
      {isTargetVisible ? (
        <CommentForm
          postId={cmntData.post_id}
          parentId={cmntData.parent_id}
          groupId={groupId}
          isTargetVisible={isTargetVisible}
          handleClickCancel={handleClickCancel}
          id={cmntData._id}
          handleTextChange={handleTextChange}
          changedText={changedText}
        />
      ) : deleteState ? null : (
        <CommentItemContainer>
          <CommentItemInner
            changedText={changedText}
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
  @media (max-width: 612px) {
    font-size: 15px;
  }
`;
