import { useAuth0 } from '@auth0/auth0-react';
import { Link, Navigate, useLocation } from 'react-router-dom';

interface LocationState {
  from?: { pathname: string };
}

export default function Register() {
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

  const handleRegister = () => {
    loginWithRedirect({
      appState: { returnTo },
      authorizationParams: {
        screen_hint: 'signup',
      },
    });
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 420 }}>
      <div className="card shadow-sm">
        <div className="card-body text-center p-4">
          <h1 className="h3 mb-2">Create an account</h1>
          <p className="text-muted mb-4">Sign up to start tracking your tasks.</p>

          <button className="btn btn-primary w-100" onClick={handleRegister}>
            Sign Up
          </button>

          <p className="mt-4 mb-0 text-muted">
            Already have an account?{' '}
            <Link to="/login" state={{ from: state?.from }}>
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}