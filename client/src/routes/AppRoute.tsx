import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import MainPage from '../pages/MainPage';
import PostInventoryPage from '../pages/PostInventoryPage';
import PostCreatePage from '../pages/PostCreatePage';
import SignupPage from '../pages/SignupPage';
import PostDetailPage from '../pages/PostDetailPage';
import MyPageRoute from './MyPageRoute';
import IntroPage from '../pages/IntroPage';
import NotFoundPage from '../pages/NotFoundPage';
import PostLoadingPage from '../pages/PostLoadingPage';

function AppRoute() {
  return (
    <Routes>
      <Route path="/intro" element={<IntroPage />} />
      <Route element={<PublicRoute />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/generation/:age" element={<PostInventoryPage />} />
        <Route path="/post/view/:id" element={<PostDetailPage />} />
        <Route path="/post/*" element={<NotFoundPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path="/post/create" element={<PostCreatePage />} />
        <Route path="/post/edit/:id" element={<PostCreatePage />} />
        <Route path="/post/Loading" element={<PostLoadingPage />} />
        <Route path="/my/*" element={<MyPageRoute />} />
      </Route>
    </Routes>
  );
}

export default AppRoute;
