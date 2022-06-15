import React from 'react';
import { getCheckId } from '../../../network/signup/http';
import { idValidation } from '../../../utils/validation';
import SignupIdStyle from './SignupId.style';

function SignupId ({message, setMessage, valid, setValid, onInputChange}) {
  const handleIdBlur = (evt) => {
    if (!idValidation(evt.target.value)) {
      setMessage({...message, userId: '4~12자리의 영문, 숫자만 가능합니다.'});
      setValid({ ...valid, userId: false});
    } else {
      getCheckId(evt.target.value)
        .then(({data}) => {
          console.log(message, valid);
          setMessage({ ...message, userId: data.message});
          setValid({ ...valid, userId: data.success });
        })
        .catch(({ response: { data } }) => {
          setMessage({ ...message, userId: data.message});
          setValid({ ...valid, userId: data.success });
        })
        ;
    }
  }

  return (
    <SignupIdStyle
      message={message}
      valid={valid}
      onInputChange={onInputChange}
      onIdBlur={handleIdBlur}
    />
  )
}

export default SignupId;