import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoutes';
import PostUploadPage from '../pages/PostUploadPage';
import Intro from '../pages/Intro';
import SignupPage from '../pages/SignupPage';
import MainPage from '../pages/MainPage';
import PostsPage from '../pages/PostsPage';
import PostViewPage from '../pages/PostViewPage';
import LoadingPage from '../pages/LoadingPage';
import MyPage from '../pages/MyPage';
import NotFound from '../pages/NotFound';

function CheckRoute() {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path='/post/create' element={<PostUploadPage />} />
        <Route path='/post/edit/:id' element={<PostUploadPage />} />
        <Route path='/my/*' element={<MyPage />} />
      </Route>
      <Route path='/intro' element={<Intro />} />
      <Route path='/signup' element={<SignupPage />} />
      <Route path='/' element={<MainPage />} />
      <Route path='/generation' element={<PostsPage />} />
      <Route path='/post/view/:id' element={<PostViewPage />} />
      <Route path='/loading' element={<LoadingPage />} />
      <Route path='/*' element={<NotFound />} />
    </Routes>
  );
}
export default CheckRoute;
