import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppUser } from '../hooks/UseAppUser';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAppUser();
  const location = useLocation();

  if (isLoading) {
    return <p className="text-center mt-4">Loading...</p>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}