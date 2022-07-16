import React from 'react';
import styled from 'styled-components';
import CommentInput from '../CommentInput/CommentInput';
import Modal from '../../../common/Modal/Modal';
import CommentCreated from '../CommentCreated/CommentCreated';
import CommentPinned from '../CommentPinned/CommentPinned';
import CommentUploaded from '../CommentUploaded/CommentUploaded';

export default function PostCommentPresenter({
  commentModalVisible,
  actionFunc,
  cancelFunc,
  modalText,
  postId,
}) {
  return (
    <>
      {commentModalVisible && (
        <Modal actionfunc={actionFunc} cancelFunc={cancelFunc}>
          {modalText}
        </Modal>
      )}
      <CommentSection>
        <CommentH2>답변하기</CommentH2>
        <CommentInput postId={postId} parentId={null} />
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
  width: 794px;
  // height: 59px;
  margin: 20px auto;
`;

const CommentH2 = styled.h2`
  font-size: 18px;
  font-weight: 700;
  line-height: 25px;
  margin-bottom: 28px;
  // &::after {
  //   width: 70px;
  //   height: 2px;
  //   background: #000000;
  //   display: block;
  //   content: '';
  //   margin-top: 9px;
  // }
`;

const CommentContainer = styled.div``;
