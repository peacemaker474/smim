import React from 'react';
import { useSelector } from 'react-redux';
import { ReactQueryDevtools } from 'react-query/devtools';
import AppRoute from './routes/AppRoute';
import LoginSection from './components/login/LoginSection/LoginSection';
import Auth from './components/common/Auth/Auth';

function App() {
  const { loginToggled } = useSelector((state) => state.toggle);
  return (
    <>
      <Auth />
      {loginToggled && <LoginSection />}
      <AppRoute />
      <ReactQueryDevtools initialIsOpen={true} />
    </>
  );
}

export default App;
