import Navbar from './components/common/organisms/Navbar';
import LoginPage from './pages/LoginPage';
import { useAppSelector } from './redux/hooks';
import AppRoute from './routes/AppRoute';

function App () {
  const { loginToggled } = useAppSelector(state => state.toggle);

  return (
    <>
      <Navbar />
      {loginToggled && <LoginPage />}
      <AppRoute />
    </>
  );
}

export default App;
