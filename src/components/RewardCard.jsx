export default function RewardCard({ reward, darkMode }) {
  return (
    <div className={`p-4 rounded-lg border ${reward.unlocked ? 
      `${darkMode ? 'border-yellow-400 bg-gray-800' : 'border-yellow-300 bg-yellow-50'}` : 
      `${darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-gray-50'}`}`}>
      <div className="flex items-center mb-2">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
          reward.unlocked ? 
            (darkMode ? 'bg-yellow-400 text-gray-800' : 'bg-yellow-300 text-white') : 
            (darkMode ? 'bg-gray-600 text-gray-400' : 'bg-gray-200 text-gray-500')
        }`}>
          {reward.unlocked ? '✓' : '🔒'}
        </div>
        <h3 className={`font-medium ${reward.unlocked ? 
          (darkMode ? 'text-yellow-300' : 'text-yellow-600') : 
          (darkMode ? 'text-gray-400' : 'text-gray-500')}`}>
          {reward.name}
        </h3>
      </div>
      <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        {reward.unlocked ? 'Unlocked!' : `Raise $${reward.threshold} to unlock`}
      </p>
    </div>
  );
}