import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { loginToggle } from '../../../redux/slice/toggleSlice';
import { postUserLogin } from '../../../redux/services/UserService';
import EmailFormStyle from './EmailForm.style';

function EmailForm () {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const state = useSelector((state) => state.user);
  const { isLogin, message } = state;
  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    if (isLogin) {
      navigate('/');
    }
  }, [isLogin, navigate]);

  const handleLoginClose = () => {
    dispatch(loginToggle());
  }

  const handleLoginSubmit = ({ userId, password }) => {
    let body = {
      userId,
      password
    };

    dispatch(postUserLogin(body))
      .then((res) => {
        if (res.payload.success) return dispatch(loginToggle());
      });
  }

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

export default EmailForm;