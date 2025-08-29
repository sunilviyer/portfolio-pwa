// File: src/components/portfolio/PerformanceCard.js
import React from 'react';

const PerformanceCard = ({ 
  title, 
  value, 
  subValue, 
  trend, 
  color = 'blue',
  size = 'md',
  icon: Icon,
  onClick 
}) => {
  const colorClasses = {
    blue: 'from-blue-50 to-blue-100 border-blue-200 text-blue-800',
    green: 'from-green-50 to-green-100 border-green-200 text-green-800',
    red: 'from-red-50 to-red-100 border-red-200 text-red-800',
    gray: 'from-gray-50 to-gray-100 border-gray-200 text-gray-800'
  };

  const sizeClasses = {
    sm: 'p-3',
    md: 'p-4', 
    lg: 'p-6'
  };

  const valueClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl'
  };

  return (
    <div 
      className={`bg-gradient-to-r ${colorClasses[color]} border rounded-lg ${sizeClasses[size]} shadow-md ${onClick ? 'cursor-pointer hover:shadow-lg' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold">{title}</h3>
        {Icon && <Icon size={20} />}
      </div>
      
      <div className="space-y-1">
        <p className={`${valueClasses[size]} font-black`}>
          {value}
        </p>
        
        {subValue && (
          <p className="text-sm font-medium opacity-80">
            {subValue}
          </p>
        )}
        
        {trend && (
          <p className="text-xs opacity-70">
            {trend}
          </p>
        )}
      </div>
    </div>
  );
};

export default PerformanceCard;