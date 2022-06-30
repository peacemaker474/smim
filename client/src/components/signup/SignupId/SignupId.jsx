import React from 'react';
import { getCheckId } from '../../../network/signup/http';
import { idValidation } from '../../../utils/validation';
import SignupIdStyle from './SignupId.style';

function SignupId ({register, errors, setError, valid, setValid}) {
  
  const handleIdBlur = () => (evt) => {
    if (!idValidation(evt.target.value)) {
      setValid({ ...valid, userId: false});
      setError('userId', {
        type: 'Empty id',
        message: '아이디 형식의 맞게 입력해주세요.',
      })
    } else {
      getCheckId(evt.target.value)
        .then(({data}) => {
          setValid({ ...valid, userId: data.success });
        })
        .catch(({ response: { data } }) => {
          setValid({ ...valid, userId: data.success });
          setError('userId', {
            type: 'already exists id',
            message: data.message,
          });
        });
    }
  }

  return (
    <SignupIdStyle
      register={register}
      errors={errors}
      setError={setError}
      valid={valid}
      onIdBlur={handleIdBlur}
    />
  )
}

export default SignupId;