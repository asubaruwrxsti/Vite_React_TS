import { Navigate } from 'react-router-dom';

import { getPocketBase } from '../lib/pocketbase';

interface ProtectedRouteProps {
    children: React.ReactNode;
    redirectTo?: string;
}

export const ProtectedRoute = ({
    children,
    redirectTo = '/login'
}: ProtectedRouteProps) => {
    const isLoggedIn = getPocketBase().authStore.isValid;
    return isLoggedIn ? <>{children}</> : <Navigate to={redirectTo} />;
};