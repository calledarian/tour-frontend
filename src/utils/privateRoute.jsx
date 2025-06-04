import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_URL;


const PrivateRoute = ({ children }) => {
    const [isAuth, setIsAuth] = useState(null); // null = loading

    useEffect(() => {
  console.log("Checking auth...");
  fetch(`${apiUrl}/auth/me`, {
    method: 'GET',
    credentials: 'include',
  })
    .then(res => {
      console.log("Auth check response:", res.status);
      if (res.ok) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    })
    .catch(err => {
      console.error("Auth check failed:", err);
      setIsAuth(false);
    });
}, []);


    if (isAuth === null) {
        return <div>Loading...</div>; // or spinner
    }

    if (!isAuth) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default PrivateRoute;
