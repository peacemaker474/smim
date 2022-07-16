import React from 'react';
import styled from 'styled-components';
import CommentInput from '../CommentInput/CommentInput';
import CommentLikeBtn from '../CommentLikeBtn/CommentLikeBtn';

export default function CommentItemEtcPresenter({
  createAt,
  handleClickShow,
  groupId,
  postId,
  parentId,
  isTargetVisible,
  handleClickCancel,
  cmntData,
}) {
  return (
    <CommentEtcContainer>
      <CommentEtc>
        <CommentDate>{createAt}</CommentDate>
        <CommentReBtn onClick={handleClickShow}>답글 달기</CommentReBtn>
        <CommentLikeBtn cmntData={cmntData} />
      </CommentEtc>
      {isTargetVisible && (
        <CommentInput
          groupId={groupId}
          postId={postId}
          parentId={parentId}
          isTargetVisible={isTargetVisible}
          handleClickCancel={handleClickCancel}
        />
      )}
    </CommentEtcContainer>
  );
}

const CommentEtcContainer = styled.div``;

const CommentEtc = styled.div`
  display: flex;
  align-items: center;
`;

const CommentDate = styled.span`
  margin-right: 12px;
  font-size: 14px;
`;

const CommentReBtn = styled.button`
  margin-right: 12px;
  font-size: 14px;
  font-weight: 600;
`;
