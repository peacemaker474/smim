import React, { useState, useCallback } from 'react';
import { useRef } from 'react';
import { getSearchPost } from '../../../network/post/http';
import PostListHeadPresenter from './PostListHead.style';

export default function PostListHead({ postArray, setPostArray, age }) {
  const [searchList, setSearchList] = useState({
    option: '',
    inputs: '',
  });
  const inputRef = useRef();
  const [selected, setSelected] = useState('');

  const handleSortOption = useCallback(
    (evt) => {
      const option = evt.target.value;
      if (option === 'newer') {
        const newerArray = postArray.sort((a, b) =>
          a.createAt > b.createAt ? -1 : a.create < b.create ? 1 : 0
        );
        setPostArray([...newerArray]);
      } else if (option === 'popular') {
        const popularArray = postArray
          .sort((a, b) => (a.createAt > b.createAt ? -1 : a.create < b.create ? 1 : 0))
          .sort((a, b) => (a.meta.likes > b.meta.likes ? -1 : a.meta.likes < b.meta.likes ? 1 : 0));

        setPostArray([...popularArray]);
      } else if (option === 'older') {
        const olderArray = postArray.sort((a, b) =>
          a.createAt > b.createAt ? 1 : a.create > b.create ? 0 : -1
        );

        setPostArray([...olderArray]);
      }
    },
    [postArray, setPostArray]
  );

  const handleSearchOption = useCallback(
    (evt) => {
      setSelected(evt.target.value);
      setSearchList({ ...searchList, option: evt.target.value });
    },
    [searchList]
  );

  const handleSearchInputs = useCallback(
    (evt) => {
      setSearchList({ ...searchList, inputs: evt.target.value });
    },
    [searchList]
  );

  const handleSearchPost = useCallback(
    (evt) => {
      evt.preventDefault();
      if (searchList.option !== '' && searchList.inputs !== '') {
        let body = {
          option: searchList.option,
          search: searchList.inputs,
          target: age,
        };
        getSearchPost(body).then((res) => setPostArray(res.data));
        inputRef.current.value = '';
        setSelected('');
      }
    },
    [searchList, age, setPostArray]
  );
  return (
    <PostListHeadPresenter
      handleSearchOption={handleSearchOption}
      handleSortOption={handleSortOption}
      handleSearchPost={handleSearchPost}
      handleSearchInputs={handleSearchInputs}
      inputRef={inputRef}
      selected={selected}
    />
  );
}
