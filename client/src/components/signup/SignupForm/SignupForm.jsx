import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { postSignupSubmit } from '../../../network/signup/http';
import SignupFormStyle from './SignupForm.style';

function SignupForm() {
  const { register, handleSubmit, formState: { errors }, getValues } = useForm({
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const [valid, setValid] = useState({
    userId: false,
    email: false,
    nickName: false,
    password: false,
    check: false,
  });

  const navigate = useNavigate();

  const handleSignupSubmit = useCallback((data) => {
    let day = data.dd < 10 ? `0${data.dd}` : data.dd;

    let body = {
      userId: data.userId,
      email: data.email,
      nickname: data.nickName,
      birthday: data.yy + data.mm + day,
      password: data.password
    };
    
    postSignupSubmit(body).then((res) => {
      if (res.data.success) {
        navigate('/');
      }
    });
  }, [navigate]);

  const handleCancelClick = () => {
    navigate('/');
  };

  return (
    <SignupFormStyle
      register={register}
      errors={errors}
      onSubmit={handleSubmit}
      getValues={getValues}
      valid={valid}
      setValid={setValid}
      onSignupSubmit={handleSignupSubmit}
      onCancelClick={handleCancelClick}
    />
  );
}

export default SignupForm;
