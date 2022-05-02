import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Tag } from '../../styles/common/tag';
import { postDetailRead } from '../../network/post/http';
import { getCookie } from '../../utils/cookie';

const PostBox = styled.div`
  width: 794px;
  margin: 0 auto 32px;
`;

const PostViewH2 = styled.h1`
  width: 794px;
  font-size: 14px;
  font-weight: 500;
  line-height: 19px;
  color: ${({ theme }) => theme.color.black};
  margin: 0 auto 12px;
`;

const PostTitle = styled.h3`
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 68px;
  color: ${({ theme }) => theme.color.black};
  margin-bottom: 56px;
`;

const PostHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 17px;
  border-bottom: 1px ${({ theme }) => theme.color.lightGray} solid;
  margin-bottom: 30px;
`;

const PostAuthor = styled.h4`
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.color.black};
  &::before {
    display: block;
    content: '';
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background-color: #25a0fc;
    margin-right: 14px;
  }
`;
const PostDate = styled.span`
  font-size: 11px;
  font-weight: 700;
  color: ${({ theme }) => theme.color.gray};
`;

const PostBody = styled.div``;

const PostContent = styled.div`
  width: 794px;
  padding: 48px 0;
`;

const PostPara = styled.div`
  font-size: 15px;
  font-weight: 500;
  line-height: 23px;
  margin-bottom: 60px;
`;

const PostTagBox = styled.div`
  display: flex;
`;

const TagItem = styled(Tag)`
  background-color: ${({ theme, color }) => theme.tagColor[color]};
  & + span {
    margin-left: 5px;
  }
`;

const PostLikeBox = styled.div`
  display: flex;
  justify-content: center;
  margin: 40px 0;
`;

const PostLikeSpan = styled.span`
  margin-right: 12px;
`;

export default function PostPost() {
  const location = useLocation();
  const tkn = getCookie('users');
  const [postDetail, setPostDetail] = useState({
    targetAge: '',
    content: '',
    title: '',
    owner: { nickname: '', _id: '' },
    createAt: '',
    hashtag: [],
  });
  const id = location.pathname.split('view/')[1];

  useEffect(async () => {
    try {
      const response = await postDetailRead(id, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${tkn}`,
        },
      });
      setPostDetail(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <PostBox>
      <PostViewH2>{postDetail.targetAge}대에게</PostViewH2>
      <PostTitle>{postDetail.title}</PostTitle>
      <PostHead>
        <PostAuthor>{postDetail.owner.nickname}</PostAuthor>
        <PostDate>{postDetail.createAt}</PostDate>
      </PostHead>
      <PostBody>
        <PostContent>
          <PostPara>{postDetail.content}</PostPara>
        </PostContent>
        <PostTagBox>
          {(postDetail.hashtag || []).map((el, idx) => (
            <TagItem color='yellow' key={idx}>
              {el}
            </TagItem>
          ))}
        </PostTagBox>
        <PostLikeBox>
          <PostLikeSpan>좋아요</PostLikeSpan>
          <PostLikeSpan>즐겨찾기</PostLikeSpan>
        </PostLikeBox>
      </PostBody>
    </PostBox>
  );
}
