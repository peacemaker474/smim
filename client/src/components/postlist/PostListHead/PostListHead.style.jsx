import React from 'react';
import styled from 'styled-components';
import Search from '../../../asset/icon/icon-search-line.svg';

export default function PostListHeadPresenter({
  handleSearchOption,
  handleSearchPost,
  handleSearchInputs,
}) {
  return (
    <PostListHeadDiv>
      <SearchDiv>
        <SearchSelect name='sort' onChange={handleSearchOption}>
          <option value=''>선택</option>
          <option value='title'>제목</option>
          <option value='hashtag'>태그</option>
          <option value='content'>내용</option>
        </SearchSelect>
        <SearchBox onSubmit={handleSearchPost}>
          <SearchInput onChange={handleSearchInputs} />
          <SearchBtn />
        </SearchBox>
      </SearchDiv>
      <SortDiv>
        <SortSelect name='sort'>
          <option value=''>최근 게시물</option>
          <option value=''>인기 게시물</option>
          <option value=''>오래된 게시물</option>
        </SortSelect>
        {/* <SortBtn>정렬</SortBtn> */}
      </SortDiv>
    </PostListHeadDiv>
  );
}

const PostListHeadDiv = styled.div`
  width: 707px;
  height: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SortDiv = styled.div`
  height: 35px;
  display: flex;
`;

const SortSelect = styled.select`
  border: 2px solid ${({ theme }) => theme.color.yellow};
  border-radius: 3px;
`;

const SearchDiv = styled.div`
  display: flex;
`;

const SearchBox = styled.form`
  width: 245px;
  height: 33px;
  border: 2px solid ${({ theme }) => theme.color.yellow};
  border-radius: 3px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
`;

const SearchSelect = styled(SortSelect)`
  margin-right: 6px;
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
