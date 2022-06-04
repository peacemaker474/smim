import React, { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import PostListItem from '../components/postlist/PostListItem';
import Search from '../asset/icon/icon-search-line.svg';
import { getSearchPost, getPostListRead } from '../network/post/http';
import { getCookie } from '../utils/cookie';

const PostListMain = styled.main`
  margin-top: 10vh;
`;

const PostListContainer = styled.div`
  margin: 53px auto 0;
  padding: 70px 0;
  width: 707px;
`;

const PostListHeading = styled.h2`
  font-size: 32px;
  margin-bottom: 90px;
  text-align: center;
`;

const PostListHead = styled.div`
  width: 707px;
  height: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SortDiv = styled.div`
  height: 35px;
  display: flex;
`;

const SortSelect = styled.select`
  border: 2px solid ${({ theme }) => theme.color.yellow};
  border-radius: 3px;
`;

const SearchDiv = styled.div`
  display: flex;
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
`;

const SearchBtn = styled.button`
  width: 15px;
  height: 15px;
  background: url(${Search});
  background-size: contain;
  background-repeat: no-repeat;
  background-postion: center;
`;

const PostListBody = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px 14px;
  width: 707px;
  margin-top: 67px;
`;

export default function PostsPage() {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const age = query.get('age');
  const tkn = getCookie('users');
  const [postArray, setPostArray] = useState();
  const [searchList, setSearchList] = useState({
    option: '',
    inputs: '',
  });

  const settingData = useCallback(async () => {
    try {
      const response = await getPostListRead(age, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tkn}`,
        },
      });
      setPostArray(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [age, tkn]);

  useEffect(() => {
    settingData();
  }, [settingData]);

  console.log(postArray);

  const handleSearchOption = (evt) => {
    setSearchList({ ...searchList, option: evt.target.value });
  };

  const handleSearchInputs = (evt) => {
    setSearchList({ ...searchList, inputs: evt.target.value });
  };

  const handleSearchPost = (evt) => {
    evt.preventDefault();
    if (!searchList.option !== '' && !searchList.inputs !== '') {
      let body = {
        option: searchList.option,
        search: searchList.inputs,
        target: age,
      };
      getSearchPost(body).then((res) => setPostArray(res.data));
    }
  };

  return (
    <PostListMain>
      <PostListContainer>
        <PostListHeading>{age}대 질문리스트</PostListHeading>
        <PostListHead>
          <SearchDiv>
            <SearchSelect name='sort' onChange={handleSearchOption}>
              <option value=''>선택</option>
              <option value='title'>제목</option>
              <option value='hashtag'>태그</option>
              <option value='content'>내용</option>
            </SearchSelect>
            <SearchBox onSubmit={handleSearchPost}>
              <SearchInput onChange={handleSearchInputs} />
              <SearchBtn />
            </SearchBox>
          </SearchDiv>
          <SortDiv>
            <SortSelect name='sort'>
              <option value=''>최근 게시물</option>
              <option value=''>인기 게시물</option>
              <option value=''>오래된 게시물</option>
            </SortSelect>
            {/* <SortBtn>정렬</SortBtn> */}
          </SortDiv>
        </PostListHead>
        <PostListBody>
          {(postArray || []).map((el) => (
            <PostListItem postData={el} key={el._id}></PostListItem>
          ))}
        </PostListBody>
      </PostListContainer>
    </PostListMain>
  );
}
