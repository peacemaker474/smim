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
  const [postSelected, setPostSelected] = useState('newer');

  useEffect(() => {
    setPostSelected('newer');
  }, [age]);

  const handleSortOption = useCallback(
    (evt) => {
      setPostSelected(evt.target.value);
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
    [postArray, setPostArray, postSelected]
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
          if (postSelected === 'newer') {
            const newerArray = res.data.sort((a, b) =>
              a.createAt > b.createAt ? -1 : a.create < b.create ? 1 : 0
            );
            setPostArray([...newerArray]);
          } else if (postSelected === 'popular') {
            const popularArray = res.data
              .sort((a, b) => (a.createAt > b.createAt ? -1 : a.create < b.create ? 1 : 0))
              .sort((a, b) =>
                a.meta.likes > b.meta.likes ? -1 : a.meta.likes < b.meta.likes ? 1 : 0
              );
            setPostArray([...popularArray]);
          } else if (postSelected === 'older') {
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
    [searchList, age, setPostArray]
  );
  return (
    <PostListHeadPresenter
      handleSearchOption={handleSearchOption}
      handleSortOption={handleSortOption}
      handleSearchPost={handleSearchPost}
      handleSearchInputs={handleSearchInputs}
      inputRef={inputRef}
      searchList={searchList}
      postSelected={postSelected}
    />
  );
}
