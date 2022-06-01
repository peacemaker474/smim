import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { putPassword } from '../../../network/mypage/http';
import { ChangePwBtn, CancelBtn } from '../../../styles/common/buttons';
import { pwValidation } from '../../../utils/validation';
import PwInput from '../Myinfo/PwInput';

const Wrapper = styled.form`
  width: 50vw;
  height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const Title = styled.h2`
  width: 70%;
  height: 70px;
  line-height: 70px;
  font-size: 28px;
  font-weight: bold;
`;

function PwChange () {
  const user = useSelector((state) => state.loginReducer);
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
    newPassword2: "",
  });

  const handleInputChange = (evt) => {
    const name = evt.target.name;
    setPassword({ ...password, [name]: evt.target.value});
  }

  const handlePwSubmit = (evt) => {
    evt.preventDefault();

    if (!pwValidation(password.oldPassword) && !pwValidation(password.newPassword)) {
      return alert("8~16자, 최소 하나의 숫자와 특수문자가 필요합니다.");
    } else {
      let body = {
        userId: user.id,
        oldPassword: password.oldPassword,
        newPassword: password.newPassword,
        newPassword2: password.newPassword2,
      };
      putPassword(body);
    }
  }

  return (
    <Wrapper>
      <Title> 비밀번호 변경 </Title>
      <PwInput
        onInputChange={handleInputChange}
      />
      <ChangePwBtn onClick={handlePwSubmit}> 확인 </ChangePwBtn>
      <CancelBtn> 취소 </CancelBtn>
    </Wrapper>
  );
}

export default PwChange;