import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import PostListItem from '../components/postList/PostListItem';
import Search from '../asset/icon/icon-search-line.svg';

const PostListMain = styled.main`
  margin-top: 10vh;
`;

const PostListContainer = styled.div`
  margin: 53px auto 0;
  width: 707px;
`;

const PostListHead = styled.div`
  width: 707px;
  height: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SearchDiv = styled.div`
  width: 245px;
  height: 33px;
  border: 2px solid ${({ theme }) => theme.color.yellow};
  border-radius: 3px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
`;

const SearchInput = styled.input`
  width: 217px;
  height: 28px;
  border: none;
`;

const SearchBtn = styled.button`
  width: 15px;
  height: 15px;
  background: url(${Search});
  background-size: contain;
  background-repeat: no-repeat;
  background-postion: center;
`;

const SortDiv = styled.div`
  height: 35px;
  display: flex;
`;

const SortSelect = styled.select`
  border: 2px solid ${({ theme }) => theme.color.yellow};
  border-radius: 3px;
`;

// const SortBtn = styled.button`
//   width: 46px;
//   height: 35px;
//   background: ${({ theme }) => theme.color.yellow};
//   color: #ffffff;
//   border-radius: 3px;
//   font-size: 9px;
//   font-weight: 700;
//   line-height: 12px;
//   margin-left: 7px;
// `;

const PostListBody = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px 14px;
  width: 707px;
  margin-top: 67px;
`;

export default function PostsPage() {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const age = query.get('age');

  return (
    <PostListMain>
      {age}대 게시판 목록입니다.
      <PostListContainer>
        <PostListHead>
          <SearchDiv>
            <SearchInput />
            <SearchBtn />
          </SearchDiv>
          <SortDiv>
            <SortSelect name='sort'>
              <option value=''>최근 게시물</option>
              <option value=''>인기 게시물</option>
              <option value=''>오래된 게시물</option>
            </SortSelect>
            {/* <SortBtn>정렬</SortBtn> */}
          </SortDiv>
        </PostListHead>
        <PostListBody>
          <PostListItem></PostListItem>
          <PostListItem></PostListItem>
          <PostListItem></PostListItem>
          <PostListItem></PostListItem>
          <PostListItem></PostListItem>
          <PostListItem></PostListItem>
          <PostListItem></PostListItem>
        </PostListBody>
      </PostListContainer>
    </PostListMain>
  );
}
