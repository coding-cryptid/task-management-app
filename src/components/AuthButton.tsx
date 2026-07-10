import { useAuth0 } from '@auth0/auth0-react';

export default function AuthButton() {
  const { isAuthenticated, isLoading, loginWithRedirect, logout, user } = useAuth0();

  if (isLoading) {
    return <span className="text-muted">Loading...</span>;
  }

  if (isAuthenticated) {
    return (
      <div className="d-flex align-items-center gap-2">
        <span>Hi, {user?.name}</span>
        <button
          className="btn btn-outline-secondary btn-sm"
          onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
        >
          Log Out
        </button>
      </div>
    );
  }

  return (
    <button className="btn btn-primary btn-sm" onClick={() => loginWithRedirect()}>
      Log In
    </button>
  );
}