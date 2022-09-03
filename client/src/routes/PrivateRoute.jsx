import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NavBar from '../components/common/NavBar/NavBar';

function PrivateRoute() {
  const { authenticated } = useSelector((state) => state.authToken);
  return (
    <>
      <NavBar />
      {authenticated ? <Outlet /> : <Navigate to='/' />}
    </>
  );
}

export default PrivateRoute;
