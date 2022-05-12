import React from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import MyInfo from './MyInfo';
import MyProfile from './MyProfile';
import WriteLists from './MyProfile/WriteLists';
import FavoriteLists from './MyProfile/FavoriteLists';
import PwChange from './MyProfile/PwChange';
import { useSelector } from 'react-redux';

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  width: 85vw;
  height: 75vh;
  margin: 0 auto;
  margin-top: 15vh;
`;

function MyPage () {
  const user = useSelector((state) => state.loginReducer);

  return (
    <Wrapper>
      <MyProfile />
      <Routes>
        <Route path="/" element={ <MyInfo /> } />
        <Route path="writeLists" element={ <WriteLists userId={user.id}/> } />
        <Route path="favoriteLists" element={ <FavoriteLists userId={user.id}/> } />
        <Route path="changepw" element={ <PwChange /> } />
      </Routes>
    </Wrapper>
  )
}

export default MyPage;