import React from 'react';
import styled from 'styled-components';
import CommentItem from '../CommentItem/CommentItem';

export default function CommentWrapperPresenter({
  parentData,
  childrenData,
  uploadingReplies,
  isTargetVisible,
  onTargetShow,
  delComment,
}) {
  return (
    <>
      {delComment ? null : (
        <CommentInner>
          <CommentItem key={parentData._id} cmntData={parentData} groupId={parentData._id} />
          {(childrenData.length !== 0 || (uploadingReplies && uploadingReplies.length !== 0)) && (
            <ReplyContainer>
              {childrenData.length === 0 ? null : (
                <ReplyShowingBtn onClick={onTargetShow}>
                  ----- 답글 {isTargetVisible ? '닫기' : '보기'}
                </ReplyShowingBtn>
              )}

              {isTargetVisible && (
                <ReplyListBox>
                  {childrenData.map((el) => (
                    <CommentItem key={el._id} cmntData={el} groupId={parentData._id} />
                  ))}
                </ReplyListBox>
              )}
              <ReplyUploadListBox>
                {uploadingReplies &&
                  uploadingReplies.length !== 0 &&
                  uploadingReplies.map((el) => (
                    <CommentItem key={el._id} cmntData={el} groupId={parentData._id} />
                  ))}
              </ReplyUploadListBox>
            </ReplyContainer>
          )}
        </CommentInner>
      )}
    </>
  );
}

const CommentInner = styled.div``;

const ReplyContainer = styled.div`
  margin-left: 65px;
  margin-bottom: 20px;
`;

const ReplyListBox = styled.div`
  margin-top: 15px;
`;

const ReplyUploadListBox = styled.div`
  margin-top: 15px;
`;

const ReplyShowingBtn = styled.button`
  margin-left: 10px;
`;
