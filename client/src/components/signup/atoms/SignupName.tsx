import { ErrorMessage } from '@hookform/error-message';
import { useCallback } from 'react';
import styled from 'styled-components';
import { getCheckName } from '../../../networks/signup/http';
import Input from '../../common/atoms/Input';
import ValidSpan from '../../common/atoms/ValidSpan';
import { SignupProps } from '../types';
import CheckSVG from '../../../asset/icons/icon-check.svg';

function SignupName ({ register, errors, valid, setValid }: SignupProps) {
  const handleExistedName = useCallback(() => async (value: Record<string, any>) => {
    try {
      const { data } = await getCheckName(value);
      if (data.success) setValid({...valid, nickName: true});
      return data.success;
    } catch (err: any) {
      setValid({...valid, nickName: false});
      if (err) return `${err.response.data.message}`;
    }
  }, [valid, setValid]);


  return (
    <InputWrapper>
      <SignupTitle htmlFor='nickName'> 닉네임 </SignupTitle>
      <Input
        type='text'
        id='nickName'
        register={register}
        name='nickName'
        rules={{
          required: "닉네임을 입력하세요.",
          pattern: {
            value: /^[가-힣a-zA-Z0-9]{3,8}$/,
            message: "3~8 자리의 한글, 영문, 숫자만 가능합니다.",
          },
          validate: {
            checkExistedName: handleExistedName(),
          }
        }}
        width='100%'
        height='50%'
        border='2px solid #FFC306'
      />
      { valid.nickName ?
        <CheckBox /> :
        <ErrorMessage
          errors={errors}
          name='nickName'
          render={({ message }) => <ValidSpan padding='1em 0.2em 0 0'> {message} </ValidSpan>}
        /> }
    </InputWrapper>
  );
}

export default SignupName;

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