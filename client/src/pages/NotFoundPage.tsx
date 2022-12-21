import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../components/common/atoms/Button';

export default function NotFoundPage() {
  const naivgate = useNavigate();

  const handlegoBack = () => {
    naivgate(-1);
  };

  const handlegoHome = () => {
    naivgate('/');
  };

  return (
    <NotFoundBody>
      <NotFoundContent>
        <NotFoundSpan>404</NotFoundSpan>
        <NotFoundH2>페이지를 찾을 수 없습니다.</NotFoundH2>
        <NotFoundPara>
          찾으려는 페이지의 주소가 잘못 입력되었거나,
          <br />
          주소의 변경 혹은 삭제로 인해 사용하실 수 없습니다.
          <br />
          입력하신 페이지의 주소가 정확한지 다시 한번 확인해주세요.
        </NotFoundPara>
        <NotFoundBtnBox>
          <Button onClick={handlegoHome} width="90px" height="36px" border="none">
            홈
          </Button>
          <Button onClick={handlegoBack} width="90px" height="36px" border="none">
            뒤로가기
          </Button>
        </NotFoundBtnBox>
      </NotFoundContent>
    </NotFoundBody>
  );
}

const NotFoundBody = styled.div`
  width: 100%;
  padding-top: 186px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NotFoundContent = styled.div``;

const NotFoundSpan = styled.span`
  display: inline-block;
  width: 100%;
  margin-bottom: 27px;
  font-size: 107px;
  text-align: center;
  font-weight: 700;
`;

const NotFoundH2 = styled.h2`
  margin-bottom: 29px;
  text-align: center;
  font-size: 24px;
  font-weight: 700;
`;

const NotFoundPara = styled.p`
  text-align: center;
  margin-bottom: 36px;
  line-height: 1.6;
`;

const NotFoundBtnBox = styled.div`
  text-align: center;
  & button + button {
    margin-left: 33px;
  }
`;
