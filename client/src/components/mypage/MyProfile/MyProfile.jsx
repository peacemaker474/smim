import React from 'react';
import MyProfileStyle from './MyProfile.style';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

function MyProfile () {
  const { social } = useSelector((state) => state.user);
  const { pathname } = useLocation(null);

  return (
    <MyProfileStyle 
      social={social}
      pathname={pathname}
    />
  );
}

export default MyProfile;
