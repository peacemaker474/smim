import React from 'react';
import { getCheckName } from '../../../network/signup/http';
import { nameValidation } from '../../../utils/validation';
import SignupNameStyle from './SignupName.style';

function SignupName ({ register, errors, setError, valid, setValid }) {
  
  const handleNameBlur = () => (evt) => {
    if (!nameValidation(evt.target.value)) {
      setValid({ ...valid, nickName: false});
      setError("nickName", {
        type: 'Empty name',
        message: "닉네임을 입력하세요",
      })
    } else {
      getCheckName(evt.target.value)
        .then(({data}) => {
          setValid({...valid, nickName: data.success});
        })
        .catch(({ response: { data }}) => {
          setValid({...valid, nickName: data.success});
          setError('nickName', {
            type: 'already exists nickname',
            message: data.message,
          })
        });
    }
  }
  return (
    <SignupNameStyle
      register={register}
      errors={errors}
      setError={setError}
      valid={valid}
      onNameBlur={handleNameBlur}
    />
  );
}

export default SignupName;