import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { DataMigrationTool } from './components/common/DataMigration';

// Import your new modular components
import { ErrorBanner } from './components/common/ErrorBanner';
import { CurrencyToggle } from './components/common/CurrencyToggle';
import { SideMenu } from './components/navigation/SideMenu';
import { Navigation } from './components/navigation/Navigation';

// Import hooks
import { usePortfolioData } from './hooks/usePortfolioData';
import { useCurrencyConversion } from './hooks/useCurrencyConversion';

// Import pages
import { DashboardTab } from './pages/DashboardPage';
import { OverviewTab } from './pages/OverviewPage';
import { SectorBreakdownTab } from './pages/SectorsPage';
// ... other pages

function App() {
  // Portfolio data management
  const { portfolioData, cashPositions, updatePortfolioData, updateCashPositions, addDividend } = usePortfolioData();
  
  // Currency conversion
  const { displayCurrency, setDisplayCurrency, exchangeRate, metrics, formatCurrency } = useCurrencyConversion(portfolioData, cashPositions);

  // UI state
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeWorkflow, setActiveWorkflow] = useState('portfolio');
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [errorBanner, setErrorBanner] = useState(null);

  // ========== ADD MIGRATION STATE HERE ==========
  const [migrationState, setMigrationState] = useState(() => {
    // Check if migration already completed or skipped
    if (localStorage.getItem('migrationCompleted')) return 'completed';
    if (localStorage.getItem('migrationSkipped')) return 'skipped';
    
    // Check if migration is needed by examining existing data structure
    const existingData = localStorage.getItem('portfolioData');
    if (!existingData) return 'completed'; // No data = no migration needed
    
    try {
      const data = JSON.parse(existingData);
      // Check if data uses new model (has soldAmount field)
      const hasNewFields = data[0]?.hasOwnProperty('soldAmount');
      return hasNewFields ? 'completed' : 'needed';
    } catch {
      return 'completed'; // If data is corrupted, consider migration complete
    }
  });

  // Migration handlers
  const handleMigrationComplete = () => {
    localStorage.setItem('migrationCompleted', 'true');
    setMigrationState('completed');
    window.location.reload(); // Reload to initialize with new data
  };

  const handleMigrationSkip = () => {
    localStorage.setItem('migrationSkipped', 'true');
    setMigrationState('skipped');
  };

  const handleStartMigration = () => {
    setMigrationState('migrating');
  };
  // ========== END MIGRATION STATE ==========

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
        portfolioCount: portfolioData.length
      }
    };
    setErrorBanner(errorInfo);
    console.error('Error:', errorInfo);
  };

  const copyTechnicalDetails = () => {
    if (!errorBanner) return;
    
    const details = `ERROR REPORT - ${errorBanner.timestamp}
Message: ${errorBanner.message}
Workflow: ${errorBanner.details.workflow}
Tab: ${errorBanner.details.tab}
Currency: ${errorBanner.details.currency}
Portfolio Size: ${errorBanner.details.portfolioCount}
Stack: ${errorBanner.details.stack}`;

    navigator.clipboard.writeText(details).then(() => {
      alert('Error details copied to clipboard');
    }).catch(() => {
      console.log('Clipboard not available');
    });
  };

  // Content renderer
  const renderContent = () => {
    switch (activeWorkflow) {
      case 'portfolio':
        switch (activeTab) {
          case 'dashboard':
            return <DashboardTab portfolioData={portfolioData} metrics={metrics} formatCurrency={formatCurrency} />;
          case 'overview':
            return <OverviewTab portfolioData={portfolioData} cashPositions={cashPositions} />;
          case 'sectors':
            return <SectorBreakdownTab portfolioData={portfolioData} />;
          case 'dividends':
            return <DividendsTab portfolioData={portfolioData} addDividend={addDividend} />;
          default:
            return <DashboardTab portfolioData={portfolioData} metrics={metrics} formatCurrency={formatCurrency} />;
        }
      // Other workflows...
      default:
        return <div>Feature coming soon</div>;
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen flex flex-col pb-20">
      {/* ========== ADD MIGRATION BANNER HERE (before ErrorBanner) ========== */}
      {migrationState === 'needed' && (
        <div className="bg-yellow-50 p-4 border-b border-yellow-200 relative z-40">
          <div className="max-w-md mx-auto">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-8 h-8 bg-yellow-400 rounded-full">
                  <span className="text-yellow-800 font-bold text-sm">!</span>
                </div>
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-yellow-800">
                  Enhanced Data Model Available
                </p>
                <p className="text-xs text-yellow-700 mt-1">
                  Upgrade to properly track sold positions and realized gains/losses
                </p>
                <div className="mt-3 flex space-x-2">
                  <button 
                    onClick={handleStartMigration}
                    className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                  >
                    Upgrade Now
                  </button>
                  <button 
                    onClick={handleMigrationSkip}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded text-sm transition-colors"
                  >
                    Skip for Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Migration Tool Overlay */}
      {migrationState === 'migrating' && (
        <DataMigrationTool 
          onComplete={handleMigrationComplete}
          onCancel={() => setMigrationState('needed')}
        />
      )}
      {/* ========== END MIGRATION COMPONENTS ========== */}

      <ErrorBanner 
        errorBanner={errorBanner} 
        onCopyDetails={copyTechnicalDetails}
        onClose={() => setErrorBanner(null)}
      />
      
      <SideMenu 
        isOpen={sideMenuOpen}
        onClose={() => setSideMenuOpen(false)}
        activeWorkflow={activeWorkflow}
        onWorkflowChange={setActiveWorkflow}
      />
      
      {/* Header */}
      <div style={{
        backgroundColor: '#2563eb', 
        color: 'white', 
        padding: '1rem',
        // ========== UPDATE MARGIN-TOP TO ACCOUNT FOR MIGRATION BANNER ==========
        marginTop: migrationState === 'needed' ? '80px' : errorBanner ? '60px' : '0'
      }}>
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSideMenuOpen(true)}
            className="p-2 hover:bg-blue-700 rounded-lg transition-colors"
          >
            <Menu size={20} />
          </button>
          
          <div className="text-center flex-1">
            <h1 className="text-xl font-bold">Portfolio</h1>
            <p className="text-sm opacity-90">
              Total: {formatCurrency(metrics.totalPortfolioValueUSD, 'USD')}
            </p>
          </div>
          
          <CurrencyToggle 
            displayCurrency={displayCurrency}
            onCurrencyChange={setDisplayCurrency}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {renderContent()}
      </div>

      <Navigation 
        activeTab={activeTab}
        onTabChange={setActiveTab}
        activeWorkflow={activeWorkflow}
      />
    </div>
  );
}

export default App;