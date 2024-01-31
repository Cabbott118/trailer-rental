import { Navigate, useLocation } from 'react-router-dom';

// Firebase
// import { useSigninCheck } from 'reactfire';

// Redux
import { useSelector } from 'react-redux';

// Routes
import ROUTES from 'resources/routes-constants';

export default function RequireAuth({ children }) {
  const { isAuthenticated } = useSelector((state) => state.user);

  const location = useLocation();

  if (isAuthenticated === false) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  return children;
}
