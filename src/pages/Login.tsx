import { useAuth0 } from '@auth0/auth0-react';
import { Link, Navigate, useLocation } from 'react-router-dom';

interface LocationState {
  from?: { pathname: string };
}

export default function Login() {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
  const location = useLocation();

  const state = location.state as LocationState | null;
  const returnTo = state?.from?.pathname ?? '/';

  if (isLoading) {
    return <p className="text-center mt-4">Loading...</p>;
  }

  if (isAuthenticated) {
    return <Navigate to={returnTo} replace />;
  }

  const handleLogin = () => {
    loginWithRedirect({
      appState: { returnTo },
    });
  };

  return (
    <div className="container mt-5 d-flex justify-content-center" style={{ maxWidth: 420 }}>
      <div className="card shadow-sm">
        <div className="card-body text-center p-4">
          <h1 className="h3 mb-2">Welcome back</h1>
          <p className="text-muted mb-4">Log in to manage your tasks.</p>

          <button className="btn btn-primary w-100" onClick={handleLogin}>
            Log In
          </button>

          <p className="mt-4 mb-0 text-muted">
            Don&apos;t have an account?{' '}
            <Link to="/register" state={{ from: state?.from }}>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}