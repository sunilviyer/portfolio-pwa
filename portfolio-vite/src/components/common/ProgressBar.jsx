// File: src/components/common/ProgressBar.js
import React from 'react';

const ProgressBar = ({ 
  current, 
  total, 
  label = '', 
  showPercentage = true,
  color = 'blue',
  height = 'h-2'
}) => {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;
  
  const colorClasses = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    red: 'bg-red-600',
    yellow: 'bg-yellow-600'
  };

  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-1">
          {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
          {showPercentage && (
            <span className="text-sm text-gray-600">{percentage}%</span>
          )}
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full ${height}`}>
        <div 
          className={`${height} ${colorClasses[color]} rounded-full transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      {current !== undefined && total !== undefined && (
        <div className="text-xs text-gray-500 mt-1">
          {current} of {total}
        </div>
      )}
    </div>
  );
};

export default ProgressBar;