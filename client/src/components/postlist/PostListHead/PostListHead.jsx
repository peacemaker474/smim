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
          if (postOption === 'newer') {
            const newerArray = res.data.sort((a, b) =>
              a.createAt > b.createAt ? -1 : a.create < b.create ? 1 : 0
            );
            setPostArray([...newerArray]);
          } else if (postOption === 'popular') {
            const popularArray = res.data
              .sort((a, b) => (a.createAt > b.createAt ? -1 : a.create < b.create ? 1 : 0))
              .sort((a, b) =>
                a.meta.likes > b.meta.likes ? -1 : a.meta.likes < b.meta.likes ? 1 : 0
              );
            setPostArray([...popularArray]);
          } else if (postOption === 'older') {
            const olderArray = res.data.sort((a, b) =>
              a.createAt > b.createAt ? 1 : a.create > b.create ? 0 : -1
            );
            setPostArray([...olderArray]);
          }
        });
        setSearchList({ option: '', inputs: '' });
        inputRef.current.value = '';
      }
    },
    [searchList, age, setPostArray, postOption]
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
