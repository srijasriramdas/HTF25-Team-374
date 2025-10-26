
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// The Header component provides the main navigation for the site.
// It uses the useAuth hook to display different links based on whether
// a user or admin is logged in. NavLink is used for active link styling.
const Header: React.FC = () => {
  const { currentUser, currentAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Common link styles for NavLink
  const linkStyles = "px-3 py-2 rounded-md text-sm font-medium transition-colors";
  const activeLinkStyles = "bg-gray-900 text-white";
  const inactiveLinkStyles = "text-gray-500 hover:bg-gray-700 hover:text-white";

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="text-2xl font-bold text-gray-800">
              FoundIt!
            </NavLink>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink to="/items/lost" className={({ isActive }) => `${linkStyles} ${isActive ? activeLinkStyles : inactiveLinkStyles}`}>
                  Lost Items
                </NavLink>
                <NavLink to="/items/found" className={({ isActive }) => `${linkStyles} ${isActive ? activeLinkStyles : inactiveLinkStyles}`}>
                  Found Items
                </NavLink>
                <NavLink to="/report" className={({ isActive }) => `${linkStyles} ${isActive ? activeLinkStyles : inactiveLinkStyles}`}>
                  Report Item
                </NavLink>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            {currentUser ? (
              <>
                <NavLink to="/messages" className={({ isActive }) => `${linkStyles} ${isActive ? activeLinkStyles : inactiveLinkStyles}`}>Messages</NavLink>
                <span className="text-gray-500 text-sm mx-3 hidden sm:inline">Hi, {currentUser.name}</span>
                <button onClick={handleLogout} className="ml-4 bg-red-500 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-red-600 transition">
                  Logout
                </button>
              </>
            ) : currentAdmin ? (
              <>
                <NavLink to="/admin" className={({ isActive }) => `${linkStyles} ${isActive ? activeLinkStyles : inactiveLinkStyles}`}>Admin Dashboard</NavLink>
                <button onClick={handleLogout} className="ml-4 bg-red-500 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-red-600 transition">
                  Logout
                </button>
              </>
            ) : (
              <NavLink to="/login" className="bg-blue-500 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition">
                Login / Register
              </NavLink>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
