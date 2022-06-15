import React from 'react';
import { getCheckName } from '../../../network/signup/http';
import { nameValidation } from '../../../utils/validation';
import SignupNameStyle from './SignupName.style';

function SignupName ({message, setMessage, valid, setValid, onInputChange}) {
  const handleNameBlur = (evt) => {
    if (!nameValidation(evt.target.value)) {
      setMessage({ ...message, nickName: "3~8 자리의 한글, 영문, 숫자만 가능합니다. "});
      setValid({ ...valid, nickName: false});
    } else {
      getCheckName(evt.target.value)
        .then(({data}) => {
          setMessage({...message, nickName: data.message});
          setValid({...valid, nickName: data.success});
        })
        .catch(({ response: { data }}) => {
          setMessage({...message, nickName: data.message});
          setValid({...valid, nickName: data.success});
        })
    }
  }
  return (
    <SignupNameStyle
      message={message}
      valid={valid}
      onInputChange={onInputChange}
      onNameBlur={handleNameBlur}
    />
  );
}

export default SignupName;