import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { putChangePassWord } from '../../../network/mypage/http';
import { pwValidation } from '../../../utils/validation';
import PasswordChangeStyle from './PasswordChange.style';

function PasswordChange () {
  const user = useSelector((state) => state.user);
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
      putChangePassWord(body);
    }
  }

  return (
    <PasswordChangeStyle
      onInputChange={handleInputChange}
      onPwSubmit={handlePwSubmit}
    />
  );
}

export default PasswordChange;