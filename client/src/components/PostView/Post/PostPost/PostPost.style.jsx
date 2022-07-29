import React from 'react';
import styled from 'styled-components';
import PostLike from '../PostLike/PostLike';
import PostBookmark from '../PostBookmark/PostBookmark';
import PostHead from '../PostHead/PostHead';
import PostTagList from '../PostTagList/PostTagList';

export default function PostPostPresenter({ postDetail, date, user }) {
  return (
    <PostBox>
      <PostViewH2>{postDetail.targetAge}대에게</PostViewH2>
      <PostTitle>{postDetail.title}</PostTitle>
      <PostHead postDetail={postDetail} date={date} />
      <PostBody>
        <PostContent>
          <PostPara dangerouslySetInnerHTML={{ __html: postDetail.content }} />
        </PostContent>
        <PostTagList hashtag={postDetail.hashtag} />
        <PostLikeBox>
          <PostLike quantity={postDetail.meta.likes} like={postDetail.like} />
          {postDetail.owner.userId !== user.id ? (
            <PostBookmark bookmark={postDetail.bookmark} />
          ) : null}
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
  word-break: break-all;
`;

const PostPara = styled.div`
  font-size: 15px;
  font-weight: 500;
  line-height: 23px;
  margin-bottom: 60px;
`;

const PostLikeBox = styled.div`
  display: flex;
  justify-content: center;
  margin: 40px 0;
`;
