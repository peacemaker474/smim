import Auth from './components/common/molecules/Auth';
import Navbar from './components/gnb/organisms/Navbar';
import LoginPage from './pages/LoginPage';
import { useAppSelector } from './redux/hooks';
import AppRoute from './routes/AppRoute';

function App () {
  const { loginToggled } = useAppSelector(state => state.toggle);

  return (
    <>
      <Navbar />
      <Auth />
      {loginToggled && <LoginPage />}
      <AppRoute />
    </>
  );
}

export default App;
