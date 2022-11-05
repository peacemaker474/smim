import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { postSignupSubmit } from '../../../networks/signup/http';
import SignupId from '../atoms/SignupId';
import { ResponseSignup, SignupFormData } from '../types';

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

  // const handleSignupSubmit = (data: SignupFormData) => {
  //   let day = +data.dd < 10 ? `0${data.dd}` : data.dd;

  //   let body = {
  //     userId: data.userId,
  //     email: data.email,
  //     nickname: data.nickName,
  //     birthday: data.yy + data.mm + day,
  //     password: data.password
  //   };
    
  //   postSignupSubmit(body).then((res: ResponseSignup) => {
  //       if (res.data.success) {
  //         navigate('/');
  //       }
  //     });
  // };

  return (
    <SignupFormBox>
      <SignupId
        register={register}
        errors={errors}
        valid={valid}
        setValid={setValid}
      />
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