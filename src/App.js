import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './layout/NavBar';
import Dashboard from './admin/dashboard';
import PackageDetails from './user/packageDetails';
import Login from './admin/login';
import PrivateRoute from './admin/privateRoute';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
        <Route path="/packages/:title" element={<PackageDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
