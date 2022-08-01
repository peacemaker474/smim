import React from 'react';
import styled from 'styled-components';
import { Tag } from '../../../styles/common/tag';
import UserImage from '../../common/UserImage/UserImage';
import Heart from '../../../asset/icon/icon-heart-fill.svg';
import Eye from '../../../asset/icon/icon-eye.svg';
import { Link } from 'react-router-dom';

export default function PostListItemPresenter({
  handleDetailPageMove,
  hashtag,
  content,
  meta,
  title,
  writer,
  imgUrl,
  postDate,
  id,
}) {
  return (
    <PostItem to={`/post/view/${id}`}>
      <PostAnchor onClick={handleDetailPageMove}>
        <PostTitle>{title}</PostTitle>
        <PostWriterDiv>
          <UserImage width='23px' height='23px' imgUrl={imgUrl} />
          <PostWriter>{writer}</PostWriter>
        </PostWriterDiv>
        <PostText dangerouslySetInnerHTML={{ __html: content }} />
        <PostTagListDiv>
          <PostTagDiv>
            {(hashtag || []).map((el, idx) => (
              <TagItem color='yellow' key={idx}>
                {el}
              </TagItem>
            ))}
          </PostTagDiv>
        </PostTagListDiv>
        <EtcDiv>
          <EtcSpan icon={Heart}>{meta.likes}</EtcSpan>
          <EtcSpan icon={Eye}>{meta.views}</EtcSpan>
        </EtcDiv>
        <PostDate>{postDate}</PostDate>
      </PostAnchor>
    </PostItem>
  );
}

const PostItem = styled(Link)`
  border: 2px solid ${({ theme }) => theme.color.lightGray};
  border-radius: 20px;
  padding: 31px 21px;
  position: relative;
  cursor: pointer;
  height: 250px;
`;

const PostAnchor = styled.div``;

const PostTitle = styled.h2`
  color: ${({ theme }) => theme.color.black};
  font-size: 15px;
  font-weight: 700;
  line-height: 20px;
  margin-bottom: 10px;
`;

const PostWriterDiv = styled.div`
  display: flex;
  color: ${({ theme }) => theme.color.black};
  font-size: 12px;
  line-height: 20px;
  margin-bottom: 12px;
`;

const PostWriter = styled.span`
  margin-left: 6px;
`;

const PostText = styled.p`
  height: 28px;
  width: 148px;
  font-size: 11px;
  font-weight: 700;
  line-height: 14px;
  margin-bottom: 14px;
  color: ${({ theme }) => theme.color.black};
  overflow: hidden;
  & > p {
    word-break: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 2; // 원하는 라인수
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const PostTagListDiv = styled.div`
  margin-bottom: 20px;
`;
const PostTagDiv = styled.div`
  display: flex;
  height: 24px;
`;
const TagItem = styled(Tag)`
  background-color: ${({ theme, color }) => theme.tagColor[color]};
  & + span {
    margin-left: 5px;
  }
`;

const EtcDiv = styled.div`
  display: flex;
  margin-left: 4px;
  margin-bottom: 10px;
`;

const EtcSpan = styled.span`
  display: flex;
  align-items: center;
  font-size: 12px;
  &::before {
    width: 16px;
    height: 16px;
    background: url(${({ icon }) => icon});
    display: block;
    content: '';
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    margin-right: 4px;
  }
  & + span {
    margin-left: 10px;
  }
`;

const PostDate = styled.div`
  width: 100%;
  font-size: 10px;
  font-weight: 600;
  line-height: 16px;
  text-align: right;
  color: ${({ theme }) => theme.color.darkGray};
`;
