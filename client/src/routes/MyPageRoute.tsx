import { Route, Routes } from 'react-router-dom';
import MyInfo from '../components/mypage/molecules/MyInfo';
import MyPage from '../pages/MyPage';

function MyPageRoute () {
  return (
    <Routes>
      <Route element={<MyPage />}>
        <Route path='/' element={<MyInfo />} />
      </Route>
    </Routes>
  );
}

export default MyPageRoute;