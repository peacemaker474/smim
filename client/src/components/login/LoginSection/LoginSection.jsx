import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { loginToggle } from '../../../redux/slice/toggleSlice';
import LoginSectionStyle from './LoginSection.style';


function LoginSection() {
  const dispatch = useDispatch();
  const handleLoginClose = useCallback(() => {
    dispatch(loginToggle());
  }, [dispatch]);

  return (
    <LoginSectionStyle 
      onLoginClose={handleLoginClose}
    />
  );
}

export default LoginSection;
