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
  changedText,
  handleClickShow,
  deleteState,
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
`;
