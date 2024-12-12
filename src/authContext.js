
import React, { createContext, useState, useContext, useMemo } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({
    token: localStorage.getItem('authToken') || null,
    isAuthenticated: !!localStorage.getItem('authToken'),
  });

  const setToken = (token) => {
    localStorage.setItem('authToken', token);
    setAuthState({
      token,
      isAuthenticated: true,
    });
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setAuthState({
      token: null,
      isAuthenticated: false,
    });
  };

  const value = useMemo(() => ({ authState, setToken, logout }), [authState]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
