import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User, Admin } from '../types';
import { MOCK_USERS, MOCK_ADMIN } from '../data/mockData';

// The AuthContext is used to manage user authentication state across the app.
// It avoids "prop drilling" (passing user info down through many components).

interface AuthContextType {
  currentUser: User | null;
  currentAdmin: Admin | null;
  login: (email: string, pass: string) => Promise<'user' | 'admin' | 'error'>;
  logout: () => void;
  register: (name: string, email: string, pass: string) => Promise<'success' | 'exists'>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentAdmin, setCurrentAdmin] = useState<Admin | null>(null);
  
  // This state is just for the mock data. In a real app, this would be managed
  // by a backend database.
  const [users, setUsers] = useState<User[]>(MOCK_USERS);

  // This function is now async to simulate a network request to a server.
  const login = async (email: string, pass: string): Promise<'user' | 'admin' | 'error'> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Check if it's an admin login
    if (email === MOCK_ADMIN.email && pass === MOCK_ADMIN.password) {
      setCurrentAdmin(MOCK_ADMIN);
      setCurrentUser(null);
      return 'admin';
    }
    // Check if it's a regular user login
    const user = users.find(u => u.email === email && u.password === pass);
    if (user) {
      setCurrentUser(user);
      setCurrentAdmin(null);
      return 'user';
    }
    return 'error';
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentAdmin(null);
  };
  
  // This function is now async to simulate creating a user in a database.
  const register = async (name: string, email: string, pass: string): Promise<'success' | 'exists'> => {
     // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 700));

    if (users.some(u => u.email === email)) {
      return 'exists';
    }
    const newUser: User = {
      id: Date.now(), // simple unique ID for mock data
      name,
      email,
      password: pass
    };
    setUsers(prevUsers => [...prevUsers, newUser]);
    // Automatically log in the new user
    setCurrentUser(newUser);
    setCurrentAdmin(null);
    return 'success';
  }

  return (
    <AuthContext.Provider value={{ currentUser, currentAdmin, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

// A custom hook to make it easier for components to access the auth context.
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};