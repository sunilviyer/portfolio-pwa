import React from 'react';
import { 
  BarChart3, 
  Download, 
  RefreshCw, 
  Settings, 
  Eye, 
  X 
} from 'lucide-react';

const SideMenu = ({ 
  sideMenuOpen, 
  setSideMenuOpen, 
  activeWorkflow, 
  setActiveWorkflow,
  setActiveTab,
  metrics,
  formatCurrency 
}) => {
  const menuItems = [
    { 
      id: 'portfolio', 
      icon: BarChart3, 
      label: 'Portfolio', 
      available: true,
      description: 'View and manage your investments'
    },
    { 
      id: 'export', 
      icon: Download, 
      label: 'Export', 
      available: true,
      description: 'Export portfolio data'
    },
    { 
      id: 'update', 
      icon: RefreshCw, 
      label: 'Update', 
      available: true,
      description: 'Manual updates and data management'
    },
    { 
      id: 'settings', 
      icon: Settings, 
      label: 'Settings', 
      available: true,
      description: 'App configuration and security'
    },
    { 
      id: 'watchlist', 
      icon: Eye, 
      label: 'Watchlist', 
      available: false,
      description: 'Coming in Phase 2'
    }
  ];

  const handleWorkflowChange = (workflowId) => {
    const selectedItem = menuItems.find(item => item.id === workflowId);
    
    if (selectedItem?.available) {
      setActiveWorkflow(workflowId);
      
      if (workflowId === 'portfolio') {
        setActiveTab('dashboard');
      }
      
      setSideMenuOpen(false);
    }
  };

  return (
    <>
      {sideMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSideMenuOpen(false)}
        />
      )}
      
      <div className={`fixed left-0 top-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
        sideMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">Portfolio App</h2>
          <button
            onClick={() => setSideMenuOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4">
          <h3 className="font-medium text-gray-600 mb-4 text-sm uppercase tracking-wide">
            Primary Workflows
          </h3>
          
          <div className="space-y-2">
            {menuItems.map(item => {
              const Icon = item.icon;
              const isActive = activeWorkflow === item.id;
              const isAvailable = item.available;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleWorkflowChange(item.id)}
                  disabled={!isAvailable}
                  className={`w-full flex items-center p-3 rounded-lg text-left transition-colors ${
                    isActive && isAvailable
                      ? 'bg-blue-100 text-blue-600 border border-blue-200' 
                      : isAvailable
                      ? 'hover:bg-gray-100 text-gray-700'
                      : 'text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Icon size={20} className="mr-3" />
                  <div className="flex-1">
                    <div className="font-medium">{item.label}</div>
                    <div className="text-xs text-gray-500">{item.description}</div>
                  </div>
                  {!isAvailable && (
                    <span className="text-xs bg-gray-200 px-2 py-1 rounded">Soon</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default SideMenu;