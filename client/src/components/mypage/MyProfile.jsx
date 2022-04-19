import React from 'react';
import styled from 'styled-components';
import ProfileLists from './MyProfile/ProfileLists';
import ProfileSection from './MyProfile/ProfileSection';

const Wrapper = styled.div`
  width: 30%;
  height: 90%;
`;

function MyProfile () {
  return (
    <Wrapper>
      <ProfileSection />
      <ProfileLists />
    </Wrapper>
  )
}

export default MyProfile;