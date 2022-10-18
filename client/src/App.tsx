import NavLists from './components/common/molecules/NavLists';
import LoginSection from './components/login/LoginSection';
import { useAppSelector } from './redux/hooks';
import AppRoute from './routes/AppRoute';

function App () {
  const { loginToggled } = useAppSelector(state => state.toggle);

  return (
    <>
      <NavLists />
      {loginToggled && <LoginSection />}
      <AppRoute />
    </>
  );
}

export default App;
