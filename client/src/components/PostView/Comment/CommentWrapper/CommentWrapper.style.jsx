import React from 'react';
import styled from 'styled-components';
import CommentItem from '../CommentItem/CommentItem';

export default function CommentWrapperPresenter({
  parentData,
  childrenData,
  uploadingReplies,
  isTargetVisible,
  handleTargetShow,
}) {
  return (
    <CommentInner>
      <CommentItem key={parentData._id} cmntData={parentData} groupId={parentData._id} />
      {(childrenData.length !== 0 || (uploadingReplies && uploadingReplies.length !== 0)) && (
        <ReplyContainer>
          <ReplyShowingBtn onClick={handleTargetShow}>
            답글 {isTargetVisible ? '닫기' : '보기'}
          </ReplyShowingBtn>
          {isTargetVisible &&
            childrenData.map((el) => (
              <CommentItem key={el._id} cmntData={el} groupId={parentData._id} />
            ))}
          {uploadingReplies &&
            uploadingReplies.length !== 0 &&
            uploadingReplies.map((el) => (
              <CommentItem key={el._id} cmntData={el} groupId={parentData._id} />
            ))}
        </ReplyContainer>
      )}
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
