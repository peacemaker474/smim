import React from 'react';
import styled from 'styled-components';
import { Tag } from '../../styles/common/tag';

const PostBox = styled.div`
  width: 794px;
  margin: 0 auto 70px;
`;

const PostTitle = styled.h3`
  font-size: 32px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.black};
`;

const PostHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
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
    width: 48px;
    height: 48px;
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

const PostBody = styled.div`
  width: 794px;
  padding: 8px;
`;
const PostPara = styled.div`
  font-size: 15px;
  font-weight: 500;
  line-height: 23px;
  margin-bottom: 24px;
`;

const PostTagBox = styled.div`
  display: flex;
`;

export default function PostPost() {
  return (
    <PostBox>
      <PostTitle>고민있습니다</PostTitle>
      <PostHead>
        <PostAuthor>User1</PostAuthor>
        <PostDate>2022년 1월 9일</PostDate>
      </PostHead>
      <PostBody>
        <PostPara>
          홍콩에 있는 친구 안녕! 여기서 처음 써보는 편지야. 나는 스톡홀름에 사는 17살 학생이야.
          겹치는 관심사가 너무 많아서 깜짝 놀랐어! 여행 좋아해? 스웨덴에 와 본 적 있니? 언젠가
          홍콩에 가보고 싶어. 어떤 외국어를 할 수 잇어? 답장 기다릴게! 홍콩에 있는 친구 안녕! 여기서
          처음 써보는 편지야. 나는 스톡홀름에 사는 17살 학생이야. 겹치는 관심사가 너무 많아서 깜짝
          놀랐어! 여행 좋아해? 스웨덴에 와 본 적 있니? 언젠가 홍콩에 가보고 싶어. 어떤 외국어를 할
          수 잇어? 답장 기다릴게! 홍콩에 있는 친구 안녕! 여기서 처음 써보는 편지야. 나는 스톡홀름에
          사는 17살 학생이야. 겹치는 관심사가 너무 많아서 깜짝 놀랐어! 여행 좋아해? 스웨덴에 와 본
          적 있니? 언젠가 홍콩에 가보고 싶어. 어떤 외국어를 할 수 잇어? 답장 기다릴게!
        </PostPara>
        <PostTagBox>
          <Tag palette='blue'>선물</Tag>
          <Tag palette='yellow'>가족</Tag>
        </PostTagBox>
      </PostBody>
    </PostBox>
  );
}
