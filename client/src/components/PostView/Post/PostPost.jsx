import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import PostLike from './PostLike';
import PostBookmark from './PostBookmark';
import { Tag } from '../../../styles/common/tag';
import { postDetailRead } from '../../../network/post/http';
import { getCookie } from '../../../utils/cookie';
import PostHead from './PostHead';

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
    like: false,
    bookmark: false,
    meta: { likes: 0, views: 0 },
  });
  const id = location.pathname.split('view/')[1];

  const fetchAPI = useCallback(async () => {
    try {
      if (tkn) {
        const response = await postDetailRead(id, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tkn}`,
          },
        });
        setPostDetail(response.data);
      } else {
        const response = await postDetailRead(id);
        setPostDetail(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }, [id, tkn]);

  useEffect(() => {
    fetchAPI();
  }, [fetchAPI]);

  const date = new Date(postDetail.createAt);

  return (
    <PostBox>
      <PostViewH2>{postDetail.targetAge}대에게</PostViewH2>
      <PostTitle>{postDetail.title}</PostTitle>
      <PostHead author={postDetail.owner.nickname} date={date} postId={id} />
      <PostBody>
        <PostContent>
          <PostPara dangerouslySetInnerHTML={{ __html: postDetail.content }} />
        </PostContent>
        <PostTagBox>
          {(postDetail.hashtag || []).map((el, idx) => (
            <TagItem color='yellow' key={idx}>
              {el}
            </TagItem>
          ))}
        </PostTagBox>
        <PostLikeBox>
          <PostLike quantity={postDetail.meta.likes} like={postDetail.like} />
          <PostBookmark bookmark={postDetail.bookmark} />
        </PostLikeBox>
      </PostBody>
    </PostBox>
  );
}
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

// const PostLikeSpan = styled.span`
//   display: flex;
//   margin-right: 12px;
//   cursor: pointer;
//   &::before {
//     content: '';
//     width: 20px;
//     height: 20px;
//     display: block;
//     background: url(${heartFill});
//     background-repeat: no-repeat;
//     background-position: center;
//     background-size: contain;
//   }
// `;

// const PostBookmarkSpan = styled.span`
//   margin-right: 12px;
//   &::before {
//     content: '';
//     width: 20px;
//     height: 20px;
//     display: block;
//     background-repeat: no-repeat;
//     background-position: center;
//     background-size: contain;
//   }
// `;
