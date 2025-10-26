
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';

import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ItemsListPage from './pages/ItemsListPage';
import ReportItemPage from './pages/ReportItemPage';
import LoginPage from './pages/LoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import MessagesPage from './pages/MessagesPage';
import ItemDetailPage from './pages/ItemDetailPage';

import ProtectedRoute from './components/ProtectedRoute';
import AdminProtectedRoute from './components/AdminProtectedRoute';

// This is the main component that orchestrates the entire application.
// It sets up the routing system and wraps all components with context providers.
// Context providers allow child components to access global state like authentication
// status and application data (items, messages) without passing props down manually.
function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <HashRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="items/lost" element={<ItemsListPage type="lost" />} />
              <Route path="items/found" element={<ItemsListPage type="found" />} />
              <Route path="item/:itemId" element={<ItemDetailPage />} />

              {/* Protected Routes: Users must be logged in to access these */}
              <Route 
                path="report" 
                element={
                  <ProtectedRoute>
                    <ReportItemPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="messages" 
                element={
                  <ProtectedRoute>
                    <MessagesPage />
                  </ProtectedRoute>
                } 
              />
              
              {/* Admin Route: Only admin users can access this */}
              <Route 
                path="admin" 
                element={
                  <AdminProtectedRoute>
                    <AdminDashboardPage />
                  </AdminProtectedRoute>
                } 
              />

              {/* Fallback route: If no other route matches, redirect to the homepage */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </HashRouter>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
