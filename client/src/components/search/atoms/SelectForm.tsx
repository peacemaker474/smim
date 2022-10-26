import React, { memo, useState, useEffect, useRef, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import Search from '../../../asset/icons/icon-search-line.svg';

interface Option {
  value: string;
  text: string;
}

interface PostFilterOption {
  option: string;
  inputs: string;
}

interface SelectFormOption {
  setPostFilter: Dispatch<SetStateAction<string>>;
  setSearchData: Dispatch<SetStateAction<PostFilterOption>>;
  optionArr: Array<Option>;
  name: string;
  age: string;
}

function SelectForm({ setPostFilter, setSearchData, optionArr, name, age }: SelectFormOption) {
  const [searchText, setSearchText] = useState('');
  const [searchOption, setSearchOption] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.value = '';
  }, []);

  const handleSearchOption = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchOption(evt.target.value);
  }; // search option change function

  const handleSearchText = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(evt.target.value);
  }; // search text change function

  const handleSearchSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setSearchData({ option: searchOption, inputs: searchText });
    setPostFilter('newer');
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
          <SearchInput onChange={handleSearchText} ref={inputRef} />
          <SearchBtn />
        </Form>
      </SearchDiv>
    </PostListHeadDiv>
  );
}

export default memo(SelectForm);

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
