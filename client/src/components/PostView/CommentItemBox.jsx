import React, { useState } from 'react';
import CommentItem from './CommentItem';
import styled from 'styled-components';

const ReplyShowBtn = styled.button`
  margin-bottom: 20px;
  margin-left: 49px;
`;

const ReplyItemBox = styled.div``;

export default function CommentItemBox({ setCmnt }) {
  const [isVisible, setIsVisible] = useState(false);
  const handleReplyClick = (e) => {
    setCmnt('@도기석');
  };

  const handleReplyShow = () => {
    setIsVisible(!isVisible);
  };
  return (
    <>
      <CommentItem handleReplyClick={handleReplyClick} />
      <ReplyShowBtn onClick={handleReplyShow}>
        답글 {isVisible === true ? '닫기' : '보기'}
      </ReplyShowBtn>
      {isVisible && (
        <ReplyItemBox>
          <CommentItem handleReplyClick={handleReplyClick} extend='reply' />
          <CommentItem handleReplyClick={handleReplyClick} extend='reply' />
          <CommentItem handleReplyClick={handleReplyClick} extend='reply' />
        </ReplyItemBox>
      )}
    </>
  );
}
