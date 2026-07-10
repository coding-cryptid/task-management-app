import { User } from '@auth0/auth0-react';
import type { AppUser } from '../types/user';

export function mapAuthUser(user: User | undefined): AppUser | null {
  if (!user || !user.sub) {
    return null;
  }

  return {
    sub: user.sub,
    name: user.name ?? 'Unknown',
    email: user.email ?? '',
    picture: user.picture,
  };
}