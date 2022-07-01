import React from 'react';
import styled from 'styled-components';
import CommentInput from '../CommentInput/CommentInput';
import heartFill from '../../../../asset/icon/icon-heart-fill.svg';
import heartLine from '../../../../asset/icon/icon-heart-line.svg';

export default function CommentItemEtcPresenter({
  createAt,
  handleClickShow,
  likeCount,
  groupId,
  postId,
  parentId,
  isTargetVisible,
  handleClickCancel,
}) {
  return (
    <CommentEtcContainer>
      <CommentEtc>
        <CommentDate>{createAt}</CommentDate>
        <CommentReBtn onClick={handleClickShow}>답글 달기</CommentReBtn>
        <CommentLike>{likeCount}</CommentLike>
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

const CommentLike = styled.button`
  display: flex;
  align-items: center;
  &::before {
    content: '';
    width: 20px;
    height: 20px;
    display: block;
    background: url(${(props) => (props.like ? `${heartFill}` : `${heartLine}`)});
    background-position: center;
    background-size: contain;
    margin-right: 4px;
  }
`;
