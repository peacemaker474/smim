import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Intro from './pages/Intro';
import MainPage from './pages/MainPage';
import SignupPage from './pages/SignupPage';
import PostsPage from './pages/PostsPage';
import PostViewPage from './pages/PostViewPage';
import PostUploadPage from './pages/PostUploadPage';
import MyPage from './pages/MyPage';
import LoadingPage from './pages/LoadingPage';
import NotFound from './pages/NotFound';
import NavBar from './components/common/NavBar';
import WriteBtn from './components/common/WriteBtn';

function App({ loginId }) {
  return (
    <>
      <NavBar />
      <WriteBtn />
      <Routes>
        <Route path='/intro' element={<Intro loginId={loginId} />} />
        <Route path='/signup' element={<SignupPage loginId={loginId} />} />
        <Route path='/' element={<MainPage loginId={loginId} />} />
        <Route path='/generation' element={<PostsPage loginId={loginId} />} />
        <Route path='/posts/view/:id' element={<PostViewPage loginId={loginId} />} />
        <Route path='/posts/create' element={<PostUploadPage loginId={loginId} />} />
        <Route path='/posts/edit/:id' element={<PostUploadPage loginId={loginId} />} />
        <Route path='/my/*' element={<MyPage loginId={loginId} />} />
        <Route path='/loading' element={<LoadingPage loginId={loginId} />} />
        <Route path='/notfound' element={<NotFound loginId={loginId} />} />
      </Routes>
    </>
  );
}

export default App;
