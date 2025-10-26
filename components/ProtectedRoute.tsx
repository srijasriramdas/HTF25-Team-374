
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// This component acts as a gatekeeper for certain routes.
// It checks if a user is logged in using the useAuth hook.
// If not, it redirects them to the /login page. This is crucial for
// protecting pages like "Report Item" or "Messages".
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    // User not logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }

  // User is logged in, render the requested component
  return <>{children}</>;
};

export default ProtectedRoute;
