import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
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
  const { success, message } = useSelector(
    state => ({
        success: state.user.success,
        message: state.user.message,
    }),
      shallowEqual
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      navigate('/');
    }
  }, [success, navigate]);

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