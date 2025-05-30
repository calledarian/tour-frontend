import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './layout/NavBar';
import PackageDetails from './user/packageDetails';
import Login from './components/loginForm';
import PrivateRoute from './utils/privateRoute';
import Footer from './layout/Footer';
import Home from './user/Home';
import Dashboard from './components/dashboard';
import Tours from './user/Tours';
import ScrollToTop from './utils/scrollToTop';
import { PackagesProvider } from './utils/packageContext';
import { PackageDetailsProvider } from './utils/packageDetailsContext';

function App() {
  return (
    <PackagesProvider>
      <PackageDetailsProvider>
        <Router>
          <ScrollToTop />
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
      </PackageDetailsProvider>
    </PackagesProvider>
  );
}

export default App;
