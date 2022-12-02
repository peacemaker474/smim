import { Routes, Route } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import PostInventoryPage from '../pages/PostInventoryPage';
import PostCreatePage from '../pages/PostCreatePage';
import SignupPage from '../pages/SignupPage';
import PostDetailPage from '../pages/PostDetailPage';
import MyPageRoute from './MyPageRoute';
import PrivateRoute from './PrivateRoute';
import IntroPage from '../pages/IntroPage';
import PublicRoute from './PublicRoute';

function AppRoute() {
  return (
    <Routes>
      <Route path='/intro' element={<IntroPage />} />
      <Route element={ <PublicRoute />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/generation/:age" element={<PostInventoryPage />} />
        <Route path="/post/view/:id" element={<PostDetailPage />} />
      </Route>
      <Route element={ <PrivateRoute /> }>
        <Route path="/post/create" element={<PostCreatePage />} />
        <Route path="/post/edit/:id" element={<PostCreatePage />} />
        <Route path="/my/*" element={<MyPageRoute />} />
      </Route>
    </Routes>
  );
}

export default AppRoute;
