import React, { useCallback } from 'react';
import { getCheckEmail } from '../../../network/signup/http';
import SignupEmailStyle from './SignupEmail.style';

function SignupEmail ({register, errors, valid, setValid }) {
  
  const handleCheckExistedEmail = useCallback(() => async (value) => {
    try {
      const { data } = await getCheckEmail(value);
      if (data.success) setValid({...valid, email: true});
      return data.success;
    } catch (err) {
      setValid({ ...valid, email: false});
      if (err) return `${err.response.data.message}`;
    }
  }, [valid, setValid]);

  return (
    <SignupEmailStyle
      register={register}
      errors={errors}
      valid={valid}
      onCheckExistedEmail={handleCheckExistedEmail}
    />
  )
}

export default SignupEmail;