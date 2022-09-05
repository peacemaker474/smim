import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { putChangePassWord } from '../../../network/mypage/http';
import { getUserLogOut } from '../../../redux/services/UserService';
import { DELETE_TOKEN } from '../../../redux/auth';
import PasswordChangeStyle from './PasswordChange.style';

function PasswordChange () {
  const { id } = useSelector((state) => state.user);
  const { accessToken } = useSelector((state) => state.authToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, getValues, formState: {errors} } = useForm({
    mode: 'onBlur',
    defaultValues: {
      userId: id,
      oldPassword: '',
      newPassword: '',
      newPassword2: '',
    }
  })

  const handleCheckNewPwBlur = () => (value) => {
    const { newPassword } = getValues();
    return newPassword === value || "새로운 비밀번호가 서로 다릅니다."
  }

  const handlePwSubmit = async (body) => {
    try {
      const { data } = await putChangePassWord(body, accessToken);
      if (data.success) {
        alert(data.message);
        dispatch(getUserLogOut());
        dispatch(DELETE_TOKEN());
      }
    } catch (err) {
      if (err) alert(err.response.data.message);
    }
  };

  const handleCancelClick = useCallback(() => {
    navigate("/my");
  }, [navigate]);

  return (
    <PasswordChangeStyle
      register={register}
      errors={errors}
      onSubmit={handleSubmit}
      onCheckNewPwBlur={handleCheckNewPwBlur}
      onPwSubmit={handlePwSubmit}
      onCancelClick={handleCancelClick}
    />
  );
}

export default PasswordChange;
