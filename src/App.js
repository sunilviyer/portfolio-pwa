import React, { useState } from 'react';
// import { Menu } from 'lucide-react';

// ========================================
// STEP 1: CORE WORKING IMPORTS (ALREADY TESTED)
// ========================================
import { usePortfolioData } from './hooks/usePortfolioData';
import { useCurrencyConversion } from './hooks/useCurrencyConversion';
import { calculatePortfolioMetrics } from './utils/calculations';
import SideMenu from './components/navigation/SideMenu';

// ========================================
// STEP 2: BASIC UI COMPONENTS (Uncomment these first)
// ========================================
// import ErrorBanner from './components/common/ErrorBanner';
// import CurrencyToggle from './components/common/CurrencyToggle';
// import BottomNavigation from './components/navigation/BottomNavigation';

// ========================================
// STEP 3: PAGE COMPONENTS (Uncomment these next)
// ========================================
// import DashboardPage from './pages/DashboardPage';
// import OverviewPage from './pages/OverviewPage';
// import SectorsPage from './pages/SectorsPage';
// import DividendsPage from './pages/DividendsPage';
// import ExportPage from './pages/ExportPage';
// import UpdatePage from './pages/UpdatePage';
// import SettingsPage from './pages/SettingsPage';

// ========================================
// STEP 4: ADVANCED COMPONENTS (Uncomment last)
// ========================================
// import LoadingSpinner from './components/common/LoadingSpinner';
// import ProgressBar from './components/common/ProgressBar';
// import Header from './components/navigation/Header';

const App = () => {
  // ========================================
  // CORE DATA HOOKS (WORKING - DON'T CHANGE)
  // ========================================
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

  const metrics = calculatePortfolioMetrics(
    portfolioData,
    cashPositions,
    convertToUSD
  );

  // ========================================
  // UI STATE MANAGEMENT
  // ========================================
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeWorkflow, setActiveWorkflow] = useState('portfolio');
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  
  // STEP 2: Uncomment when ErrorBanner is added
  const [errorBanner, setErrorBanner] = useState(null);

  // ========================================
  // ERROR HANDLING (STEP 2: Uncomment with ErrorBanner)
  // ========================================
  /*
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
  */

  // ========================================
  // WORKFLOW TITLE HELPER
  // ========================================
  const getWorkflowTitle = () => {
    switch (activeWorkflow) {
      case 'portfolio': return 'Portfolio';
      case 'export': return 'Export';
      case 'update': return 'Update';  
      case 'settings': return 'Settings';
      default: return 'Portfolio App';
    }
  };

  // ========================================
  // STEP 3: FULL CONTENT RENDERER (Uncomment with Page Components)
  // ========================================
  const renderContent = () => {
    switch (activeWorkflow) {
      case 'portfolio':
        switch (activeTab) {
          case 'dashboard':
            // STEP 3A: Uncomment when DashboardPage exists
            /*
            return (
              <DashboardPage
                portfolioData={portfolioData}
                metrics={metrics}
                formatCurrency={formatCurrency}
                convertToDisplayCurrency={convertToDisplayCurrency}
                displayCurrency={displayCurrency}
              />
            );
            */
            // TEMPORARY: Basic dashboard until DashboardPage is uncommented
            return (
              <div className="p-4">
                <h2 className="text-2xl font-bold mb-4">Portfolio Dashboard</h2>
                <div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
                  <h3 className="font-bold text-lg mb-2">Portfolio Summary</h3>
                  <div className="space-y-2">
                    <p>Total Value: {formatCurrency(metrics.totalCurrentUSD, 'USD')}</p>
                    <p>Total Return: {formatCurrency(metrics.totalReturn, 'USD')}</p>
                    <p>Return %: {metrics.returnPercentage.toFixed(1)}%</p>
                    <p>Display Currency: {displayCurrency}</p>
                  </div>
                </div>
              </div>
            );

          case 'overview':
            // STEP 3B: Uncomment when OverviewPage exists
            /*
            return (
              <OverviewPage
                portfolioData={portfolioData}
                cashPositions={cashPositions}
                convertToDisplayCurrency={convertToDisplayCurrency}
                formatCurrency={formatCurrency}
                displayCurrency={displayCurrency}
              />
            );
            */
            return <div className="p-4"><h2 className="text-2xl font-bold">Overview (Coming Soon)</h2></div>;

          case 'sectors':
            // STEP 3C: Uncomment when SectorsPage exists
            /*
            return (
              <SectorsPage
                portfolioData={portfolioData}
                convertToDisplayCurrency={convertToDisplayCurrency}
                formatCurrency={formatCurrency}
                displayCurrency={displayCurrency}
              />
            );
            */
            return <div className="p-4"><h2 className="text-2xl font-bold">Sectors (Coming Soon)</h2></div>;

          case 'dividends':
            // STEP 3D: Uncomment when DividendsPage exists
            /*
            return (
              <DividendsPage
                portfolioData={portfolioData}
                updatePortfolioData={updatePortfolioData}
                convertToDisplayCurrency={convertToDisplayCurrency}
                formatCurrency={formatCurrency}
                displayCurrency={displayCurrency}
              />
            );
            */
            return <div className="p-4"><h2 className="text-2xl font-bold">Dividends (Coming Soon)</h2></div>;

          default:
            return <div className="p-4"><h2 className="text-2xl font-bold">Portfolio Dashboard</h2></div>;
        }
      
      case 'export':
        // STEP 3E: Uncomment when ExportPage exists
        /*
        return (
          <ExportPage
            portfolioData={portfolioData}
            cashPositions={cashPositions}
            metrics={metrics}
            formatCurrency={formatCurrency}
          />
        );
        */
        return <div className="p-4"><h2 className="text-2xl font-bold">Export (Coming Soon)</h2></div>;
      
      case 'update':
        // STEP 3F: Uncomment when UpdatePage exists
        /*
        return (
          <UpdatePage
            portfolioData={portfolioData}
            cashPositions={cashPositions}
            updatePortfolioData={updatePortfolioData}
            updateCashPositions={updateCashPositions}
            onError={showErrorBanner}
          />
        );
        */
        return <div className="p-4"><h2 className="text-2xl font-bold">Update (Coming Soon)</h2></div>;
      
      case 'settings':
        // STEP 3G: Uncomment when SettingsPage exists
        /*
        return (
          <SettingsPage
            displayCurrency={displayCurrency}
            onCurrencyChange={setDisplayCurrencyTo}
            portfolioData={portfolioData}
            cashPositions={cashPositions}
            onResetData={resetToInitialData}
          />
        );
        */
        return <div className="p-4"><h2 className="text-2xl font-bold">Settings (Coming Soon)</h2></div>;
      
      default:
        return (
          <div className="p-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Feature Coming Soon</h2>
            <p className="text-gray-600">This feature will be available in a future phase.</p>
          </div>
        );
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen flex flex-col pb-20">
      {/* ========================================
          STEP 2A: ERROR BANNER (Uncomment with ErrorBanner import)
          ======================================== */}
      {/*
      <ErrorBanner
        errorBanner={errorBanner}
        onClose={() => setErrorBanner(null)}
      />
      */}
      
      {/* ========================================
          SIDE MENU (WORKING - DON'T CHANGE)
          ======================================== */}
      <SideMenu
        sideMenuOpen={sideMenuOpen}
        setSideMenuOpen={setSideMenuOpen}
        activeWorkflow={activeWorkflow}
        setActiveWorkflow={setActiveWorkflow}
        setActiveTab={setActiveTab}
        metrics={metrics}
        formatCurrency={formatCurrency}
      />
      
      {/* ========================================
          STEP 4: ADVANCED HEADER (Uncomment with Header component)
          ======================================== */}
      {/*
      <Header
        onMenuClick={() => setSideMenuOpen(true)}
        title={getWorkflowTitle()}
        subtitle={activeWorkflow === 'portfolio' ? `Total: ${formatCurrency(metrics.totalCurrentUSD, 'USD')}` : null}
        exchangeRate={activeWorkflow === 'portfolio' ? cadToUsdRate : null}
        displayCurrency={displayCurrency}
        onCurrencyToggle={setDisplayCurrencyTo}
        showErrorOffset={!!errorBanner}
      />
      */}
      
      {/* ========================================
          STEP 2B: BASIC HEADER (Keep until Header component added)
          ======================================== */}
      <div 
        className="bg-blue-600 text-white p-4"
        // style={{ marginTop: errorBanner ? '60px' : '0' }} // Uncomment with ErrorBanner
      >
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSideMenuOpen(true)}
            className="p-2 hover:bg-blue-700 rounded-lg transition-colors"
            aria-label="Open menu"
          >
            {/* <Menu size={20} /> */} {/* Uncomment with lucide-react import */}
            ☰
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
          
          {/* ========================================
              STEP 2C: CURRENCY TOGGLE (Uncomment with CurrencyToggle component)
              ======================================== */}
          {/*
          <CurrencyToggle
            displayCurrency={displayCurrency}
            onToggle={setDisplayCurrencyTo}
          />
          */}
          {/* TEMPORARY: Basic currency toggle */}
          <button
            onClick={() => setDisplayCurrencyTo(displayCurrency === 'USD' ? 'CAD' : 'USD')}
            className="p-2 hover:bg-blue-700 rounded-lg transition-colors text-sm"
          >
            {displayCurrency === 'USD' ? '🇺🇸' : '🇨🇦'} {displayCurrency}
          </button>
        </div>
      </div>

      {/* ========================================
          MAIN CONTENT AREA
          ======================================== */}
      <div className="flex-1 overflow-y-auto">
        {renderContent()}
      </div>

      {/* ========================================
          STEP 2D: BOTTOM NAVIGATION (Uncomment with BottomNavigation component)
          ======================================== */}
      {/*
      <BottomNavigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeWorkflow={activeWorkflow}
      />
      */}

      {/* ========================================
          TEMPORARY: BASIC NAVIGATION (Remove when BottomNavigation added)
          ======================================== */}
      {activeWorkflow === 'portfolio' && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 z-30">
          <div className="flex justify-around max-w-md mx-auto">
            {[
              { id: 'dashboard', label: 'Dashboard' },
              { id: 'overview', label: 'Overview' },
              { id: 'sectors', label: 'Sectors' },
              { id: 'dividends', label: 'Dividends' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <span className="text-xs mt-1">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ========================================
          DEBUG STATUS BAR (Remove in final version)
          ======================================== */}
      <div className="bg-gray-100 p-2 text-center text-xs text-gray-600">
        Debug: {portfolioData.length} stocks | {activeWorkflow}/{activeTab} | {displayCurrency}
      </div>
    </div>
  );
};

export default App;