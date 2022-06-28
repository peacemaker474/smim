import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Intro from '../pages/Intro';
import MainPage from '../pages/MainPage';
import SignupPage from '../pages/SignupPage';
import PostsPage from '../pages/PostsPage';
import PostViewPage from '../pages/PostViewPage';
import LoadingPage from '../pages/LoadingPage';
import NotFound from '../pages/NotFound';

function PublicRoute () {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (
      (
        pathname !== '/posts' ||
        pathname !== '/my'
      )
    ) {
      navigate('/');
    }
  }, [pathname, navigate]);

  return (
    <Routes>
      <Route path='/intro' element={<Intro/>} />
      <Route path='/signup' element={<SignupPage/>} />
      <Route path='/' element={<MainPage/>} />
      <Route path='/generation' element={<PostsPage/>} />
      <Route path='/posts/view/:id' element={<PostViewPage/>} />
      <Route path='/loading' element={<LoadingPage/>} />
      <Route path='/notfound' element={<NotFound/>} />
    </Routes>
  )
}

export default PublicRoute;