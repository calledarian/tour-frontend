import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_URL;


const PrivateRoute = ({ children }) => {
    const [isAuth, setIsAuth] = useState(null); // null = loading

    useEffect(() => {
        fetch(`${apiUrl}/auth/me`, {
            method: 'GET',
            credentials: 'include', // send cookies
        })
            .then(res => {
                if (res.ok) {
                    setIsAuth(true);
                } else {
                    setIsAuth(false);
                }
            })
            .catch(() => setIsAuth(false));
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
