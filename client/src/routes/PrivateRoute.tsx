import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import Navbar from '../components/gnb/organisms/Navbar';

function PrivateRoute() {
  const { authenticated } = useAppSelector((state) => state.auth);
  return (
    <>
      <Navbar />
      {authenticated ? <Outlet /> : <Navigate to="/" />}
    </>
  );
}

export default PrivateRoute;
