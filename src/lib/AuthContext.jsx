import React, { createContext, useContext } from 'react';

// Standalone replacement for the Base44 auth scaffolding.
// The app is public (no platform login) — the "lock screen" on the Index
// page handles its own passphrase via sessionStorage.
const AuthContext = createContext();

const authValue = {
  user: null,
  isAuthenticated: false,
  isLoadingAuth: false,
  isLoadingPublicSettings: false,
  authError: null,
  appPublicSettings: null,
  logout: () => {},
  navigateToLogin: () => {},
  checkAppState: () => {},
};

export const AuthProvider = ({ children }) => (
  <AuthContext.Provider value={authValue}>
    {children}
  </AuthContext.Provider>
);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
