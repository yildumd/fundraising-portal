import { useState } from 'react';
import { useDarkMode } from '../context/DarkModeContext';
import { FiSearch, FiDownload } from 'react-icons/fi';

const leaderboardData = [
  { id: 1, name: "Yildum David Jonah", code: "yildum2025", donations: 1250, trend: "up" },
  { id: 2, name: "Jane Doe", code: "jane2025", donations: 520, trend: "down" },
  { id: 3, name: "John Smith", code: "john2025", donations: 420, trend: "up" },
  { id: 4, name: "Alex Johnson", code: "alex2025", donations: 380, trend: "up" },
  { id: 5, name: "Sam Wilson", code: "sam2025", donations: 350, trend: "neutral" },
];

export default function Leaderboard() {
  const { darkMode } = useDarkMode();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLeaderboard = leaderboardData
    .filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.code.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => b.donations - a.donations);

  const getMedal = (index) => {
    switch(index) {
      case 0: return '🥇';
      case 1: return '🥈';
      case 2: return '🥉';
      default: return index + 1;
    }
  };

  const getTrendIcon = (trend) => {
    switch(trend) {
      case 'up': return '↑';
      case 'down': return '↓';
      default: return '→';
    }
  };

  return (
    <div className={`min-h-screen p-6 ${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-gray-50 text-gray-800'}`}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">🏆 Fundraising Leaderboard</h1>
          
          <div className="flex space-x-3 w-full md:w-auto">
            <div className={`relative flex-grow md:w-64 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} border focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
            
            <button 
              className={`flex items-center px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-100'} border ${darkMode ? 'border-gray-600' : 'border-gray-300'} transition-colors`}
            >
              <FiDownload className="mr-2" />
              Export
            </button>
          </div>
        </div>

        <div className={`overflow-hidden rounded-xl shadow ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className={`${darkMode ? 'bg-gray-600' : 'bg-gray-100'}`}>
                  <th className="py-4 px-6 text-left font-semibold">Rank</th>
                  <th className="py-4 px-6 text-left font-semibold">Name</th>
                  <th className="py-4 px-6 text-left font-semibold">Referral Code</th>
                  <th className="py-4 px-6 text-left font-semibold">Donations</th>
                  <th className="py-4 px-6 text-left font-semibold">Trend</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${darkMode ? 'divide-gray-600' : 'divide-gray-200'}`}>
                {filteredLeaderboard.map((user, index) => (
                  <tr key={user.id} className={`${darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-50'} transition-colors`}>
                    <td className="py-4 px-6 font-medium">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        {getMedal(index)}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
                          {user.name.charAt(0)}
                        </div>
                        {user.name}
                      </div>
                    </td>
                    <td className="py-4 px-6 font-mono">{user.code}</td>
                    <td className="py-4 px-6 font-semibold text-green-600 dark:text-green-400">
                      ${user.donations.toLocaleString()}
                    </td>
                    <td className={`py-4 px-6 ${
                      user.trend === 'up' ? 'text-green-500' : 
                      user.trend === 'down' ? 'text-red-500' : 'text-gray-500'
                    }`}>
                      {getTrendIcon(user.trend)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredLeaderboard.length === 0 && (
          <div className={`text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            No matching users found
          </div>
        )}
      </div>
    </div>
  );
}