import { ErrorMessage } from '@hookform/error-message';
import { useCallback } from 'react';
import { getCheckId } from '../../../networks/signup/http';
import { CheckBox, InputWrapper } from '../../../styles/SignupStyles';
import { UseFormSignupProps } from '../../../type/formTypes';
import Input from '../../common/atoms/Input';
import Label from '../../common/atoms/Label';
import ValidSpan from '../../common/atoms/ValidSpan';

function SignupId ({ register, errors, valid, setValid }: UseFormSignupProps) {
  
  const handleExistedId = useCallback(async (value: string) => {
    try {
      const { data } = await getCheckId(value);
      if (data.success) setValid({...valid, userId: true});
      return data.success;
    } catch (err: any) {
      setValid({...valid, userId: false});
      if (err) return `${err.response.data.message}`;
    }
  }, [valid, setValid]);
  
  return (
    <InputWrapper>
      <Label
        fontSize='14px'
        margin='0 0 5px 3px'
        htmlFor='userId'
      > 
        아이디
      </Label>
      <Input
        type='text'
        id='userId'
        register={register}
        name='userId'
        rules={{
          required: "아이디를 입력하세요",
          pattern: {
            value: /^[a-zA-Z0-9]{4,12}$/,
            message: "4~12자리의 영문, 숫자만 가능합니다."
          },
          validate: {
            checkExistsId: handleExistedId,
          }
        }}
        width='100%'
        height='50%'
        border='2px solid #FFC306'
      />
      { valid.userId ?
        <CheckBox /> :
        <ErrorMessage
          errors={errors}
          name="userId"
          render={({ message }) => <ValidSpan padding='1em 0.2em 0 0'> {message} </ValidSpan>}
        /> }
    </InputWrapper>
  );
}

export default SignupId;