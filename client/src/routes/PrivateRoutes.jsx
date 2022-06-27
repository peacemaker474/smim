import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Intro from '../pages/Intro';
import MainPage from '../pages/MainPage';
import SignupPage from '../pages/SignupPage';
import PostsPage from '../pages/PostsPage';
import PostViewPage from '../pages/PostViewPage';
import PostUploadPage from '../pages/PostUploadPage';
import MyPage from '../pages/MyPage';
import LoadingPage from '../pages/LoadingPage';
import NotFound from '../pages/NotFound';

function PrivateRoute () {
  return (
    <Routes>
      <Route path='/intro' element={<Intro/>} />
      <Route path='/signup' element={<SignupPage/>} />
      <Route path='/' element={<MainPage/>} />
      <Route path='/generation' element={<PostsPage/>} />
      <Route path='/posts/view/:id' element={<PostViewPage/>} />
      <Route path='/posts/create' element={<PostUploadPage/>} />
      <Route path='/posts/edit/:id' element={<PostUploadPage/>} />
      <Route path='/my/*' element={<MyPage/>} />
      <Route path='/loading' element={<LoadingPage/>} />
      <Route path='/notfound' element={<NotFound/>} />
    </Routes>
  )
}

export default PrivateRoute;