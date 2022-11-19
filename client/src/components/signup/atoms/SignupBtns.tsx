import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../common/atoms/Button';

function SignupBtns () {
  const navigate = useNavigate();

  const handleCancelClick = () => {
    navigate('/');
  }

  return (
    <BtnBox>
      <Button
        width='80px'
        height='67%'
        border='1px solid #FFC306'
        type='submit'
      >
        회원가입
      </Button>
      <Button
        width='80px'
        height='67%'
        border='1px solid #FFC306'
        onClick={handleCancelClick}
      >
        취소
      </Button>
    </BtnBox>
  );
}

export default memo(SignupBtns);

const BtnBox = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: center;

  button:first-child {
    font-size: 0.9rem;
    font-weight: 500;
    margin-right: 20px;
  }

  @media screen and (max-width: 400px) {
    button {
      font-size: 0.8rem;
    }
  }
`;