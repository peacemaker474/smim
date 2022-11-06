import styled from 'styled-components';
import { useCallback } from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { SignupProps } from '../types';
import { getCheckEmail } from '../../../networks/signup/http';
import Input from '../../common/atoms/Input';
import CheckSVG from '../../../asset/icons/icon-check.svg';
import ValidSpan from '../../common/atoms/ValidSpan';

function SignupEmail ({ register, errors, valid, setValid}: SignupProps) {
  const handleCheckExistedEmail = useCallback(() => async (value: Record<string, any>) => {
    try {
      const { data } = await getCheckEmail(value);
      if (data.success) setValid({...valid, email: true});
      return data.success;
    } catch (err: any) {
      setValid({ ...valid, email: false});
      if (err) return `${err.response.data.message}`;
    }
  }, [valid, setValid]);

  return (
    <InputWrapper>
      <SignupTitle htmlFor='email'> 이메일 </SignupTitle>
      <Input
        type='text'
        id='email'
        register={register}
        name='email'
        rules={{
          required: "이메일을 입력하세요",
          pattern: {
            value: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/,
            message: "이메일 형식의 맞춰서 작성해주세요."
          },
          validate: {
            checkExistsEmail: handleCheckExistedEmail(),
          }
        }}
        width='100%'
        height='50%'
        border='2px solid #FFC306'
      />
      { valid.email ?
        <CheckBox /> :
        <ErrorMessage
          errors={errors}
          name='email'
          render={({ message }) => <ValidSpan padding='1em 0.2em 0 0'> {message} </ValidSpan>}
        /> }
    </InputWrapper>
  );
}

export default SignupEmail;

const InputWrapper = styled.div`
  width: 100%;
  height: 14%;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
`;

const SignupTitle = styled.label`
  font-size: 14px;
  font-weight: bold;
  margin: 0 0 5px 3px;
  align-self: flex-start;
`

const CheckBox = styled.div`
  width: 20px;
  height: 20px;
  position: absolute;
  top: 50%;
  right: 3%;
  transform: translateY(-50%);
  background-image: url(${CheckSVG});
`;