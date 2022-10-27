import { Routes, Route } from 'react-router-dom';
import PostInventoryPage from '../pages/PostInventoryPage';

function AppRoute() {
  return (
    <Routes>
      <Route path="/intro" element={<div>test</div>} />
      <Route path="/generation/:age" element={<PostInventoryPage />} />
      <Route path='/my' element={<div>my</div>} />
    </Routes>
  );
}

export default AppRoute;
