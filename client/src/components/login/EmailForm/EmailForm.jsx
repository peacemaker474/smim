import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { loginToggle } from '../../../redux/slice/toggleSlice';
import { postUserLogin } from '../../../redux/services/UserService';
import EmailFormStyle from './EmailForm.style';

function EmailForm () {
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      userId: "",
      password: "",
    }
  });
  const { isLogin, message } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin) {
      navigate('/');
    }
  }, [isLogin, navigate]);

  const handleLoginClose = useCallback(() => {
    dispatch(loginToggle());
  }, [dispatch]);

  const handleLoginSubmit = useCallback(({ userId, password }) => {
    let body = {
      userId,
      password
    };

    dispatch(postUserLogin(body))
      .then((res) => {
        if (res.payload.success) return dispatch(loginToggle());
      });
  }, [dispatch]);

  return (
    <EmailFormStyle
      register={register}
      message={message}
      errors={errors}
      onSubmit={handleSubmit}
      onLoginClose={handleLoginClose}
      onLoginSubmit={handleLoginSubmit}
    />
  );
}

export default React.memo(EmailForm);