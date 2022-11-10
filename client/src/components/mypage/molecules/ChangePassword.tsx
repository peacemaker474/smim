import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { putChangePassWord } from '../../../networks/mypage/http';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { getUserLogOut } from '../../../redux/services/UserService';
import { DELETE_TOKEN } from '../../../redux/slice/authSlice';
import Button from '../../common/atoms/Button';
import CheckNewPassword from '../atoms/CheckNewPassword';
import NewPassword from '../atoms/NewPassword';
import PastPassword from '../atoms/PastPassword';

interface UpdatePasswordData {
  userId: string;
  oldPassword: string;
  newPassword: string;
  newPassword2: string;
  accessToken: string | null;
}

function ChangePassword () {
  const { id } = useAppSelector((state) => state.user);
  const { accessToken } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { register, handleSubmit, getValues, formState: { errors } } = useForm({
    mode: 'onBlur',
    defaultValues: {
      userId: id,
      oldPassword: '',
      newPassword: '',
      newPassword2: '',
      accessToken,
    }
  })

  const handleChangePwSubmit = async (body: UpdatePasswordData) => {
    try {
      const { data } = await putChangePassWord(body);
      if (data.success) {
        alert(data.message);
        dispatch(getUserLogOut());
        dispatch(DELETE_TOKEN());
      }
    } catch (err: any) {
      if (err) alert(err.response.data.message);
    }
  }

  const handleCheckNewPwBlur = (value: string) => {
    const { newPassword } = getValues();
    return newPassword === value || "새로운 비밀번호가 서로 다릅니다."
  }

  const handleCancelClick = () => {
    navigate('/my');
  }

  return (
    <PasswordFrom onSubmit={handleSubmit(handleChangePwSubmit)}>
      <PasswordTitle> 비밀번호 변경 </PasswordTitle>
      <PasswordBox>
        <PastPassword
          register={register}
          errors={errors}
        />
        <NewPassword
          register={register}
          errors={errors}
        />
        <CheckNewPassword
          register={register}
          errors={errors}
          handleCheckNewPwBlur={handleCheckNewPwBlur}
        />
      </PasswordBox>
      <Button 
        width='70%' 
        height='50px'
        border='1px solid #FFC306'
      > 
        확인
      </Button>
      <Button 
        width='70%'
        height='50px'
        border='1px solid #FFC306'
        onClick={handleCancelClick}
      >
        취소
      </Button>
    </PasswordFrom>
  );
}

export default ChangePassword;

const PasswordFrom = styled.form`
  width: 70%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  @media screen and (max-width: 1180px) {
    width: 90%;
    height: 80%;
  }
  @media screen and (max-width: 769px) {
    height: 50%;
  }
  @media screen and (max-width: 375px) {
    width: 100%;
  }
  @media screen and (max-height: 796px) {
    height: 80%;
  }
`;

const PasswordTitle = styled.h2`
  width: 70%;
  height: 30px;
  line-height: 30px;
  font-size: 1.5em;
  font-weight: bold;
`;

const PasswordBox = styled.div`
  width: 70%;
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;