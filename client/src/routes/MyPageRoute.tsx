import { Route, Routes } from 'react-router-dom';
import ChangePassword from '../components/mypage/molecules/ChangePassword';
import MyInfo from '../components/mypage/molecules/MyInfo';
import MyPage from '../pages/MyPage';

function MyPageRoute () {
  return (
    <Routes>
      <Route element={<MyPage />}>
        <Route path='/' element={<MyInfo />} />
        <Route path='changepw' element={<ChangePassword />} />
      </Route>
    </Routes>
  );
}

export default MyPageRoute;