import React from 'react';
import styled from 'styled-components';
import SelectBox from '../atoms/SelectBox';
import Search from '../../../asset/icons/icon-search-line.svg';

interface SearchFormOption {
  onSelectOption: (e: React.ChangeEvent) => {};
  onSearchSubmit: (e: React.FormEvent) => {};
  onSearchText: (e: React.ChangeEvent) => {};
}

function SearchForm({ onSelectOption, onSearchSubmit, onSearchText }: SearchFormOption) {
  return (
    <PostListHeadDiv>
      <SearchDiv>
        <SelectBox
          selectedValue=""
          name="sort"
          onChange={onSelectOption}
          optionArr={[
            { value: '', text: '선택' },
            { value: 'title', text: '제목' },
            { value: 'hashtag', text: '태그' },
            { value: 'content', text: '내용' },
          ]}
        />
        <SearchBox onSubmit={onSearchSubmit}>
          <SearchInput onChange={onSearchText} />
          <SearchBtn />
        </SearchBox>
      </SearchDiv>
    </PostListHeadDiv>
  );
}

export default SearchForm;

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
