import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './layout/NavBar';
import Dashboard from './admin/dashboard';
import PackageDetails from './user/packageDetails';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/packages/:title" element={<PackageDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
