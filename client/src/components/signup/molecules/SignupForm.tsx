import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { postSignupSubmit } from '../../../networks/signup/http';
import { AxiosResponseSignup, SignupFormData } from '../../../type/signupTypes';
import SignupBirth from '../atoms/SignupBirth';
import SignupBtns from '../atoms/SignupBtns';
import SignupEmail from '../atoms/SignupEmail';
import SignupId from '../atoms/SignupId';
import SignupName from '../atoms/SignupName';
import SignupPw from '../atoms/SignupPw';


function SignupForm () {
  const { register, handleSubmit, formState: { errors }, getValues } = useForm<SignupFormData>({
    mode: 'onBlur',
    reValidateMode: 'onBlur'
  });

  const [valid, setValid] = useState({
    userId: false,
    email: false,
    nickName: false,
    password: false,
    check: false,
  });

  const navigate = useNavigate();

  const handleSignupSubmit = (data: SignupFormData) => {
    const day = +data.dd < 10 ? `0${data.dd}` : data.dd;

    const body = {
      userId: data.userId,
      email: data.email,
      nickname: data.nickName,
      birthday: data.yy + data.mm + day,
      password: data.password
    };
    
    postSignupSubmit(body)
      .then((res: AxiosResponseSignup) => {
        if (res.data.success) {
          navigate('/');
        }
      });
  };

  return (
    <SignupFormBox onSubmit={handleSubmit(handleSignupSubmit)}>
      <SignupId
        register={register}
        errors={errors}
        valid={valid}
        setValid={setValid}
      />
      <SignupEmail
        register={register}
        errors={errors}
        valid={valid}
        setValid={setValid}
      />
      <SignupName
        register={register}
        errors={errors}
        valid={valid}
        setValid={setValid}
      />
      <SignupBirth
        register={register}
        errors={errors}
        getValues={getValues}
      />
      <SignupPw
        register={register}
        errors={errors}
        valid={valid}
        setValid={setValid}
        getValues={getValues}
      />
      <SignupBtns />
    </SignupFormBox>
  );
}

export default SignupForm;

const SignupFormBox = styled.form`
  width: 60%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;