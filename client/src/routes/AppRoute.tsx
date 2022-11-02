import { Routes, Route } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import PostInventoryPage from '../pages/PostInventoryPage';
import PostCreatePage from '../pages/PostCreatePage';

function AppRoute() {
  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/intro' element={<div>test</div>} />
      <Route path='/generation/:age' element={<PostInventoryPage />} />
      <Route path="/post/create" element={<PostCreatePage />} />
      <Route path='/my' element={<div>my</div>} />
    </Routes>
  );
}

export default AppRoute;
