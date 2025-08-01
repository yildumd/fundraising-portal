import { Link } from 'react-router-dom';

export default function Navbar({ darkMode, toggleDarkMode }) {
  return (
    <nav className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
      <Link to="/" className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
        Fundraising Portal
      </Link>
      <div className="flex items-center space-x-6">
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
        <Link to="/dashboard" className="hover:text-indigo-600 dark:hover:text-indigo-400">
          Dashboard
        </Link>
        <Link to="/leaderboard" className="hover:text-indigo-600 dark:hover:text-indigo-400">
          Leaderboard
        </Link>
      </div>
    </nav>
  );
}