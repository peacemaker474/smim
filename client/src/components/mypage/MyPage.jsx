import React from 'react';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import MyInfo from './MyInfo';
import MyProfile from './MyProfile';
import WriteLists from './MyProfile/WriteLists';
import FavoriteLists from './MyProfile/FavoriteLists';
import PwChange from './MyProfile/PwChange';

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  width: 85vw;
  height: 75vh;
  margin: 0 auto;
  margin-top: 15vh;
`;

function MyPage () {
  return (
    <Wrapper>
      <MyProfile />
      <Routes>
        <Route path="/" element={ <MyInfo /> } />
        <Route path="writeLists" element={ <WriteLists /> } />
        <Route path="favoriteLists" element={ <FavoriteLists /> } />
        <Route path="changepw" element={ <PwChange /> } />
      </Routes>
    </Wrapper>
  )
}

export default MyPage;