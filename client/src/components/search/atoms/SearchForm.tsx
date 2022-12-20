import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '../../../redux/hooks';
import { getSearchContent } from '../../../redux/slice/searchKeywordSlice';
import { SearchFormOption } from '../../../type/postTypes';
import Search from '../../../asset/icons/icon-search-line.svg';

function SearchForm({ optionArr, name, age }: SearchFormOption) {
  const [searchOption, setSearchOption] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (inputRef.current) inputRef.current.value = '';
    setSearchOption('');
  }, [age]);

  const handleSearchOption = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchOption(evt.target.value);
  }; // search option change function

  const handleSearchSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(getSearchContent({ option: searchOption, keyword: inputRef.current?.value }));
  }; // search data submit function

  return (
    <PostListHeadDiv>
      <SearchDiv>
        <Select name={name} onChange={handleSearchOption} value={searchOption}>
          {optionArr.map((el) => (
            <option key={el.value} value={el.value}>
              {el.text}
            </option>
          ))}
        </Select>
        <Form onSubmit={handleSearchSubmit}>
          <SearchInput ref={inputRef} />
          <SearchBtn />
        </Form>
      </SearchDiv>
    </PostListHeadDiv>
  );
}

export default SearchForm;

const PostListHeadDiv = styled.div`
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

const Form = styled.form`
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

const Select = styled.select`
  border: 2px solid ${({ theme }) => theme.color.yellow};
  border-radius: 3px;
  margin-right: 6px;
  line-height: 33px;
`;
