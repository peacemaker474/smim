import { Outlet } from 'react-router-dom';
import Navbar from '../components/gnb/organisms/Navbar';

function PublicRoute () {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default PublicRoute;