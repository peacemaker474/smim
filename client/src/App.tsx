import Navbar from './components/common/organisms/Navbar';
import LoginSection from './components/login/LoginSection';
import { useAppSelector } from './redux/hooks';
import AppRoute from './routes/AppRoute';

function App () {
  const { loginToggled } = useAppSelector(state => state.toggle);

  return (
    <>
      <Navbar />
      {loginToggled && <LoginSection />}
      <AppRoute />
    </>
  );
}

export default App;
