import { Route, Routes } from 'react-router-dom';
import BookMarkLists from '../components/mypage/molecules/BookMarkLists';
import ChangePassword from '../components/mypage/molecules/ChangePassword';
import MyInfo from '../components/mypage/molecules/MyInfo';
import MyWriteLists from '../components/mypage/molecules/MyWriteLists';
import MyPage from '../pages/MyPage';

function MyPageRoute () {
  return (
    <Routes>
      <Route element={<MyPage />}>
        <Route path='/' element={<MyInfo />} />
        <Route path='writeLists' element={<MyWriteLists />} />
        <Route path='bookMarkLists' element={<BookMarkLists />} />
        <Route path='changepw' element={<ChangePassword />} />
      </Route>
    </Routes>
  );
}

export default MyPageRoute;