import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { ReactElement } from 'react';

interface Props {
  children: ReactElement;
}

const ProtectedRoute = ({ children }: Props) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
