import React, { createContext, useState, useContext } from 'react';
import { demoUsers } from '../data/mockData';
import { useLocalStorage } from '../hooks/useLocalStorage';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useLocalStorage('koylasetu_user', null);
  const [language, setLanguage] = useState(() => localStorage.getItem('koylasetu_lang') || 'en');
  const [subsidiary, setSubsidiary] = useState('WCL - Western Coalfields Limited');
  const [activeMine, setActiveMine] = useState('Kamptee Colliery');

  const updateLanguage = (newLang) => {
    setLanguage(newLang);
    try {
      localStorage.setItem('koylasetu_lang', newLang);
    } catch {
      // ignore
    }
  };

  const login = async (userId, password, options = {}) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 600));

    if (options.language) {
      updateLanguage(options.language);
    }
    if (options.subsidiary) {
      setSubsidiary(options.subsidiary);
      if (options.subsidiary.includes('WCL')) {
        setActiveMine('Kamptee Colliery');
      } else if (options.subsidiary.includes('SECL')) {
        setActiveMine('Gevra Open Cast Project');
      } else if (options.subsidiary.includes('ECL')) {
        setActiveMine('Jhanjra Project');
      } else if (options.subsidiary.includes('NCL')) {
        setActiveMine('Nigahi Project');
      }
    }

    const user = demoUsers.find(u => u.userId === userId && u.password === password);
    if (user) {
      // Attach selected subsidiary & mine if applicable
      const enrichedUser = {
        ...user,
        subsidiary: user.role === 'manager' ? (options.subsidiary ? options.subsidiary.split(' - ')[0] : 'WCL') : user.subsidiary,
        mine: user.role === 'manager' ? (options.mine || 'Kamptee Colliery') : user.mine
      };
      setCurrentUser(enrichedUser);
      return { success: true };
    }
    return { success: false, message: "Invalid demo credentials" };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      currentUser, 
      login, 
      logout, 
      isLoggedIn: !!currentUser,
      language,
      setLanguage: updateLanguage,
      subsidiary,
      setSubsidiary,
      activeMine,
      setActiveMine
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
