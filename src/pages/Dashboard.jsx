import { useEffect, useState } from "react";
import { useDarkMode } from "../context/DarkModeContext";
import ProgressBar from "../components/ProgressBar";
import RewardCard from "../components/RewardCard";
import ActivityFeed from "../components/ActivityFeed";
import CopyToClipboard from "../components/CopyToClipboard";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { darkMode } = useDarkMode();

  useEffect(() => {
    // Simulate API call with delay
    const timer = setTimeout(() => {
      fetch("/user.json")
        .then((res) => res.json())
        .then((data) => {
          setUser(data);
          setLoading(false);
        });
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="animate-pulse text-xl">Loading your dashboard...</div>
      </div>
    );
  }

  const rewards = [
    { id: 1, name: "Bronze Badge", threshold: 100, unlocked: user.donations >= 100 },
    { id: 2, name: "Silver Badge", threshold: 500, unlocked: user.donations >= 500 },
    { id: 3, name: "Gold Badge", threshold: 1000, unlocked: user.donations >= 1000 },
    { id: 4, name: "Platinum Badge", threshold: 2000, unlocked: user.donations >= 2000 },
  ];

  const recentActivity = [
    { id: 1, donor: "Alex C.", amount: 100, date: "2 hours ago" },
    { id: 2, donor: "Sam W.", amount: 250, date: "1 day ago" },
    { id: 3, donor: "Taylor M.", amount: 500, date: "3 days ago" },
  ];

  return (
    <div className={`min-h-screen p-6 ${darkMode ? 'bg-gray-800 text-gray-100' : 'bg-gray-50 text-gray-800'}`}>
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1">Welcome back, {user.name} 👋</h1>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Here's your fundraising progress
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="flex items-center space-x-2">
              <span className="font-mono px-3 py-1 rounded bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                {user.referralCode}
              </span>
              <CopyToClipboard text={user.referralCode} />
            </div>
          </div>
        </div>

        {/* Stats and Progress Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <div className={`p-6 rounded-xl shadow ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
              <h2 className="text-xl font-semibold mb-4">Your Impact</h2>
              <ProgressBar 
                current={user.donations} 
                goal={5000} 
                darkMode={darkMode}
              />
              <div className="flex justify-between mt-4">
                <div>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Raised</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    ${user.donations.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Goal</p>
                  <p className="text-2xl font-bold">$5,000</p>
                </div>
                <div>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Remaining</p>
                  <p className="text-2xl font-bold">
                    ${(5000 - user.donations).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Recent Activity Section */}
            <div className={`mt-6 p-6 rounded-xl shadow ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <ActivityFeed activities={recentActivity} darkMode={darkMode} />
            </div>
          </div>

          {/* Rewards Section */}
          <div className={`p-6 rounded-xl shadow ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
            <h2 className="text-xl font-semibold mb-4">Your Rewards</h2>
            <div className="grid grid-cols-2 gap-4">
              {rewards.map((reward) => (
                <RewardCard 
                  key={reward.id}
                  reward={reward}
                  darkMode={darkMode}
                />
              ))}
            </div>
            <div className="mt-6">
              <button 
                className={`w-full py-2 px-4 rounded-lg font-medium ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white transition-colors`}
              >
                Share Your Progress
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}