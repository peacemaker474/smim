import React, { useState, useCallback, useEffect } from 'react';
import { useRef } from 'react';
import { getSearchPost } from '../../../network/post/http';
import PostListHeadPresenter from './PostListHead.style';

export default function PostListHead({ postArray, setPostArray, age }) {
  const [searchList, setSearchList] = useState({
    option: '',
    inputs: '',
  });
  const inputRef = useRef();
  const [postOption, setPostOption] = useState('newer');

  useEffect(() => {
    setPostOption('newer');
    return () => setPostOption('newer');
  }, [age]);

  const handlePostOption = useCallback(
    (evt) => {
      setPostOption(evt.target.value);
      const option = evt.target.value;
      if (option === 'newer') {
        const newerArray = postArray.sort((a, b) => new Date(b.createAt) - new Date(a.createAt));
        setPostArray([...newerArray]);
      } else if (option === 'popular') {
        const popularArray = postArray
          .sort((a, b) => new Date(b.createAt) - new Date(a.createAt))
          .sort((a, b) => (a.meta.likes = b.meta.likes));
        setPostArray([...popularArray]);
      } else if (option === 'older') {
        const olderArray = postArray.sort((a, b) => new Date(a.createAt) - new Date(b.createAt));
        setPostArray([...olderArray]);
      }
    },
    [postArray, setPostArray]
  );

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
        getSearchPost(body).then((res) => {
          setPostArray(res.data);
        });
        setSearchList({ option: '', inputs: '' });
        inputRef.current.value = '';
      }
    },
    [searchList, age, setPostArray]
  );
  return (
    <PostListHeadPresenter
      onSearchOption={handleSearchOption}
      onPostOption={handlePostOption}
      onSearchPost={handleSearchPost}
      onSearchInputs={handleSearchInputs}
      inputRef={inputRef}
      searchList={searchList}
      postOption={postOption}
    />
  );
}
