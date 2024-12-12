import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


const CheckToken = ({ element: Element }) => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      return <Navigate to="/login" />;
    }
    try {
      const decodedToken = jwtDecode(authToken);
      const currentTime = Math.floor(Date.now() / 1000);
      if (decodedToken.exp < currentTime) {
        localStorage.removeItem('authToken');
        return <Navigate to="/login" />;
      }
    } catch (error) {
      console.error('Invalid token:', error);
      localStorage.removeItem('authToken');
      return <Navigate to="/login" />;
    }
    return <Element />;
  };

export default CheckToken
