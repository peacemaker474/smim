import React, { useState, useCallback } from 'react';
import { getSearchPost } from '../../../network/post/http';
import PostListHeadPresenter from './PostListHead.style';

export default function PostListHead({ setPostArray, age }) {
  const [searchList, setSearchList] = useState({
    option: '',
    inputs: '',
  });

  const handleSearchOption = useCallback(
    (evt) => {
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
      }
    },
    [searchList, age, setPostArray]
  );
  return (
    <PostListHeadPresenter
      handleSearchOption={handleSearchOption}
      handleSearchPost={handleSearchPost}
      handleSearchInputs={handleSearchInputs}
    />
  );
}
