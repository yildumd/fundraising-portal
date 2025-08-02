import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';

export default function Navbar({ darkMode, toggleDarkMode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden md:flex items-center justify-between py-4 px-6 border-b border-gray-200 dark:border-gray-700">
        <Link to="/" className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
          Fundraising Portal
        </Link>
        <div className="flex items-center space-x-6">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <FiSun /> : <FiMoon />}
          </button>
          <Link 
            to="/dashboard" 
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            Dashboard
          </Link>
          <Link 
            to="/leaderboard" 
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
          >
            Leaderboard
          </Link>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="md:hidden flex items-center justify-between py-4 px-4 border-b border-gray-200 dark:border-gray-700">
        <Link to="/" className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
          Fundraising Portal
        </Link>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <FiSun /> : <FiMoon />}
          </button>
          
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="absolute top-16 right-0 left-0 bg-white dark:bg-gray-800 shadow-lg py-2 z-50">
            <Link
              to="/dashboard"
              className="block px-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/leaderboard"
              className="block px-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Leaderboard
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}