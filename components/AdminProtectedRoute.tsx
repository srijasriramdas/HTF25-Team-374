
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Similar to ProtectedRoute, but this one specifically checks for an admin login.
// It ensures that only the admin can access the /admin route.
const AdminProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentAdmin } = useAuth();

  if (!currentAdmin) {
    // Admin not logged in, redirect to homepage (or login page)
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default AdminProtectedRoute;
