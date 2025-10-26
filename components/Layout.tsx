import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import FlashMessage from './FlashMessage';

// The Layout component provides a consistent structure for most pages in the app.
// It includes the Header and a main content area where the specific page's content
// is rendered via the <Outlet /> component from react-router-dom.
const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <FlashMessage />
      <main className="flex-grow container mx-auto p-4 md:p-6">
        <Outlet />
      </main>
      <footer className="bg-gray-800 shadow-inner py-4 mt-8">
        <div className="container mx-auto text-center text-gray-400 text-sm">
          &copy; 2024 Digital Lost & Found Platform. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;