import React from 'react';
import styled from 'styled-components';
import CommentItemPresenter from '../CommentItem/CommentItem.style';

export default function CommentWrapperPresenter({
  cmntData,
  uploadingReplies,
  isTargetVisible,
  handleTargetShow,
}) {
  return (
    <CommentInner>
      <CommentItemPresenter key={cmntData._id} cmntData={cmntData}></CommentItemPresenter>
      <ReplyContainer>
        {(cmntData.children.length !== 0 || uploadingReplies.length !== 0) && (
          <>
            <ReplyShowingBtn onClick={handleTargetShow}>
              답글 {isTargetVisible ? '닫기' : '보기'}
            </ReplyShowingBtn>
            {isTargetVisible &&
              cmntData.children.map((el) => <CommentItemPresenter key={el._id} cmntData={el} />)}
            {isTargetVisible &&
              uploadingReplies.length !== 0 &&
              uploadingReplies.map((el) => <CommentItemPresenter key={el._id} cmntData={el} />)}
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
