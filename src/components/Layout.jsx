import { Outlet } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';
import Navbar from './Navbar';

export default function Layout() {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 py-8">
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main className="mt-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}