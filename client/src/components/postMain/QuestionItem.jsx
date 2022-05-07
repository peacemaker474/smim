import React from 'react';
import styled from 'styled-components';
import heartFill from '../../asset/icon/icon-heart-fill.svg';

const ListItem = styled.div`
  height: 60px;
  width: 100%;
  padding: 10px;
  & + div {
    border-top: 2px solid ${({ theme }) => theme.color.lightGray};
  }
`;

const ItemH3 = styled.h3`
  margin-bottom: 6px;
`;

const ItemContent = styled.div`
  display: flex;
`;

const ItemSpan = styled.span``;

const ItemLike = styled.span`
  display: flex;
  color: ${({ theme }) => theme.color.red};
  &::before {
    content: '';
    width: 15px;
    height: 15px;
    display: block;
    background: url(${heartFill});
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    padding-right: 5px;
  }
  margin-left: 10px;
  margin-right: 10px;
`;

export default function QuestionItem() {
  return (
    <ListItem>
      <ItemH3>질문합니다.</ItemH3>
      <ItemContent>
        <ItemSpan>User123</ItemSpan>
        <ItemLike>10</ItemLike>
        <ItemSpan>22.05.04</ItemSpan>
      </ItemContent>
    </ListItem>
  );
}
