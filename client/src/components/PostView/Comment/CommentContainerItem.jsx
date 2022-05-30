import React from 'react';
import styled from 'styled-components';
import CommentItem from './CommentItem';
import useVisible from '../../../hooks/useVisible';
import { useSelector } from 'react-redux';

export default function CommentContainerItem({ data }) {
  const [isTargetVisible, handleClickShow] = useVisible(false);
  const replyContent = useSelector((state) => state.commentCreateReducer);

  const replyData = replyContent.filter((el) => el.parent_id === data._id);

  if (data.children === undefined) {
    data.children = [];
  }

  return (
    <>
      <CommentItem data={data}></CommentItem>
      <ReplyContainer>
        {(data.children.length !== 0 || replyData.length !== 0) && (
          <>
            <ReplyShowBtn onClick={handleClickShow}>
              답글 {isTargetVisible === true ? '닫기' : '보기'}
            </ReplyShowBtn>
            {isTargetVisible && data.children.map((el) => <CommentItem key={el._id} data={el} />)}
            {isTargetVisible &&
              replyData.length !== 0 &&
              replyData.map((el) => <CommentItem key={el._id} data={el} />)}
          </>
        )}
      </ReplyContainer>
    </>
  );
}

const ReplyContainer = styled.div`
  margin-left: 50px;
  margin-bottom: 38px;
`;

const ReplyShowBtn = styled.button`
  margin-left: 49px;
`;
