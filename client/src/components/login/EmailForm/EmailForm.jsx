import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginClose } from '../../../redux/toggle/action';
import { loginUser } from '../../../redux/login/action';
import EmailFormStyle from './EmailForm.style';

function EmailForm() {
  const state = useSelector((state) => state.login);
  const { isLogin, message } = state;
  const [userId, setUserId] = useState('');
  const [userPw, setUserPw] = useState('');
  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    if (isLogin) {
      navigate('/');
    }
  }, [isLogin, navigate]);

  const handleIdChange = (evt) => {
    setUserId(evt.target.value);
  };

  const handlePwChange = (evt) => {
    setUserPw(evt.target.value);
  };

  const handleLoginClose = () => {
    dispatch(loginClose());
  };

  const handleLoginSubmit = (evt) => {
    evt.preventDefault();

    let body = {
      userId,
      password: userPw,
    };
    dispatch(loginUser(body));
  };

  return (
    <EmailFormStyle
      message={message}
      onIdChange={handleIdChange}
      onPwChange={handlePwChange}
      onLoginClose={handleLoginClose}
      onLoginSubmit={handleLoginSubmit}
    />
  );
}

export default EmailForm;
