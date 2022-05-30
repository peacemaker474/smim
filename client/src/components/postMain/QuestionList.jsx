import React from 'react';
import styled from 'styled-components';
import heartFill from '../../asset/icon/icon-heart-fill.svg';

const ListContainer = styled.div`
  border: 2px solid ${({ theme }) => theme.color.lightGray};
  border-radius: 14px;
`;
const ListHead = styled.div`
  display: flex;
  padding: 0 15px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid ${({ theme }) => theme.color.lightGray};
  height: 60px;
`;

const MoreBtn = styled.button`
  width: 67px;
  height: 31px;
  padding: 0;
  background-color: ${({ theme }) => theme.color.yellow};
  border-radius: 4px;
  font-weight: 700;
  color: #ffffff;
`;

const ListBody = styled.div``;

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

export default function QuestionList({ age, post }) {
  console.log(post);
  return (
    <ListContainer>
      <ListHead>
        <h2>{age}대에게 질문하세요</h2>
        <MoreBtn>더보기</MoreBtn>
      </ListHead>
      <ListBody>
        {post && post.map((item, index) => (
          <ListItem key={index}>
            <ItemH3>{item.title}</ItemH3>
            <ItemContent>
              <ItemSpan>{item.owner}</ItemSpan>
              <ItemLike>{item.meta.likes}</ItemLike>
              <ItemSpan>{item.createAt.slice(0, 10).replaceAll('-', '.')}</ItemSpan>
            </ItemContent>
          </ListItem>
        ))}
      </ListBody>
    </ListContainer>
  );
}
