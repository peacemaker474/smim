import React from 'react';
import { checkId } from '../../network/signup/http';
import { SignupInput } from '../../styles/common/input';
import { ValidCheck } from '../../styles/common/validtext';
import { idValidation } from '../../utils/validation';
import { SignupTitle } from '../../styles/signup/title';
import { InputBox } from '../../styles/signup/container';

function SignupId ({message, setMessage, valid, setValid, onInputChange}) {
  const handleIdBlur = (evt) => {
    if (!idValidation(evt.target.value)) {
      setMessage({...message, userId: '4~12자리의 영문, 숫자만 가능합니다.'});
      setValid({ ...valid, userId: false});
    } else {
      checkId(evt.target.value)
        .then(({data}) => {
          console.log(message, valid);
          setMessage({ ...message, userId: data.message});
          setValid({ ...valid, userId: data.success });
        });
    }
  }

  return (
    <InputBox>
      <SignupTitle> 아이디 </SignupTitle>
      <SignupInput type="text" name="userId" onBlur={handleIdBlur} onChange={onInputChange} />
      {message.userId !== "" && <ValidCheck current={valid.userId}> {message.userId} </ValidCheck>}
    </InputBox>
  )
}

export default SignupId;