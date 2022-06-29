import React from 'react';
import { getCheckEmail } from '../../../network/signup/http';
import { emailValidation } from '../../../utils/validation';
import SignupEmailStyle from './SignupEmail.style';

function SignupEmail ({register, errors, setError, valid, setValid }) {
  
  const handleEmailBlur = () => (evt) => {
    if (!emailValidation(evt.target.value)) {
      setValid({ ...valid, email: false});
      setError('email', {
        type: 'Empty email',
        message: '이메일을 입력해주세요.'
      })
    } else {
      getCheckEmail(evt.target.value)
        .then(({data}) => {
          setValid({ ...valid, email: data.success});
        })
        .catch(({ response : { data }}) => {
          setValid({ ...valid, email: data.success});
          setError('email', {
            type: 'already exists email',
            message: data.message,
          });
        });
    }
  }
  return (
    <SignupEmailStyle
      register={register}
      errors={errors}
      setError={setError}
      valid={valid}
      onEmailBlur={handleEmailBlur}
    />
  )
}

export default SignupEmail;