import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const DEFAULT_USER = {
  id: 'usr-9042',
  name: 'Alex Vance',
  email: 'alex.vance@ryuk-sec.io',
  role: 'Lead SecOps Engineer',
  organization: 'Cyber Defense Corp',
  apiKey: 'ryuk_live_sec_89f0a71b4c9e112d09a',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  twoFactorEnabled: true,
  createdAt: '2026-01-15'
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('ryuk_user_session');
    return saved ? JSON.parse(saved) : DEFAULT_USER; 
  });

  const [authView, setAuthView] = useState('authenticated'); 
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('ryuk_user_session', JSON.stringify(user));
    } else {
      localStorage.removeItem('ryuk_user_session');
    }
  }, [user]);

  const login = (email, password) => {
    const newUser = {
      ...DEFAULT_USER,
      email: email || DEFAULT_USER.email,
      name: email ? email.split('@')[0].replace('.', ' ') : DEFAULT_USER.name
    };
    setUser(newUser);
    setAuthView('authenticated');
    return { success: true };
  };

  const register = (userData) => {
    const newUser = {
      id: `usr-${Math.floor(1000 + Math.random() * 9000)}`,
      name: userData.fullName || 'Security Specialist',
      email: userData.email,
      role: userData.role || 'SecOps Specialist',
      organization: userData.organization || 'Independent Security',
      apiKey: `ryuk_live_${Math.random().toString(36).substr(2, 16)}`,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      twoFactorEnabled: false,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setUser(newUser);
    setAuthView('authenticated');
    return { success: true };
  };

  const resetPassword = (email) => {
    return { success: true, message: `Password reset instructions sent to ${email}` };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ryuk_user_session');
    setAuthView('login');
  };

  const updateUserProfile = (updatedFields) => {
    setUser(prev => ({ ...prev, ...updatedFields }));
  };

  const regenerateApiKey = () => {
    const newKey = `ryuk_live_${Math.random().toString(36).substr(2, 20)}`;
    setUser(prev => ({ ...prev, apiKey: newKey }));
    return newKey;
  };

  return (
    <AuthContext.Provider value={{
      user,
      authView,
      setAuthView,
      login,
      register,
      resetPassword,
      logout,
      updateUserProfile,
      regenerateApiKey,
      isProfileModalOpen,
      setIsProfileModalOpen
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
