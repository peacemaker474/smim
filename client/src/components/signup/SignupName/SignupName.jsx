import React, { useCallback } from 'react';
import { getCheckName } from '../../../network/signup/http';
import SignupNameStyle from './SignupName.style';

function SignupName ({ register, errors, valid, setValid }) {
  
  const handleExistedName = useCallback(() => async (value) => {
    try {
      const { data } = await getCheckName(value);
      if (data.success) setValid({...valid, nickName: true});
      return data.success;
    } catch (err) {
      setValid({...valid, nickName: false});
      if (err) return `${err.response.data.message}`;
    }
  }, [valid, setValid]);

  return (
    <SignupNameStyle
      register={register}
      errors={errors}
      valid={valid}
      onExistedName={handleExistedName}
    />
  );
}

export default SignupName;