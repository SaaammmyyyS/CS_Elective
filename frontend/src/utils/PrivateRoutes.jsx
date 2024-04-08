import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = () => {
    const token = document.cookie.split('; ').find(row => row.startsWith('jwt='));

    const isAuthenticated = token ? true : false;

    return isAuthenticated ? <Outlet /> : <Navigate to="/auth/sign-in" />;
};

export default PrivateRoutes;
