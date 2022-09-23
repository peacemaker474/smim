import React, { useCallback, useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import PostListHeadPresenter from './PostListHead.style';

export default function PostListHead({ setSearchList, postFilter, setPostFilter, age }) {
  const inputRef = useRef();
  const [searchText, setSearchText] = useState('');
  const [searchOption, setSearchOption] = useState('');

  useEffect(() => {
    setSearchList({ option: '', inputs: '' });
    setPostFilter('newer');
    inputRef.current.value = '';
    return () => {
      setSearchList({ option: '', inputs: '' });
      setPostFilter('newer');
    };
  }, [age, setPostFilter, setSearchList]);

  const handlePostFilter = useCallback(
    (evt) => {
      setPostFilter(evt.target.value);
    },
    [setPostFilter]
  );

  const handleSearchOption = useCallback(
    (evt) => {
      setSearchOption(evt.target.value);
    },
    [setSearchOption]
  );

  const handleSearchText = useCallback(
    (evt) => {
      setSearchText(evt.target.value);
    },
    [setSearchText]
  );

  const handleSearchSubmit = useCallback(
    (evt) => {
      evt.preventDefault();
      setSearchList({ option: searchOption, inputs: searchText });
      setPostFilter('newer');
    },
    [setSearchList, setPostFilter, searchOption, searchText]
  );

  return (
    <PostListHeadPresenter
      onSearchSubmit={handleSearchSubmit}
      onPostFilter={handlePostFilter}
      onSearchOption={handleSearchOption}
      onSearchText={handleSearchText}
      inputRef={inputRef}
      postFilter={postFilter}
      searchText={searchText}
      searchOption={searchOption}
    />
  );
}
