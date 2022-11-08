import { useCallback } from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { getCheckEmail } from '../../../networks/signup/http';
import Input from '../../common/atoms/Input';
import ValidSpan from '../../common/atoms/ValidSpan';
import Label from '../../common/atoms/Label';
import { CheckBox, InputWrapper } from '../../../styles/SignupStyles';
import { UseFormSignupProps } from '../../../type/formTypes';

function SignupEmail ({ register, errors, valid, setValid}: UseFormSignupProps) {

  const handleCheckExistedEmail = useCallback(async (value: string) => {
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
      <Label
        fontSize='14px'
        margin='0 0 5px 3px'
        htmlFor='email'
      > 
        이메일
      </Label>
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
            checkExistsEmail: handleCheckExistedEmail,
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