import { Link } from 'react-router-dom';
import styled from 'styled-components';

function PostsTitle ({ age }: { age: string }) {
  return (
    <TitleWrapper>
        <Title> {age}대에게 질문하세요 </Title>
        <MoreLink to={`generation/${age}`}> 더보기 </MoreLink>
    </TitleWrapper>
  );
}

export default PostsTitle;

const TitleWrapper = styled.div`
  display: flex;
  padding: 0 15px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid ${({ theme }) => theme.color.lightGray};
  height: 17%;
  font-size: 1rem;
  @media ${({ theme }) => theme.device.webMiddle} {
    font-size: 0.9rem;
  }
  @media ${({ theme }) => theme.device.ipad} {
    font-size: 1.1rem;
  }
  @media ${({ theme }) => theme.device.mobileMiddle} {
    font-size: 0.9rem;
  }
`;

const Title = styled.h2``;

const MoreLink = styled(Link)`
  width: 67px;
  height: 31px;
  padding: 0;
  background-color: ${({ theme }) => theme.color.yellow};
  border-radius: 4px;
  font-weight: 700;
  color: #ffffff;
  line-height: 31px;
  text-align: center;
  @media ${({ theme }) => theme.device.mobileMiddle} {
    width: 48px;
    height: 28px;
    line-height: 28px;
    font-size: 0.8rem;
  }
`;