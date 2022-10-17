import { Routes, Route } from 'react-router-dom';

function AppRoute () {
  return (
    <Routes>
      <Route path='/intro' element={<div>test</div>} />
    </Routes>
  );
}

export default AppRoute;