import React from 'react';
import { checkName } from '../../network/signup/http';
import { SignupInput } from '../../styles/common/input';
import { ValidCheck } from '../../styles/common/validtext';
import { InputBox } from '../../styles/signup/container';
import { SignupTitle } from '../../styles/signup/title';
import { nameValidation } from '../../utils/validation';

function SignupName ({message, setMessage, valid, setValid, onInputChange}) {
  const handleNameBlur = (evt) => {
    if (!nameValidation(evt.target.value)) {
      setMessage({ ...message, nickName: "3~8 자리의 한글, 영문, 숫자만 가능합니다. "});
      setValid({ ...valid, nickName: false});
    } else {
      checkName(evt.target.value)
        .then(({data}) => {
          setMessage({...message, nickName: data.message});
          setValid({...valid, nickName: data.success});
        })
    }
  }
  return (
    <InputBox>
    <SignupTitle> 닉네임 </SignupTitle>
      <SignupInput type="text" name="nickName" onChange={onInputChange} onBlur={handleNameBlur} />
      {message.nickName !== "" && <ValidCheck current={valid.nickName}> {message.nickName} </ValidCheck>}
    </InputBox>
  )
}

export default SignupName;