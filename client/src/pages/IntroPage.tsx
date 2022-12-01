import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/common/atoms/Button';
import Banner1 from '../asset/img1.png';
import Banner2 from '../asset/img2.png';
import Banner3 from '../asset/img3.png';
import useLocalStorage from '../hooks/useLocalStorage';

const Wrapper = styled.div`
  width: 100%;
  max-height: 100vh;
  scroll-behavior: smooth;
  scroll-snap-type: y mandatory;
  overflow-y: scroll;

  & > div {
    scroll-snap-align: end;
  }
`;

const Content = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 928px) {
    flex-direction: column;
  }
`;

const Content2 = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const IntroImg = styled.div`
  & > img {
    width: 35em;
  }
  & > .last-img {
    width: 50em;
  }
  @media screen and (max-width: 740px) {
    flex-direction: column;
    margin-right: 0;
    margin-left: 0;
    font-size: 14px;
    line-height: 2rem;
    & > img {
      width: 25em;
    }
    & > .last-img {
      width: 27em;
    }
  }
  @media (min-width: 740px) and (max-width: 928px) {
    flex-direction: column;
    margin-right: 0;
    margin-left: 0;
    font-size: 14px;
  }
  @media (min-width: 928px) and (max-width: 1040px) {
    & > img {
      width: 30em;
    }
  }
`;

const IntroImg1 = styled(IntroImg)`
  margin-right: 5rem;
  @media screen and (max-width: 928px) {
    margin-right: 0;
    margin-left: 0;
    & > img {
      margin-bottom: 2rem;
    }
  }
  @media (min-width: 928px) and (max-width: 1040px) {
    margin-right: 4rem;
  }
`;
const IntroImg2 = styled(IntroImg)`
  margin-left: 9rem;
  @media screen and (max-width: 928px) {
    margin-right: 0;
    margin-left: 0;
    & > img {
      margin-top: 2rem;
    }
  }
  @media (min-width: 928px) and (max-width: 1040px) {
    margin-left: 5rem;
  }
`;

const IntroDesc = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 4rem;
  word-break: keep-all;
  text-align: center;
  line-height: 3rem;
  color: ${({ theme }) => theme.color.navy};
  @media screen and (max-width: 740px) {
    font-size: 22px;
    margin-bottom: 2rem;
  }
  @media (min-width: 740px) and (max-width: 928px) {
    margin-bottom: 2rem;
  }
`;

const SubText = styled.p`
  color: ${({ theme }) => theme.color.navy};
  font-size: 1.25rem;
  font-weight: 500;
  text-align: center;
  line-height: 2rem;
  word-break: keep-all;
  text-align: center;
  @media screen and (max-width: 740px) {
    font-size: 14px;
    line-height: 23px;
  }
  @media (min-width: 740px) and (max-width: 928px) {
    line-height: 2rem;
  }
`;

function IntroPage () {
  const [store, setStore] = useLocalStorage('entry', false);
  const navigate = useNavigate();

  useEffect(() => {
    if (store) {
      navigate('/');
    }
  }, []);

  const handleStartClick = () => {
    if (!store) {
      setStore(true);
    }
    navigate('/');
  }

  return (
    <Wrapper>
      <Content>
          <IntroImg1>
            <img src={Banner2} alt='Slide이미지1' />
          </IntroImg1>
          <IntroDesc>
            <Title>세대간 궁금했던 이야기를 질문해보세요</Title>
            <SubText>
              받는 나이대를 정해 질문을 올릴 수 있어요
              <br />
              평소 다른 세대에게 궁금했던 점을 태그를 이용해 질문해보세요
            </SubText>
          </IntroDesc>
        </Content>
        <Content>
          <IntroDesc>
            <Title>답변하고 싶은 질문들이 있나요?</Title>
            <SubText>
              우리 세대에게 온 질문들에 답변할 수 있어요 <br />
              댓글 기능으로 답변을 남겨주세요
            </SubText>
          </IntroDesc>
          <IntroImg2>
            <img src={Banner3} alt='Slide이미지3' />
          </IntroImg2>
        </Content>
        <Content2>
          <IntroImg>
            <img className='last-img' src={Banner1} alt='Slide이미지' />
          </IntroImg>
          <IntroDesc>
            <Title>세대간 소통창구 스며들다, 바로 시작해보세요!</Title>
            <Button width='15rem' height='4rem' border='none' onClick={handleStartClick}>
              시작하기
            </Button>
          </IntroDesc>
        </Content2>
    </Wrapper>
  );
}

export default IntroPage;