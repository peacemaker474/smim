import React from 'react';
import styled from 'styled-components';
import CommentLikeBtn from '../CommentLikeBtn/CommentLikeBtn';
import CommentForm from '../CommentForm/CommentForm';

export default function CommentItemEtcPresenter({
  createAt,
  groupId,
  postId,
  parentId,
  cmntData,
  isTargetVisible,
  onFormInputCancel,
  onReplyClickShow,
  writer,
}) {
  return (
    <CommentEtcContainer>
      <CommentEtc>
        <CommentDate>{createAt}</CommentDate>
        <CommentReBtn onClick={onReplyClickShow}>답글 달기</CommentReBtn>
        <CommentLikeBtn cmntData={cmntData} />
      </CommentEtc>
      {isTargetVisible && (
        <CommentForm
          groupId={groupId}
          postId={postId}
          parentId={parentId}
          writer={writer}
          onFormInputCancel={onFormInputCancel}
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
  margin-right: 5px;
  font-size: 14px;
  @media (max-width: 612px) {
    font-size: 13px;
    margin-right: 0;
  }
`;

const CommentReBtn = styled.button`
  margin-right: 5px;
  font-size: 14px;
  font-weight: 600;
  @media (max-width: 612px) {
    font-size: 13px;
    margin-right: 0;
  }
`;
