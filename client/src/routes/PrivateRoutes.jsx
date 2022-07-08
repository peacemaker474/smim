import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRoute() {
  const { authenticated } = useSelector((state) => state.authToken);
  return authenticated ? <Outlet /> : <Navigate to='/' />;
}

export default PrivateRoute;
