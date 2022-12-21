import { ErrorMessage } from '@hookform/error-message';
import { useCallback } from 'react';
import Input from '../../common/atoms/Input';
import ValidSpan from '../../common/atoms/ValidSpan';
import Label from '../../common/atoms/Label';
import { CheckBox, InputWrapper } from '../../../styles/SignupStyles';
import { SignupPasswordProps } from '../../../type/formTypes';

function SignupPw ({ register, errors, valid, setValid, getValues }: SignupPasswordProps) {
  
  const handleCheckPwBlur = useCallback((value: string) => {
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
        <Label
          fontSize='14px'
          margin='0 0 5px 3px'
          htmlFor='password'
        > 
          비밀번호
        </Label>
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
        <Label
          fontSize='14px'
          margin='0 0 5px 3px'
          htmlFor='check'
        > 
          비밀번호 재확인
        </Label>
        <Input
          type="password"
          id="check"
          name='check'
          register={register}
          rules={{
            required: "비밀번호를 입력하세요.",
            validate: {
              matchesPreviousPassword: handleCheckPwBlur,
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

