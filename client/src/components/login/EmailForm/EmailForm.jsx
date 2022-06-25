import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postUserLogin } from '../../../redux/services/UserService';
import EmailFormStyle from './EmailForm.style';
import { loginToggle } from '../../../redux/slice/toggleSlice';
import { DELETE_TOKEN } from '../../../redux/auth';

function EmailForm () {
  const state = useSelector((state) => state.user);
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
    dispatch(loginToggle());
  }

  const handleLoginSubmit = (evt) => {
    evt.preventDefault();

    let body = {
      userId,
      password: userPw,
    }
    
    dispatch(postUserLogin(body));
    dispatch(loginToggle());
    setTimeout(() => {
      dispatch(DELETE_TOKEN());
    }, 10000);
  }

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
