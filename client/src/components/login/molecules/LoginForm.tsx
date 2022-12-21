import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAppDispatch, useAppSelectorTyped } from '../../../redux/hooks';
import { postUserLogin } from '../../../redux/services/UserService';
import { loginToggle } from '../../../redux/slice/toggleSlice';
import Button from '../../common/atoms/Button';
import Input from '../../common/atoms/Input';
import Label from '../../common/atoms/Label';
import ValidSpan from '../../common/atoms/ValidSpan';

interface FormValue {
  userId: string;
  password: string;
}

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValue>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });
  const { success, message } = useAppSelectorTyped((state) => ({
    success: state.user.success,
    message: state.user.message,
  }));

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (success) {
      navigate('/');
    }
  }, [navigate, success]);

  const handleLoginSubmit = ({ userId, password }: FormValue) => {
    const body = {
      userId,
      password,
    };

    dispatch(postUserLogin(body)).then((res) => {
      if (res.payload?.success) dispatch(loginToggle());
    });
  };

  return (
    <FormBox onSubmit={handleSubmit(handleLoginSubmit)}>
      <InputWrapper>
        <Label margin="0 0 10px 0" fontSize="0.9rem">
          아이디
        </Label>
        <Input
          width="100%"
          height="40%"
          border="1px solid rgba(12, 12, 12, .4)"
          register={register}
          name="userId"
          rules={{
            required: '아이디를 입력하세요',
            pattern: {
              value: /^[a-zA-Z0-9]{4,12}$/,
              message: '4~12자리의 영문, 숫자만 가능합니다.',
            },
          }}
          type="text"
          placeholder="아이디를 입력하세요."
        />
        {errors.userId && <ValidSpan padding="1em 0.3em 0 0"> {errors.userId?.message} </ValidSpan>}
      </InputWrapper>
      <InputWrapper>
        <Label margin="0 0 10px 0" fontSize="0.9rem">
          비밀번호
        </Label>
        <Input
          width="100%"
          height="40%"
          border="1px solid rgba(12, 12, 12, .4)"
          register={register}
          name="password"
          rules={{
            required: '비밀번호를 입력하세요.',
            pattern: {
              value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/,
              message: '8~16자, 최소 하나의 숫자와 특수문자가 필요합니다.',
            },
          }}
          type="password"
          placeholder="비밀번호를 입력하세요."
          autoComplete="off"
        />
        {errors.password && <ValidSpan padding="1em 0.3em 0 0"> {errors.password?.message} </ValidSpan>}
        {!Object.keys(errors).length && message && <ValidSpan padding="1em 0.3em 0 0"> {message} </ValidSpan>}
      </InputWrapper>
      <Button width="95%" height="15%" border="none">
        로그인
      </Button>
    </FormBox>
  );
}

export default LoginForm;

const FormBox = styled.form`
  width: 90%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  margin: 0 auto;
  gap: 5px;
`;

const InputWrapper = styled.div`
  width: 95%;
  height: 35%;
  display: flex;
  flex-direction: column;

  @media ${({ theme }) => theme.device.mobileMiddle} {
    span {
      font-size: 0.6rem;
    }
  }

  @media screen and (max-width: 400px) {
    span {
      font-size: 0.45rem;
    }
  }
`;
