import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import PostUploadPage from '../pages/PostUploadPage';
import Intro from '../pages/Intro';
import SignupPage from '../pages/SignupPage';
import MainPage from '../pages/MainPage';
import PostsPage from '../pages/PostsPage';
import PostViewPage from '../pages/PostViewPage';
import LoadingPage from '../pages/LoadingPage';
import MyPageRoute from './MyPageRoute';
import NotFound from '../pages/NotFound';

function AppRoute() {
  return (
    <Routes>
      <Route path='/intro' element={<Intro />} />
      <Route element={<PrivateRoute />}>
        <Route path='/post/create' element={<PostUploadPage />} />
        <Route path='/post/edit/:id' element={<PostUploadPage />} />
        <Route path='/my/*' element={<MyPageRoute />} />
      </Route>
      <Route element={<PublicRoute />}>
        <Route path='/' element={<MainPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/generation/:age' element={<PostsPage />} />
        <Route path='/post/view/:id' element={<PostViewPage />} />
        <Route path='/post/*' element={<NotFound />} />
        <Route path='/loading' element={<LoadingPage />} />
        <Route path='/*' element={<NotFound />} />
      </Route>
    </Routes>
  );
}
export default AppRoute;
