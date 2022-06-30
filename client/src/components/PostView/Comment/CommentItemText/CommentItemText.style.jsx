import React from 'react';
import styled from 'styled-components';

export default function CommentItemTextPresenter({ writer, text }) {
  return (
    <CommentText>
      <CommentStrongName>{writer}</CommentStrongName>
      {text}
    </CommentText>
  );
}

const CommentText = styled.span`
  display: block;
  margin: 0;
  margin-bottom: 12px;
  line-height: 23px;
`;

const CommentStrongName = styled.strong`
  font-weight: 600;
`;
