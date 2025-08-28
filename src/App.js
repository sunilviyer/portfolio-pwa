import React, { useState } from 'react';

// STEP 1: Start with just SideMenu (we know this exists)
import SideMenu from './components/navigation/SideMenu';

// STEP 2: Add these imports ONE BY ONE after Step 1 works
import ErrorBanner from './components/common/ErrorBanner';
// import CurrencyToggle from './components/common/CurrencyToggle';
// import BottomNavigation from './components/navigation/BottomNavigation';

// STEP 3: Add page imports ONE BY ONE
// import DashboardPage from './pages/DashboardPage';

// STEP 4: Add hooks ONE BY ONE  
// import { usePortfolioData } from './hooks/usePortfolioData';
// import { useCurrencyConversion } from './hooks/useCurrencyConversion';
// import { calculatePortfolioMetrics } from './utils/calculations';

const App = () => {
  // Minimal state for testing
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [activeWorkflow, setActiveWorkflow] = useState('portfolio');
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock data for SideMenu to work
  const mockMetrics = { totalCurrentUSD: 50000 };
  const mockFormatCurrency = (value) => `$${value.toLocaleString()}`;

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen flex flex-col pb-20">
      {/* Basic Header */}
      <div className="bg-blue-600 text-white p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSideMenuOpen(true)}
            className="p-2 hover:bg-blue-700 rounded-lg transition-colors"
          >
            ☰
          </button>
          
          <div className="text-center flex-1">
            <h1 className="text-xl font-bold">Portfolio App Debug</h1>
            <p className="text-sm opacity-90">Step 1: SideMenu Test</p>
          </div>
          
          <div className="w-8"></div>
        </div>
      </div>

      {/* Test SideMenu */}
      <SideMenu
        sideMenuOpen={sideMenuOpen}
        setSideMenuOpen={setSideMenuOpen}
        activeWorkflow={activeWorkflow}
        setActiveWorkflow={setActiveWorkflow}
        setActiveTab={setActiveTab}
        metrics={mockMetrics}
        formatCurrency={mockFormatCurrency}
      />

      {/* Main Content */}
      <div className="flex-1 p-4">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Debug Status</h2>
          <div className="space-y-2">
            <p className="text-green-600">✓ App.js loads successfully</p>
            <p className="text-green-600">✓ SideMenu component renders</p>
            <p className="text-blue-600">→ Click the menu button (☰) to test SideMenu</p>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded">
            <h3 className="font-bold text-blue-800">Next Steps:</h3>
            <ol className="list-decimal list-inside mt-2 space-y-1 text-sm text-blue-700">
              <li>Verify SideMenu opens/closes correctly</li>
              <li>Uncomment ErrorBanner import and test</li>
              <li>Uncomment CurrencyToggle import and test</li>
              <li>Continue adding imports one by one</li>
              <li>Create missing components as needed</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;