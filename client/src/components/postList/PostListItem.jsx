import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Tag } from '../../styles/common/tag';
import Heart from '../../asset/icon/icon-heart-fill.svg';

const PostItem = styled.div`
  border: 2px solid ${({ theme }) => theme.color.lightGray};
  border-radius: 20px;
  padding: 31px 21px;
  position: relative;
`;

const PostAnchor = styled.a`
  cursor: pointer;
`;

const PostTitle = styled.h2`
  color: ${({ theme }) => theme.color.black};
  font-size: 15px;
  font-weight: 700;
  line-height: 20px;
  margin-bottom: 21px;
`;
const PostEtcDiv = styled.div`
  margin-bottom: 20px;
`;
const PostTagDiv = styled.div`
  display: flex;
  margin-bottom: 12px;
`;
const TagItem = styled(Tag)`
  background-color: ${({ theme, color }) => theme.tagColor[color]};
  & + span {
    margin-left: 5px;
  }
`;
const PostLikeDiv = styled.div`
  display: flex;
  margin-bottom: 22px;
`;

const LikeSpan = styled.span`
  display: flex;
  align-items: center;
  font-size: 12px;
  &::before {
    width: 16px;
    height: 16px;
    background: url(${Heart});
    display: block;
    content: '';
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    margin-right: 4px;
  }
`;

const PostText = styled.p`
  font-size: 11px;
  font-weight: 700;
  line-height: 14px;
  margin-bottom: 14px;
  color: ${({ theme }) => theme.color.black};
`;

const PostDate = styled.span`
  font-size: 10px;
  font-weight: 600;
  line-height: 12px;
  color: ${({ theme }) => theme.color.darkGray};
  position: absolute;
  bottom: 23px;
  right: 18px;
`;

function PostListItem() {
  const navigate = useNavigate();
  const handleAnchorClick = () => {
    navigate('/posts/view/20');
  };

  return (
    <PostItem>
      <PostAnchor onClick={handleAnchorClick}>
        <PostTitle>아버지에게 드릴 선물을 고민하고 있습니다.</PostTitle>
        <PostEtcDiv>
          <PostTagDiv>
            <TagItem color='yellow'>선물</TagItem>
            <TagItem color='purple'>가족</TagItem>
            <TagItem color='salmon'>HAPPY</TagItem>
          </PostTagDiv>
        </PostEtcDiv>
        <PostText>60대 아버지의 환갑잔치 선물은 뭐가 좋을까요? ...</PostText>
        <PostLikeDiv>
          <LikeSpan>226</LikeSpan>
        </PostLikeDiv>
        <PostDate>22년 2월 13일</PostDate>
      </PostAnchor>
    </PostItem>
  );
}

export default PostListItem;
