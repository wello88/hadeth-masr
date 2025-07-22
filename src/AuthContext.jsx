import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is logged in on mount
    const storedUser = localStorage.getItem('authUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = (email, password) => {
    const stored = localStorage.getItem('registeredUser');
    if (!stored) return false;
    const regUser = JSON.parse(stored);
    if (regUser.email === email && regUser.password === password) {
      setUser(regUser);
      setIsAuthenticated(true);
      localStorage.setItem('authUser', JSON.stringify(regUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('authUser');
  };

  const register = (userData) => {
    // userData: {email, password, ...other fields}
    localStorage.setItem('registeredUser', JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('authUser', JSON.stringify(userData));
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 