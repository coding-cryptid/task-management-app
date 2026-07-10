import { useAuth0 } from '@auth0/auth0-react';
import { mapAuthUser } from '../utils/MapAuthUser';

export function useAppUser() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const appUser = mapAuthUser(user);

  return { appUser, isAuthenticated, isLoading };
}
