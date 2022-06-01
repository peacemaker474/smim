import React from 'react';
import styled from 'styled-components';
import CommentItem from './CommentItem';
import useVisible from '../../../hooks/useVisible';
import { useSelector } from 'react-redux';

export default function CommentWrapper({ cmntData }) {
  const [isTargetVisible, handleTargetShow] = useVisible(false);
  const createdComments = useSelector((state) => state.commentReducer);

  const uploadingReplies = createdComments.filter((el) => el.parent_id === cmntData._id);

  if (cmntData.children === undefined) {
    cmntData.children = [];
  }

  return (
    <CommentInner>
      <CommentItem key={cmntData._id} cmntData={cmntData}></CommentItem>
      <ReplyContainer>
        {(cmntData.children.length !== 0 || uploadingReplies.length !== 0) && (
          <>
            <ReplyShowingBtn onClick={handleTargetShow}>
              답글 {isTargetVisible ? '닫기' : '보기'}
            </ReplyShowingBtn>
            {isTargetVisible &&
              cmntData.children.map((el) => <CommentItem key={el._id} cmntData={el} />)}
            {isTargetVisible &&
              uploadingReplies.length !== 0 &&
              uploadingReplies.map((el) => <CommentItem key={el._id} cmntData={el} />)}
          </>
        )}
      </ReplyContainer>
    </CommentInner>
  );
}

const CommentInner = styled.div``;

const ReplyContainer = styled.div`
  margin-left: 50px;
  margin-bottom: 38px;
`;

const ReplyShowingBtn = styled.button`
  margin-left: 49px;
`;
