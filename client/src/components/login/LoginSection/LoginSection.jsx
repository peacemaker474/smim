import React from 'react';
import { useDispatch } from 'react-redux';
import { loginToggle } from '../../../redux/slice/toggleSlice';
import LoginSectionStyle from './LoginSection.style';


function LoginSection() {
  const dispatch = useDispatch();
  const handleLoginClose = () => {
    dispatch(loginToggle());
  };

  return (
    <LoginSectionStyle 
      onLoginClose={handleLoginClose}
    />
  );
}

export default LoginSection;
