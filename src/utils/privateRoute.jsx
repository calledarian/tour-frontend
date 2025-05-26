import { Navigate } from 'react-router-dom';

function isTokenValid(token) {
    if (!token) return false;
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.exp && Date.now() >= payload.exp * 1000) {
            return false;
        }
        return true;
    } catch (e) {
        return false;
    }
}

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    if (!isTokenValid(token)) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default PrivateRoute;
