// File: src/utils/dataMigration.js
// src/utils/dataMigration.js

/**
 * Clears all existing portfolio data from localStorage
 * WARNING: This will permanently delete current data
 */
export const clearExistingPortfolioData = () => {
  const keysToRemove = [
    'portfolioData',
    'cashPositions', 
    'lastApiUpdate',
    'userPreferences',
    'portfolioMetrics'
  ];
  
  keysToRemove.forEach(key => {
    localStorage.removeItem(key);
    console.log(`Removed ${key} from localStorage`);
  });
  
  console.log('✅ All existing portfolio data cleared');
};

/**
 * Backup existing data before migration (optional)
 */
export const backupExistingData = () => {
  const backup = {
    portfolioData: localStorage.getItem('portfolioData'),
    cashPositions: localStorage.getItem('cashPositions'),
    lastApiUpdate: localStorage.getItem('lastApiUpdate'),
    timestamp: new Date().toISOString()
  };
  
  // Save backup to downloadable file
  const blob = new Blob([JSON.stringify(backup, null, 2)], { 
    type: 'application/json' 
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `portfolio_backup_${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  console.log('✅ Data backup created and downloaded');
  return backup;
};

/**
 * Validates new data model structure
 */
export const validateNewDataModel = (stockData) => {
  const requiredFields = [
    'symbol', 'currency', 'originalShares', 'currentShares', 
    'originalPrice', 'currentPrice', 'originalInvestment', 
    'currentValue', 'soldAmount', 'totalRealized', 
    'remainingGainLoss', 'totalGainLoss', 'gainLossPercentage',
    'dividendReceived', 'sector', 'accountType', 'brokerage',
    'lastUpdated', 'purchaseDate'
  ];
  
  const errors = [];
  
  requiredFields.forEach(field => {
    if (!(field in stockData)) {
      errors.push(`Missing required field: ${field}`);
    }
  });
  
  // Validate mathematical consistency
  const calculatedTotalGainLoss = stockData.totalRealized + stockData.remainingGainLoss;
  if (Math.abs(calculatedTotalGainLoss - stockData.totalGainLoss) > 0.01) {
    errors.push(`Total gain/loss calculation error: ${calculatedTotalGainLoss} vs ${stockData.totalGainLoss}`);
  }
  
  if (errors.length > 0) {
    console.error('Data validation errors:', errors);
    return { valid: false, errors };
  }
  
  return { valid: true, errors: [] };
};