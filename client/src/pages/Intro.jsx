import React from 'react';
import styled from 'styled-components';
import { ColorBtn } from '../styles/common/buttons';

const IntroCtn = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Section = styled.section`
  min-width: 1080px;
  height: 100vh;
`;

const Content = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content2 = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const IntroImg = styled.div`
  margin-top: ${({ marginTop }) => marginTop || 'none'};
  margin-bottom: ${({ marginBottom }) => marginBottom || 'none'};
  margin-left: ${({ marginLeft }) => marginLeft || 'none'};
  margin-right: ${({ marginRight }) => marginRight || 'none'};
  > img {
    width: 35rem;
  }
  > .last-img {
    width: 50rem;
  }
`;

const IntroDesc = styled.div`
  margin-top: ${({ marginTop }) => marginTop || 'none'};
  margin-bottom: ${({ marginBottom }) => marginBottom || 'none'};
  margin-left: ${({ marginLeft }) => marginLeft || 'none'};
  margin-right: ${({ marginRight }) => marginRight || 'none'};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.color.navy};
`;

const SubText = styled.p`
  color: ${({ theme }) => theme.color.navy};
  font-size: 1.25rem;
  font-weight: 500;
  text-align: center;
  line-height: 1.5rem;
`;

const StartBtn = styled(ColorBtn)`
  width: 15rem;
  height: 4rem;
  border-radius: 0.05rem;
  font-size: 2rem;
  font-weight: 500;
  margin-top: 1rem;
`;

export default function Intro() {
  return (
    <IntroCtn>
      <Section>
        <Content>
          <IntroImg marginRight='5rem'>
            <img src='/asset/img2.png' alt='section이미지1' />
          </IntroImg>
          <IntroDesc>
            <Title>세대간 궁금했던 이야기를 질문해보세요</Title>
            <SubText>
              받는 나이대를 정해 질문을 올릴 수 있어요
              <br />
              평소 다른 세대에게 궁금했던 점을 태그를 이용해 질문해보세요
            </SubText>
          </IntroDesc>
        </Content>
      </Section>
      <Section>
        <Content>
          <IntroDesc>
            <Title>답변하고싶은 질문들이 있나요?</Title>
            <SubText>
              우리 세대에게 온 질문들에 답변할 수 있어요 <br />
              댓글 기능으로 답변을 남겨주세요
            </SubText>
          </IntroDesc>
          <IntroImg marginLeft='9rem'>
            <img src='/asset/img3.png' alt='section이미지3' />
          </IntroImg>
        </Content>
      </Section>
      <Section>
        <Content2>
          <IntroImg>
            <img className='last-img' src='/asset/img1.png' alt='section이미지' />
          </IntroImg>
          <IntroDesc>
            <Title>세대간 소통창구 스며들다, 바로 시작해보세요!</Title>
            <StartBtn palette='yellow'>시작하기</StartBtn>
          </IntroDesc>
        </Content2>
      </Section>
    </IntroCtn>
  );
}
