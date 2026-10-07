import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser, selectIsAuthReady } from '@/features/auth/authSlice';
import { HOME_BY_ROLE } from '@/constants/roles';

// Usage in routes:
//   <RoleRoute allowedRoles={ADMIN_ROLES} />   -> only admin and super admin
//   <RoleRoute />                              -> any logged-in user
// This only improves the user experience. The REAL protection is on the server.
export default function RoleRoute({ allowedRoles }) {
  const user = useSelector(selectCurrentUser);
  const isAuthReady = useSelector(selectIsAuthReady);
  const location = useLocation();

  if (!isAuthReady) {
    return <div className="grid min-h-screen place-items-center text-muted">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={HOME_BY_ROLE[user.role] || '/'} replace />;
  }

  return <Outlet />;
}
