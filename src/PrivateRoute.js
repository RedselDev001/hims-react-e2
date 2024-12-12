import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './authContext';
const PrivateRoute = ({ element: Component }) => {
  const { authState } = useAuth(); // Access authentication state
  
  return authState.isAuthenticated ? Component : <Navigate to="/login" />;
};
export default PrivateRoute;