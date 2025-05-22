import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './layout/NavBar';
import PackageDetails from './user/packageDetails';
import Login from './components/loginForm';
import PrivateRoute from './admin/privateRoute';
import Footer from './layout/Footer';
import Home from './user/Home';
import Dashboard from './components/dashboard';
import Tours from './user/Tours';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/tours' element={<Tours />} />
        <Route path="/tours/:id" element={<PackageDetails />} />
        <Route path='/login' element={<Login />} />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
