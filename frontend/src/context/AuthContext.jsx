import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the Context
const AuthContext = createContext();

// Custom hook to use the Auth context easily in other components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in when the app starts
useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    // ADDED FIX: Ensure storedUser is not the string "undefined"
    if (storedUser && storedUser !== "undefined" && token) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user from local storage", error);
        // Clear the bad data so it doesn't crash again
        localStorage.removeItem('user'); 
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  // Login function to be called from Login/Register pages
  const login = (userData, token) => {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
    setUser(userData);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};