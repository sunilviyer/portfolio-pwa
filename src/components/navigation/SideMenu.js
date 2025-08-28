import React from 'react';
import { 
  BarChart3, 
  Download, 
  RefreshCw, 
  Settings, 
  Eye, 
  Newspaper, 
  CreditCard,
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
    },
    { 
      id: 'news', 
      icon: Newspaper, 
      label: 'Market News', 
      available: false,
      description: 'Coming in Phase 2'
    },
    { 
      id: 'transactions', 
      icon: CreditCard, 
      label: 'Transactions', 
      available: false,
      description: 'Coming in Phase 3'
    }
  ];

  const handleWorkflowChange = (workflowId) => {
    const selectedItem = menuItems.find(item => item.id === workflowId);
    
    if (selectedItem?.available) {
      setActiveWorkflow(workflowId);
      
      // Set default tab for portfolio workflow
      if (workflowId === 'portfolio') {
        setActiveTab('dashboard');
      }
      
      setSideMenuOpen(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      {sideMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSideMenuOpen(false)}
        />
      )}
      
      {/* Side Menu */}
      <div className={`fixed left-0 top-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
        sideMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">Portfolio App</h2>
          <button
            onClick={() => setSideMenuOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Menu Content */}
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
                  <Icon size={20} className="mr-3 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium">{item.label}</div>
                    <div className="text-xs text-gray-500 truncate">{item.description}</div>
                  </div>
                  {!isAvailable && (
                    <span className="text-xs bg-gray-200 px-2 py-1 rounded flex-shrink-0">Soon</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-gray-50">
          <div className="text-xs text-gray-500">
            <p className="font-medium">Portfolio PWA v1.0</p>
            <p>Phase 1: Core Foundation</p>
            {metrics && (
              <p className="mt-1 font-medium">
                Total: {formatCurrency(metrics.totalCurrentUSD, 'USD')}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SideMenu;