import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { ValidCheck } from '../../styles/common/validtext';
import { ColorBtn } from '../../styles/common/buttons';
import { useDispatch } from 'react-redux';
import { loginClose } from '../../redux/toggle/action';

export const FormBox = styled.form`
  width: 100%;
  height: 65%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  box-sizing: border-box;
  margin-top: 40px;
`;

const Label = styled.label`
  font-size: 18px;
  font-weight: bold;
  align-self: flex-start;
  padding: 0 0 0 15px;
`;

const Input = styled.input`
  all: unset;
  width: 90%;
  height: 12%;
  border: 1px solid rgba(12, 12, 12, .4);
  border-radius: 5px;
  padding-left: 10px;
  margin-bottom: -5px;
`;

const FindIdPwd = styled.span`
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
`;

const SignBox = styled.div`
`;

const SignText = styled.span`
  font-size: 13px;
  color: ${({theme}) => theme.color.gray};
`;

const SignLink = styled(Link)`
  font-size: 15px;
  color: ${({theme}) => theme.color.black};
  font-weight: bold;
`;

const LoginBtn = styled(ColorBtn)`
  width: 120px;
  height: 30px;
  background-color: #FFC306;
  font-weight: bold;
  align-self: flex-end;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  margin: 0 20px 10px 0;
`;

const LoginValid = styled(ValidCheck)`
  align-self: flex-end;
  padding-right: 20px;
  margin-top: 5px;
`;

function EmailForm () {
  const dispatch = useDispatch();

  const handleLoginClose = () => {
    dispatch(loginClose());
  }
  return (
    <FormBox>
      <Label> 이메일 </Label>
      <Input type="email" placeholder='아이디를 입력하세요.'/>
      <LoginValid> 아이디를 다시 확인해주세요. </LoginValid>
      <Label> 비밀번호 </Label>
      <Input type="password" placeholder='비밀번호를 입력하세요.'/>
      <LoginValid> 비밀번호가 올바르지 않습니다. </LoginValid>
      <LoginBtn> 로그인 </LoginBtn>
      <SignBox>
        <SignText> 아직 회원이 아니신가요? </SignText>
        <SignLink to="/signup" onClick={handleLoginClose}> 회원가입 </SignLink>
      </SignBox>
      <FindIdPwd> 혹시 아이디와 비밀번호를 잊어버리셨나요? </FindIdPwd>
    </FormBox>
  );
}

export default EmailForm;