import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../services/StorageService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = storage.getCurrentUser();
    if (savedUser) {
      setCurrentUser(savedUser);
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const users = storage.getUsers();
    const found = users.find(
      u => u.email.toLowerCase() === email.toLowerCase().trim() && u.password === password
    );

    if (!found) {
      throw new Error('Invalid email address or password.');
    }

    if (found.status === 'suspended') {
      throw new Error('This account has been suspended by an administrator.');
    }

    setCurrentUser(found);
    storage.setCurrentUser(found);
    return found;
  };

  const register = (userData) => {
    const users = storage.getUsers();
    const existing = users.find(u => u.email.toLowerCase() === userData.email.toLowerCase().trim());
    if (existing) {
      throw new Error('An account with this email address already exists.');
    }

    const newUser = {
      id: `usr-${Date.now()}`,
      email: userData.email.trim(),
      password: userData.password,
      full_name: userData.full_name.trim(),
      phone: userData.phone || '',
      role: userData.role || 'learner',
      avatar_url: userData.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(userData.full_name)}`,
      headline: userData.headline || 'Learner seeking digital skills',
      location: userData.location || 'India',
      education: userData.education || '',
      skills: userData.skills || [],
      learning_goals: userData.learning_goals || '',
      status: 'active',
      created_at: new Date().toISOString()
    };

    const updatedUsers = [...users, newUser];
    storage.saveUsers(updatedUsers);

    setCurrentUser(newUser);
    storage.setCurrentUser(newUser);
    return newUser;
  };

  const logout = () => {
    setCurrentUser(null);
    storage.setCurrentUser(null);
  };

  const updateProfile = (updatedFields) => {
    if (!currentUser) return;
    const users = storage.getUsers();
    const updatedUser = { ...currentUser, ...updatedFields, updated_at: new Date().toISOString() };
    
    const updatedUsers = users.map(u => u.id === currentUser.id ? updatedUser : u);
    storage.saveUsers(updatedUsers);
    
    setCurrentUser(updatedUser);
    storage.setCurrentUser(updatedUser);
    return updatedUser;
  };

  const value = {
    currentUser,
    loading,
    login,
    register,
    logout,
    updateProfile,
    isLearner: currentUser?.role === 'learner',
    isInstructor: currentUser?.role === 'instructor',
    isAdmin: currentUser?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
