import { useForm } from 'react-hook-form';
import { shallowEqual } from 'react-redux';
import styled from 'styled-components';
import { useAppSelector } from '../../../redux/hooks';
import Label from '../../common/atoms/Label';
import ValidSpan from '../../common/atoms/ValidSpan';
import Input from '../atoms/Input';

interface FormValue {
  userId: string;
  password: string;
}

function LoginForm () {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValue>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });
  const { success, message } = useAppSelector(
    state => ({
      success: state.user.success,
      message: state.user.message,
    }),
    shallowEqual
  );

  return (
    <FormBox>
      <InputWrapper>
        <Label> 아이디 </Label>
        <Input
          register={register}
          name='userId'
          rules={{
            required: '아이디를 입력하세요',
            pattern : {
              value: /^[a-zA-Z0-9]{4,12}$/,
              message: '4~12자리의 영문, 숫자만 가능합니다.'
            }
          }}
          type='text'
          placeholder='아이디를 입력하세요.'
        />
        {errors.userId && <ValidSpan padding='0.6em 0.3em 0 0'> {errors.userId?.message} </ValidSpan>}
      </InputWrapper>
      <InputWrapper>
        <Label> 비밀번호 </Label>
        <Input
          register={register}
          name='password'
          rules={{
            required: '비밀번호를 입력하세요.',
            pattern : {
              value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/,
              message: '8~16자, 최소 하나의 숫자와 특수문자가 필요합니다.'
            }
          }}
          type='password'
          placeholder='비밀번호를 입력하세요.'
          autoComplete='off'
        />
        {errors.password && <ValidSpan padding='0.6em 0.3em 0 0'> {errors.password?.message} </ValidSpan>}
        {Object.keys(errors).length === 0 && message && <ValidSpan padding='0.6em 0.3em 0 0'> {message} </ValidSpan>}
      </InputWrapper>
    </FormBox>
  );
}

export default LoginForm;

const FormBox = styled.form`
  width: 90%;
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding-top: 1.2em;
  margin: 0 auto;
  gap: 5px;
`;

const InputWrapper = styled.div`
  width: 95%;
  height: 30%;
  display: flex;
  flex-direction: column;
`;