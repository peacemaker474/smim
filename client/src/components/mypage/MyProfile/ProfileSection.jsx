import React from 'react';
import styled from 'styled-components';
import ProfileHeader from './ProfileHeader';
import ProfileImg from './ProfileImg';

const ProfileBox = styled.div`
  width: 60%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  margin: 0 auto;
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