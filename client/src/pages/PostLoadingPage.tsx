import styled from 'styled-components';
import mail from '../asset/icons/icon-mail-line.svg';

export default function PostLoadingPage() {
  return (
    <LoadingBody>
      <LoadingContent>
        <MailIcon src={mail} />
        <MailSpan />
        <MailSpan />
        <MailSpan />
        <MailSpan />
        <MailSpan />
        <MailSpan />
        <MailIcon src={mail} />
      </LoadingContent>
      <MailTitle>질문을 다른 세대에게 전달 중...</MailTitle>
    </LoadingBody>
  );
}

const LoadingBody = styled.div`
  margin: 100px auto 0;
  padding: 70px 0 200px;
  width: 730px;
  height: 100%;
  min-height: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MailTitle = styled.h2`
  font-size: 16px;
  font-weight: 700;
  margin-left: 4px;
  margin-top: 33px;
`;

const LoadingContent = styled.div`
  & :nth-child(1) {
    animation-delay: 0.5s;
    animation-iteration-count: infinite;
    animation-duration: 4s;
    animation-name: bounce;
    animation-fill-mode: forwards;
  }

  & :nth-child(2) {
    animation-delay: 1s;
    animation-iteration-count: infinite;
    animation-duration: 4s;
    animation-name: bounce;
    animation-fill-mode: forwards;
  }

  & :nth-child(3) {
    animation-delay: 1.5s;
    animation-iteration-count: infinite;
    animation-duration: 4s;
    animation-name: bounce;
    animation-fill-mode: forwards;
  }

  & :nth-child(4) {
    animation-delay: 2s;
    animation-iteration-count: infinite;
    animation-duration: 4s;
    animation-name: bounce;
    animation-fill-mode: forwards;
  }
  & :nth-child(5) {
    animation-delay: 2.5s;
    animation-iteration-count: infinite;
    animation-duration: 4s;
    animation-name: bounce;
    animation-fill-mode: forwards;
  }
  & :nth-child(6) {
    animation-delay: 3s;
    animation-iteration-count: infinite;
    animation-duration: 4s;
    animation-name: bounce;
    animation-fill-mode: forwards;
  }

  & :nth-child(7) {
    animation-delay: 3.5s;
    animation-iteration-count: infinite;
    animation-duration: 4s;
    animation-name: bounce;
    animation-fill-mode: forwards;
  }

  & :nth-child(8) {
    animation-delay: 4s;
    animation-iteration-count: infinite;
    animation-duration: 4s;
    animation-name: bounce;
    animation-fill-mode: forwards;
  }

  @keyframes bounce {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const MailSpan = styled.span`
  display: inline-block;
  width: 5px;
  height: 5px;
  border-radius: 100%;
  background-color: #ffc306;
  margin-left: 8px;
  // opacity: 0.5;
`;

const MailIcon = styled.img`
  width: 40px;
  height: 40px;
  vertical-align: -13px;
  margin-left: 4px;
`;
