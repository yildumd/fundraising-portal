export default function ActivityFeed({ activities, darkMode }) {
  return (
    <div className="space-y-4">
      {activities.map(activity => (
        <div key={activity.id} className="flex justify-between items-center py-3 border-b last:border-0 border-gray-200 dark:border-gray-600">
          <div className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
              darkMode ? 'bg-gray-600 text-blue-300' : 'bg-blue-100 text-blue-600'
            }`}>
              {activity.donor.charAt(0)}
            </div>
            <div>
              <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                {activity.donor}
              </p>
              <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {activity.date}
              </p>
            </div>
          </div>
          <div className="text-green-600 dark:text-green-400 font-semibold">
            +${activity.amount}
          </div>
        </div>
      ))}
    </div>
  );
}