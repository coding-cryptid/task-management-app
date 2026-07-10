import type { ReactNode } from 'react';
import { useAppUser } from '../hooks/UseAppUser';
import { useAuth0 } from '@auth0/auth0-react';

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAppUser();
  const { loginWithRedirect } = useAuth0();

  if (isLoading) {
    return <p className="text-center mt-4">Loading...</p>;
  }

  if (!isAuthenticated) {
    loginWithRedirect();
    return null;
  }

  return <>{children}</>;
}
