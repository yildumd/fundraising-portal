import { FiUser } from 'react-icons/fi';

export default function ActivityFeed({ activities = [], darkMode }) {
  // Default activities if none provided
  const displayedActivities = activities.length > 0 
    ? activities 
    : [
        { id: 1, donor: "No recent activity", amount: 0, date: "" }
      ];

  return (
    <div className={`p-6 rounded-xl shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
      
      <div className="space-y-4">
        {displayedActivities.map(activity => (
          <div 
            key={activity.id} 
            className={`flex justify-between items-center p-3 rounded-lg transition-all ${
              darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center min-w-0">
              <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                darkMode ? 'bg-gray-700 text-blue-300' : 'bg-blue-100 text-blue-600'
              }`}>
                {activity.donor ? (
                  <span className="font-medium">{activity.donor.charAt(0)}</span>
                ) : (
                  <FiUser className="text-lg" />
                )}
              </div>
              <div className="min-w-0">
                <p className={`font-medium truncate ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  {activity.donor || "Anonymous Donor"}
                </p>
                {activity.date && (
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {activity.date}
                  </p>
                )}
              </div>
            </div>
            
            {activity.amount > 0 ? (
              <div className="text-green-600 dark:text-green-400 font-semibold whitespace-nowrap ml-4">
                +${activity.amount.toLocaleString()}
              </div>
            ) : (
              <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                No donations
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}