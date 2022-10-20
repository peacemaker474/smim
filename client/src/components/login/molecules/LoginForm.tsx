import { useForm } from 'react-hook-form';
import { shallowEqual } from 'react-redux';
import styled from 'styled-components';
import { useAppSelector } from '../../../redux/hooks';
import Label from '../../common/atoms/Label';
import Input from '../atoms/Input';

function LoginForm () {
  const { register, handleSubmit, formState: { errors } } = useForm({
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
          required='아이디를 입력하세요'
          pattern={{
            value: /^[a-zA-Z0-9]{4,12}$/,
            message: "4~12자리의 영문, 숫자만 가능합니다."
          }}
          type='text'
          placeholder='아이디를 입력하세요.'
        />
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