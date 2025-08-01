import { useEffect, useState } from 'react';

export default function ProgressBar({ current, goal, darkMode }) {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    // Animation effect
    const targetProgress = (current / goal) * 100;
    const interval = setInterval(() => {
      setProgress(prev => {
        const step = 5;
        return prev >= targetProgress ? targetProgress : prev + step;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [current, goal]);

  return (
    <div>
      <div className={`w-full h-4 rounded-full ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
        <div 
          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-1000 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-xs mt-1">
        <span>${current.toLocaleString()}</span>
        <span>${goal.toLocaleString()}</span>
      </div>
    </div>
  );
}