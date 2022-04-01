import React from 'react';
import styled from 'styled-components';
import { Tag } from '../../styles/common/tag';

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
  return (
    <PostBox>
      <PostViewH2>20대에게</PostViewH2>
      <PostTitle>고민있습니다</PostTitle>
      <PostHead>
        <PostAuthor>User1</PostAuthor>
        <PostDate>2022년 1월 9일</PostDate>
      </PostHead>
      <PostBody>
        <PostContent>
          <PostPara>
            홍콩에 있는 친구 안녕! 여기서 처음 써보는 편지야. 나는 스톡홀름에 사는 17살 학생이야.
            <br />
            겹치는 관심사가 너무 많아서 깜짝 놀랐어! 여행 좋아해? 스웨덴에 와 본 적 있니?
            <br />
            <br /> 언젠가 홍콩에 가보고 싶어. 어떤 외국어를 할 수 잇어? 답장 기다릴게! 홍콩에 있는
            친구 안녕! 여기서 처음 써보는 편지야. 나는 스톡홀름에 사는 17살 학생이야.
            <br />
            <br />
            겹치는 관심사가 너무 많아서 깜짝 놀랐어!
            <br />
            여행 좋아해? 스웨덴에 와 본 적 있니? 언젠가 홍콩에 가보고 싶어. 어떤 외국어를 할수 잇어?
            답장 기다릴게! 홍콩에 있는 친구 안녕! 여기서 처음 써보는 편지야. 나는 스톡홀름에 사는
            17살 학생이야. 겹치는 관심사가 너무 많아서 깜짝 놀랐어! 여행 좋아해? 스웨덴에 와 본 적
            있니? 언젠가 홍콩에 가보고 싶어. 어떤 외국어를 할 수 잇어? 답장 기다릴게!
          </PostPara>
        </PostContent>
        <PostTagBox>
          <TagItem color='blue'>선물</TagItem>
          <TagItem color='yellow'>가족</TagItem>
        </PostTagBox>
        <PostLikeBox>
          <PostLikeSpan>좋아요</PostLikeSpan>
          <PostLikeSpan>즐겨찾기</PostLikeSpan>
        </PostLikeBox>
      </PostBody>
    </PostBox>
  );
}
