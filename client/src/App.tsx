import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Auth from './components/common/molecules/Auth';
import Navbar from './components/gnb/organisms/Navbar';
import useLocalStorage from './hooks/useLocalStorage';
import LoginPage from './pages/LoginPage';
import { useAppSelector } from './redux/hooks';
import AppRoute from './routes/AppRoute';

function App () {
  const { loginToggled } = useAppSelector(state => state.toggle);
  const [entry, _] = useLocalStorage('entry', false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!entry) {
      navigate('/intro');
    }
  }, [entry, navigate])

  return (
    <>
      {entry && <Navbar />}
      <Auth />
      {loginToggled && <LoginPage />}
      <AppRoute />
    </>
  );
}

export default App;
