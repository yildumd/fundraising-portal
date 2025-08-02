import { useEffect, useState } from "react";
import { useDarkMode } from "../context/DarkModeContext";
import ProgressBar from "../components/ProgressBar";
import RewardCard from "../components/RewardCard";
import ActivityFeed from "../components/ActivityFeed";
import CopyToClipboard from "../components/CopyToClipboard";

// Default user data to prevent undefined errors
const DEFAULT_USER = {
  name: "David Yildum",
  referralCode: "yildum2025",
  donations: 1250,
  rewards: ["Bronze Badge", "Early Supporter"]
};

export default function Dashboard() {
  const [user, setUser] = useState(DEFAULT_USER); // Initialize with defaults
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { darkMode } = useDarkMode();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://fundraising-backend-v4np.onrender.com/api/user");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
        // Fallback to default data if API fails
        setUser(DEFAULT_USER);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchData, 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="animate-pulse text-xl">Loading your dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="text-red-500">Error: {error} (Using default data)</div>
      </div>
    );
  }

  // Safely calculate rewards
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
    <div className={`min-h-screen p-4 sm:p-6 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header Section */}
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-1">
              Welcome back, {user?.name || "User"} 👋
            </h1>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Here's your fundraising progress
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="flex items-center space-x-2">
              <span className="font-mono px-3 py-1 rounded bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                {user?.referralCode || "REF123"}
              </span>
              <CopyToClipboard text={user?.referralCode || ""} />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            {/* Progress Section */}
            <div className={`p-4 md:p-6 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <h2 className="text-xl font-semibold mb-3 md:mb-4">Your Impact</h2>
              <ProgressBar 
                current={user?.donations || 0} 
                goal={5000} 
                darkMode={darkMode}
              />
              <div className="grid grid-cols-3 gap-2 mt-4">
                <div>
                  <p className={`text-xs md:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Raised</p>
                  <p className="text-lg md:text-2xl font-bold text-green-600 dark:text-green-400">
                    ${(user?.donations || 0).toLocaleString()}
                  </p>
                </div>
                <div className="text-center">
                  <p className={`text-xs md:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Goal</p>
                  <p className="text-lg md:text-2xl font-bold">$5,000</p>
                </div>
                <div className="text-right">
                  <p className={`text-xs md:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Remaining</p>
                  <p className="text-lg md:text-2xl font-bold">
                    ${(5000 - (user?.donations || 0)).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Activity Feed */}
            <ActivityFeed activities={recentActivity} darkMode={darkMode} />
          </div>

          {/* Rewards Section */}
          <div className={`p-4 md:p-6 rounded-xl shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <h2 className="text-xl font-semibold mb-3 md:mb-4">Your Rewards</h2>
            <div className="grid grid-cols-2 gap-3">
              {rewards.map((reward) => (
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