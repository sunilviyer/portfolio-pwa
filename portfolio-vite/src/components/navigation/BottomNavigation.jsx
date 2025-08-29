// File: src/components/navigation/BottomNavigation.js
import React from 'react';
import { TrendingUp, List, PieChart, DollarSign } from 'lucide-react';

const BottomNavigation = ({ activeTab, setActiveTab, activeWorkflow }) => {
  // Only show bottom navigation for portfolio workflow
  if (activeWorkflow !== 'portfolio') {
    return null;
  }

  const tabs = [
    { id: 'dashboard', icon: TrendingUp, label: 'Dashboard' },
    { id: 'overview', icon: List, label: 'Overview' },
    { id: 'sectors', icon: PieChart, label: 'Sectors' },
    { id: 'dividends', icon: DollarSign, label: 'Dividends' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 z-30 shadow-lg">
      <div className="flex justify-around max-w-md mx-auto">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors min-w-0 ${
                isActive 
                  ? 'bg-blue-100 text-blue-600' 
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
              aria-label={`Switch to ${tab.label} tab`}
            >
              <Icon size={20} className="flex-shrink-0" />
              <span className="text-xs mt-1 truncate">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavigation;