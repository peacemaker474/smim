import { ErrorMessage } from '@hookform/error-message';
import { useCallback } from 'react';
import styled from 'styled-components';
import Input from '../../common/atoms/Input';
import ValidSpan from '../../common/atoms/ValidSpan';
import CheckSVG from '../../../asset/icons/icon-check.svg';
import { PasswordProps } from '../types';

function SignupPw ({ register, errors, valid, setValid, getValues }: PasswordProps) {
  const handleCheckPwBlur = useCallback(() => (value: string) => {
    const { password } = getValues();
    if (password !== value) {
      setValid({...valid, check: false});
      return "비밀번호가 일치하지 않습니다.";
    }
    setValid({...valid, check: true});
    return true;
  }, [valid, setValid, getValues]);

  return (
    <>
      <InputWrapper>
        <SignupTitle htmlFor="password"> 비밀번호 </SignupTitle>
        <Input
          type="password"
          id="password"
          register={register}
          name='password'
          rules={{
            required: "비밀번호를 입력하세요.",
            pattern: {
              value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/,
              message: "8~16자, 최소 하나의 숫자와 특수문자가 필요합니다.",
            },
          }}
          width='100%'
          height='50%'
          border='2px solid #FFC306'
        />
        { errors.password &&
            <ErrorMessage
              errors={errors}
              name="password"
              render={({ message }) => <ValidSpan padding='1em 0.2em 0 0'> {message} </ValidSpan>}
            />
        }
      </InputWrapper>
      <InputWrapper>
        <SignupTitle htmlFor="check"> 비밀번호 재확인 </SignupTitle>
        <Input
          type="password"
          id="check"
          name='check'
          register={register}
          rules={{
            required: "비밀번호를 입력하세요.",
            validate: {
              matchesPreviousPassword: handleCheckPwBlur(),
            },
          }}
          width='100%'
          height='50%'
          border='2px solid #FFC306'
        />
        {
          valid.check ?
            <CheckBox /> :
            <ErrorMessage
              errors={errors}
              name="check"
              render={({ message }) => <ValidSpan padding='1em 0.2em 0 0'> {message} </ValidSpan>}
            />
        }
      </InputWrapper>
    </>
  );
}

export default SignupPw;

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

