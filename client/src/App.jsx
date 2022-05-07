import React from 'react';
import { useSelector } from 'react-redux';
import PublicRoute from './routes/PublicRoute';
import NavBar from './components/common/NavBar';
import WriteBtn from './components/common/WriteBtn';
import PrivateRoute from './routes/PrivateRoute';

function App() {
  const user = useSelector((state) => state.loginReducer);

  return (
    <>
      <NavBar />
      {user.isLogin && <WriteBtn />}
      {user.isLogin ? 
        <PublicRoute /> :
        <PrivateRoute />
      }
    </>
  );
}

export default App;
