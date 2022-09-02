import React from 'react';
import styled from 'styled-components';
import Search from '../../../asset/icon/icon-search-line.svg';

export default function PostListHeadPresenter({
  onSearchSubmit,
  onPostFilter,
  onSearchOption,
  onSearchText,
  inputRef,
  postFilter,
  searchOption,
}) {
  return (
    <PostListHeadDiv>
      <SearchDiv>
        <SearchSelect value={searchOption} name='sort' onChange={onSearchOption}>
          <option value=''>선택</option>
          <option value='title'>제목</option>
          <option value='hashtag'>태그</option>
          <option value='content'>내용</option>
        </SearchSelect>
        <SearchBox onSubmit={onSearchSubmit}>
          <SearchInput onChange={onSearchText} ref={inputRef} />
          <SearchBtn />
        </SearchBox>
      </SearchDiv>
      <SortDiv>
        <SortSelect name='postSort' onChange={onPostFilter} value={postFilter}>
          <option value='newer'>최근 게시물</option>
          <option value='popular'>인기 게시물</option>
          <option value='older'>오래된 게시물</option>
        </SortSelect>
      </SortDiv>
    </PostListHeadDiv>
  );
}

const PostListHeadDiv = styled.div`
  height: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 588px) {
    display: block;
    height: auto;
  }
`;

const SortDiv = styled.div`
  height: 35px;
  display: flex;
  @media screen and (max-width: 588px) {
    justify-content: end;
  }
`;

const SortSelect = styled.select`
  border: 2px solid ${({ theme }) => theme.color.yellow};
  border-radius: 3px;
`;

const SearchDiv = styled.div`
  display: flex;
  @media screen and (max-width: 588px) {
    margin-bottom: 8px;
  }
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
  @media screen and (max-width: 588px) {
    width: 162px;
  }
`;

const SearchBtn = styled.button`
  width: 15px;
  height: 15px;
  background: url(${Search});
  background-size: contain;
  background-repeat: no-repeat;
  background-postion: center;
`;
