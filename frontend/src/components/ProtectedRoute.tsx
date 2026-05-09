import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireAdmin = false }) => {
  const { user, isAdmin, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warm-white">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="animate-spin text-brand-green" size={48} />
          <p className="text-brand-dark/40 font-bold text-[10px] uppercase tracking-[0.3em]">Verifying Credentials</p>
        </div>
      </div>
    );
  }

  if (!user) {
    // If not logged in, redirect to the appropriate login page
    const loginPath = requireAdmin ? '/admin/portal' : '/login';
    return <Navigate to={loginPath} state={{ from: location }} replace />;
  }

  if (requireAdmin && !isAdmin) {
    // If admin is required but user is not an admin, redirect to home
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
