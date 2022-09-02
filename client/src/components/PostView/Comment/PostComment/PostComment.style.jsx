import React from 'react';
import styled from 'styled-components';
import CommentForm from '../CommentForm/CommentForm';
import Modal from '../../../common/Modal/Modal';
import CommentCreated from '../CommentCreated/CommentCreated';
import CommentPinned from '../CommentPinned/CommentPinned';
import CommentUploaded from '../CommentUploaded/CommentUploaded';

export default function PostCommentPresenter({
  commentToggled,
  actionFunc,
  cancelFunc,
  modalText,
  postId,
  accessToken,
}) {
  return (
    <>
      {commentToggled && (
        <Modal actionFunc={actionFunc} cancelFunc={cancelFunc}>
          {modalText}
        </Modal>
      )}
      <CommentSection>
        <CommentH2>답변하기</CommentH2>
        {accessToken && <CommentForm postId={postId} parentId={null} />}
        <CommentContainer>
          <CommentPinned />
          <CommentCreated />
          <CommentUploaded />
        </CommentContainer>
      </CommentSection>
    </>
  );
}

const CommentSection = styled.div`
  width: 100%;
  margin: 20px auto;
`;

const CommentH2 = styled.h2`
  font-size: 18px;
  font-weight: 700;
  line-height: 25px;
  margin-bottom: 28px;
`;

const CommentContainer = styled.div``;
