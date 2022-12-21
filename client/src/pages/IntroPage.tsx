import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/common/atoms/Button';
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
  gap: 5rem;

  & > img {
    width: 35em;
  }

  & > img:last-child {
    width: 50em;
  }

  &:last-child {
    flex-direction: column;
  }

  &:nth-child(2) {
    flex-direction: row-reverse;

    @media screen and (max-width: 928px) {
      flex-direction: column;
    }
  }

  @media screen and (max-width: 928px) {
    flex-direction: column;
    gap: 1rem;
    & > img {
      margin-bottom: 2rem;
    }
  }

  @media (min-width: 928px) and (max-width: 1040px) {
    & > img {
      margin-right: 4rem;
    }
  }
`;

const IntroImg = styled.img`
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

const IntroDesc = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > button {
    font-size: 2rem;
  }

  & > button:hover {
    color: rgb(255, 195, 6);
    background-color: #fff;
    border: 1px solid rgb(255, 195, 6);
  }
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

function IntroPage() {
  const introData = [
    {
      id: 1,
      url: '/images/img2.png',
      alt: 'Slider이미지2',
      title: '세대간 궁금했던 이야기를 질문해보세요.',
      subText: `받는 나이대를 정해 질문을 올릴 수 있어요.`,
      subText2: `평소 다른 세대에게 궁금했던 점을 태그를 이용해 질문해보세요.`,
    },
    {
      id: 2,
      url: '/images/img3.png',
      alt: 'Slider이미지3',
      title: '답변하고 싶은 질문있나요?',
      subText: `우리 세대에게 온 질문들에 답변할 수 있어요.`,
      subText2: `댓글 기능으로 답변을 남겨주세요.`,
    },
    {
      id: 3,
      url: '/images/img1.png',
      alt: 'Slider이미지1',
      title: '세대간 소통창구 스며들다, 바로 시작해보세요!',
    },
  ];
  const [store, setStore] = useLocalStorage('entry', false);
  const navigate = useNavigate();

  useEffect(() => {
    if (store) {
      navigate('/');
    }
  }, [store, navigate]);

  const handleStartClick = () => {
    if (!store) {
      setStore(true);
    }
    navigate('/');
  };

  return (
    <Wrapper>
      {introData.map((item) => (
        <Content key={item.id}>
          <IntroImg src={item.url} alt={item.alt} />
          <IntroDesc>
            <Title> {item.title} </Title>
            {item.subText && (
              <SubText>
                {item.subText}
                <br />
                {item.subText2}
              </SubText>
            )}
            {item.id === 3 && (
              <Button width="15rem" height="4rem" onClick={handleStartClick}>
                시작하기
              </Button>
            )}
          </IntroDesc>
        </Content>
      ))}
    </Wrapper>
  );
}

export default IntroPage;
