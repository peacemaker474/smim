import React from 'react';
import { getCheckId } from '../../../network/signup/http';
import SignupIdStyle from './SignupId.style';

function SignupId ({register, errors, valid, setValid}) {
  
  const handleExistedId = () => async (value) => {
    try {
      const { data } = await getCheckId(value);
      if (data.success) setValid({...valid, userId: true});
      return data.success;
    } catch (err) {
      setValid({...valid, userId: false});
      if (err) return `${err.response.data.message}`;
    }
  }

  return (
    <SignupIdStyle
      register={register}
      errors={errors}
      valid={valid}
      onExistedId={handleExistedId}
    />
  )
}

export default SignupId;