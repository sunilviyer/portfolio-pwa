import React, { useState } from 'react';
import { Menu } from 'lucide-react';

// Component imports - Add these one by one as you create the files
import ErrorBanner from './components/common/ErrorBanner';
import CurrencyToggle from './components/common/CurrencyToggle';
import SideMenu from './components/navigation/SideMenu';
import BottomNavigation from './components/navigation/BottomNavigation';

// Page imports - Add these one by one
import DashboardPage from './pages/DashboardPage';
import OverviewPage from './pages/OverviewPage';
import SectorsPage from './pages/SectorsPage';
import DividendsPage from './pages/DividendsPage';
import ExportPage from './pages/ExportPage';
import UpdatePage from './pages/UpdatePage';
import SettingsPage from './pages/SettingsPage';

// Hook imports - Add these one by one
import { usePortfolioData } from './hooks/usePortfolioData';
import { useCurrencyConversion } from './hooks/useCurrencyConversion';

// Utility imports
import { calculatePortfolioMetrics } from './utils/calculations';

const App = () => {
  // Custom hooks for data management
  const {
    portfolioData,
    cashPositions,
    updatePortfolioData,
    updateCashPositions,
    resetToInitialData
  } = usePortfolioData();

  const {
    displayCurrency,
    convertToDisplayCurrency,
    convertToUSD,
    formatCurrency,
    setDisplayCurrencyTo,
    cadToUsdRate
  } = useCurrencyConversion(cashPositions);

  // Calculate portfolio metrics
  const metrics = calculatePortfolioMetrics(
    portfolioData,
    cashPositions,
    convertToUSD
  );

  // UI State
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeWorkflow, setActiveWorkflow] = useState('portfolio');
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [errorBanner, setErrorBanner] = useState(null);

  // Error handling
  const showErrorBanner = (error) => {
    const errorInfo = {
      message: error.message || 'An unexpected error occurred',
      timestamp: new Date().toISOString(),
      details: {
        stack: error.stack || 'No stack trace',
        workflow: activeWorkflow,
        tab: activeTab,
        currency: displayCurrency,
        portfolioCount: portfolioData.length,
        ...error.details
      }
    };
    setErrorBanner(errorInfo);
    console.error('Application Error:', errorInfo);
  };

  // Content renderer
  const renderContent = () => {
    switch (activeWorkflow) {
      case 'portfolio':
        switch (activeTab) {
          case 'dashboard':
            return (
              <DashboardPage
                portfolioData={portfolioData}
                metrics={metrics}
                formatCurrency={formatCurrency}
                convertToDisplayCurrency={convertToDisplayCurrency}
                displayCurrency={displayCurrency}
              />
            );
          case 'overview':
            return (
              <OverviewPage
                portfolioData={portfolioData}
                cashPositions={cashPositions}
                convertToDisplayCurrency={convertToDisplayCurrency}
                formatCurrency={formatCurrency}
                displayCurrency={displayCurrency}
              />
            );
          case 'sectors':
            return (
              <SectorsPage
                portfolioData={portfolioData}
                convertToDisplayCurrency={convertToDisplayCurrency}
                formatCurrency={formatCurrency}
                displayCurrency={displayCurrency}
              />
            );
          case 'dividends':
            return (
              <DividendsPage
                portfolioData={portfolioData}
                updatePortfolioData={updatePortfolioData}
                convertToDisplayCurrency={convertToDisplayCurrency}
                formatCurrency={formatCurrency}
                displayCurrency={displayCurrency}
              />
            );
          default:
            return (
              <DashboardPage
                portfolioData={portfolioData}
                metrics={metrics}
                formatCurrency={formatCurrency}
                convertToDisplayCurrency={convertToDisplayCurrency}
                displayCurrency={displayCurrency}
              />
            );
        }
      
      case 'export':
        return (
          <ExportPage
            portfolioData={portfolioData}
            cashPositions={cashPositions}
            metrics={metrics}
            formatCurrency={formatCurrency}
          />
        );
      
      case 'update':
        return (
          <UpdatePage
            portfolioData={portfolioData}
            cashPositions={cashPositions}
            updatePortfolioData={updatePortfolioData}
            updateCashPositions={updateCashPositions}
            onError={showErrorBanner}
          />
        );
      
      case 'settings':
        return (
          <SettingsPage
            displayCurrency={displayCurrency}
            onCurrencyChange={setDisplayCurrencyTo}
            portfolioData={portfolioData}
            cashPositions={cashPositions}
            onResetData={resetToInitialData}
          />
        );
      
      default:
        return (
          <div className="p-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Feature Coming Soon</h2>
            <p className="text-gray-600">This feature will be available in a future phase.</p>
          </div>
        );
    }
  };

  // Get workflow title
  const getWorkflowTitle = () => {
    switch (activeWorkflow) {
      case 'portfolio': return 'Portfolio';
      case 'export': return 'Export';
      case 'update': return 'Update';  
      case 'settings': return 'Settings';
      default: return 'Portfolio App';
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen flex flex-col pb-20">
      {/* Error Banner */}
      <ErrorBanner
        errorBanner={errorBanner}
        onClose={() => setErrorBanner(null)}
      />
      
      {/* Side Menu */}
      <SideMenu
        sideMenuOpen={sideMenuOpen}
        setSideMenuOpen={setSideMenuOpen}
        activeWorkflow={activeWorkflow}
        setActiveWorkflow={setActiveWorkflow}
        setActiveTab={setActiveTab}
        metrics={metrics}
        formatCurrency={formatCurrency}
      />
      
      {/* Header */}
      <div 
        className="bg-blue-600 text-white p-4"
        style={{ marginTop: errorBanner ? '60px' : '0' }}
      >
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSideMenuOpen(true)}
            className="p-2 hover:bg-blue-700 rounded-lg transition-colors"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
          
          <div className="text-center flex-1">
            <h1 className="text-xl font-bold">{getWorkflowTitle()}</h1>
            {activeWorkflow === 'portfolio' && (
              <>
                <p className="text-sm opacity-90">
                  Total: {formatCurrency(metrics.totalCurrentUSD, 'USD')}
                </p>
                <p className="text-xs opacity-75">
                  1 CAD = ${cadToUsdRate.toFixed(4)} USD
                </p>
              </>
            )}
          </div>
          
          <CurrencyToggle
            displayCurrency={displayCurrency}
            onToggle={setDisplayCurrencyTo}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {renderContent()}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeWorkflow={activeWorkflow}
      />
    </div>
  );
};

export default App;