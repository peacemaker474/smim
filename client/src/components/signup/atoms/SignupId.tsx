import { ErrorMessage } from '@hookform/error-message';
import { useCallback } from 'react';
import styled from 'styled-components';
import CheckSVG from '../../../asset/icons/icon-check.svg';
import { getCheckId } from '../../../networks/signup/http';
import Input from '../../common/atoms/Input';
import ValidSpan from '../../common/atoms/ValidSpan';
import { SignupProps } from '../types';

function SignupId ({ register, errors, valid, setValid }: SignupProps) {
  
  const handleExistedId = useCallback(() => async (value: Record<string, any>) => {
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
      <SignupTitle htmlFor='userId'> 아이디 </SignupTitle>
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
            checkExistsId: handleExistedId(),
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