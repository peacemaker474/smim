import { Routes, Route } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import PostInventoryPage from '../pages/PostInventoryPage';

function AppRoute() {
  return (
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/intro' element={<div>test</div>} />
      <Route path='/generation/:age' element={<PostInventoryPage />} />
      <Route path='/my' element={<div>my</div>} />
    </Routes>
  );
}

export default AppRoute;
