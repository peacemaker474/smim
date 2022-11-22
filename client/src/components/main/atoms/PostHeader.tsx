import styled from 'styled-components';

interface PostHeaderProps {
  answer: string;
  title: string;
}


function PostHeader ({ answer, title }: PostHeaderProps) {
  return (
    <ListHeader>
      <ListisAnswer> {answer} </ListisAnswer>
      <ListTitle> {title} </ListTitle>
    </ListHeader>
  );
}

export default PostHeader;

const ListHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding-bottom: 0.8em;
  font-size: 0.9rem;
  font-weight: bold;
  @media ${({ theme }) => theme.device.webMiddle} {
    font-size: 0.8rem;
    padding-bottom: 0.3em;
  }
  @media ${({ theme }) => theme.device.ipad} {
    font-size: 0.9rem;
    padding: 0.3em 0 0.8em 0;
  }
  @media ${({ theme }) => theme.device.mobileMiddle} {
    font-size: 0.8rem;
    padding: 0.2em 0.2em 0.9em 0;
  }
`;

const ListisAnswer = styled.p`
  width: 25%;
  color: #038cfc;
  @media ${({ theme }) => theme.device.mobileMiddle} {
    width: 30%;
  }
`;

const ListTitle = styled.h3`
  width: 80%;
  @media ${({ theme }) => theme.device.webMiddle} {
    padding-left: 5px;
  }
  @media ${({ theme }) => theme.device.ipad} {
    padding-left: 0;
  }
  @media ${({ theme }) => theme.device.mobileMiddle} {
    padding-left: 5px;
    width: 75%;
  }
`;