import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';

function PrivateRoute () {
  const { authenticated } = useAppSelector((state) => state.auth);
  return (
    authenticated ? <Outlet /> : <Navigate to='/' />
  );
}

export default PrivateRoute;