import React from 'react';
import { useDispatch } from 'react-redux';
import { loginClose } from '../../../redux/toggle/action';
import LoginSectionStyle from './LoginSection.style';


function LoginSection() {
  const dispatch = useDispatch();
  const handleLoginClose = () => {
    dispatch(loginClose());
  };

  return (
    <LoginSectionStyle 
      onLoginClose={handleLoginClose}
    />
  );
}

export default LoginSection;
