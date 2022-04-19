import React from 'react';
import styled from 'styled-components';
import ProfileHeader from './ProfileHeader';
import ProfileImg from './ProfileImg';

const ProfileBox = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

function ProfileSection () {
  return (
    <ProfileBox>
      <ProfileImg />
      <ProfileHeader />
    </ProfileBox>
  );
}

export default ProfileSection;