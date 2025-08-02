import { useState, useEffect } from 'react';
import { useDarkMode } from '../context/DarkModeContext';
import ProgressBar from '../components/ProgressBar';
import RewardCard from '../components/RewardCard';
import ActivityFeed from '../components/ActivityFeed';
import CopyToClipboard from '../components/CopyToClipboard';

// Default data structure
const DEFAULT_DATA = {
  name: "David Yildum",
  referralCode: "yildum2025",
  amountRaised: 750,  // Your specified amount
  rewards: ["Bronze Badge", "Early Supporter"]
};

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { darkMode } = useDarkMode();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://fundraising-backend-v4np.onrender.com/api/user');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const apiData = await response.json();
        setData(apiData);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
        setData(DEFAULT_DATA); // Fallback to default data
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="animate-pulse text-xl">Loading dashboard...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="text-red-500">
          {error || 'Failed to load data'}
        </div>
      </div>
    );
  }

  // Calculate rewards based on amountRaised
  const rewards = [
    { id: 1, name: "Bronze", threshold: 100, unlocked: data.amountRaised >= 100 },
    { id: 2, name: "Silver", threshold: 500, unlocked: data.amountRaised >= 500 },
    { id: 3, name: "Gold", threshold: 1000, unlocked: data.amountRaised >= 1000 },
    { id: 4, name: "Platinum", threshold: 2000, unlocked: data.amountRaised >= 2000 },
  ];

  return (
    <div className={`min-h-screen p-4 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                Welcome, {data.name}
              </h1>
              <p className={`mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Fundraising Progress
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-md font-mono ${darkMode ? 'bg-blue-900 text-blue-100' : 'bg-blue-100 text-blue-800'}`}>
                {data.referralCode}
              </span>
              <CopyToClipboard text={data.referralCode} />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Card */}
            <div className={`p-6 rounded-xl shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h2 className="text-xl font-semibold mb-4">Your Impact</h2>
              <ProgressBar 
                current={data.amountRaised} 
                goal={5000}
                darkMode={darkMode}
              />
              
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Raised</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    ${data.amountRaised.toLocaleString()}
                  </p>
                </div>
                <div className="text-center">
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Goal</p>
                  <p className="text-2xl font-bold">$5,000</p>
                </div>
                <div className="text-right">
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Remaining</p>
                  <p className="text-2xl font-bold">
                    ${(5000 - data.amountRaised).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Activity Feed */}
            <ActivityFeed darkMode={darkMode} />
          </div>

          {/* Right Column */}
          <div className={`p-6 rounded-xl shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className="text-xl font-semibold mb-4">Your Rewards</h2>
            <div className="grid grid-cols-2 gap-4">
              {rewards.map(reward => (
                <RewardCard 
                  key={reward.id}
                  reward={reward}
                  darkMode={darkMode}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}