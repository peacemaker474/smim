import React from 'react';
import styled from 'styled-components';
import CommentLikeBtn from '../CommentLikeBtn/CommentLikeBtn';
import CommentInput from '../CommentInput/CommentInput';

export default function CommentItemEtcPresenter({
  createAt,
  handleClickShow,
  groupId,
  postId,
  parentId,
  handleClickCancel,
  cmntData,
  isTargetVisible,
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
          handleClickCancel={handleClickCancel}
          isTargetVisible={isTargetVisible}
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
