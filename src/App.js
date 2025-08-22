import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, List, PieChart, DollarSign, RefreshCw, ArrowLeft, Zap, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { PieChart as RechartsPieChart, Cell, ResponsiveContainer, Tooltip, Pie } from 'recharts';

const PortfolioApp = () => {
  // Alpha Vantage API Configuration
  const ALPHA_VANTAGE_API_KEY = "4IBG3NW8PIR2ITBF";
  const ALPHA_VANTAGE_BASE_URL = "https://www.alphavantage.co/query";

  // Initial hardcoded data (used ONLY if no localStorage data exists)
  const INITIAL_PORTFOLIO_DATA = [
    {
      symbol: 'PLTR',
      currency: 'USD',
      originalShares: 100.00,
      currentShares: 100.00,
      originalPrice: 24.92,
      currentPrice: 171.97,
      originalInvestment: 2492.00,
      currentValue: 17197.00,
      gainLoss: 14705.00,
      dividendReceived: 0.00,
      sector: 'Technology',
      accountType: 'RRSP',
      brokerage: 'Wealthsimple',
      lastUpdated: '2025-08-20',
      purchaseDate: '2025-01-01'
    },
    {
      symbol: 'NVDA',
      currency: 'USD',
      originalShares: 100.00,
      currentShares: 100.00,
      originalPrice: 114.17,
      currentPrice: 182.27,
      originalInvestment: 11417.00,
      currentValue: 18227.00,
      gainLoss: 6810.00,
      dividendReceived: 0.00,
      sector: 'Technology',
      accountType: 'RRSP',
      brokerage: 'Wealthsimple',
      lastUpdated: '2025-08-20',
      purchaseDate: '2025-01-01'
    },
    {
      symbol: 'GOOGL',
      currency: 'USD',
      originalShares: 99.86,
      currentShares: 100.46,
      originalPrice: 185.89,
      currentPrice: 203.82,
      originalInvestment: 18556.33,
      currentValue: 20479.73,
      gainLoss: 1787.30,
      dividendReceived: 136.10,
      sector: 'Technology',
      accountType: 'RRSP',
      brokerage: 'Wealthsimple',
      lastUpdated: '2025-08-20',
      purchaseDate: '2025-01-01'
    },
    {
      symbol: 'XLV',
      currency: 'USD',
      originalShares: 85.00,
      currentShares: 85.00,
      originalPrice: 136.40,
      currentPrice: 136.80,
      originalInvestment: 11594.00,
      currentValue: 11628.00,
      gainLoss: 34.00,
      dividendReceived: 0.00,
      sector: 'Healthcare',
      accountType: 'RRSP',
      brokerage: 'Wealthsimple',
      lastUpdated: '2025-08-20',
      purchaseDate: '2025-01-01'
    },
    {
      symbol: 'PM',
      currency: 'USD',
      originalShares: 18.00,
      currentShares: 18.00,
      originalPrice: 166.25,
      currentPrice: 166.45,
      originalInvestment: 2992.50,
      currentValue: 2996.10,
      gainLoss: 3.60,
      dividendReceived: 0.00,
      sector: 'Consumer Staples',
      accountType: 'RRSP',
      brokerage: 'Wealthsimple',
      lastUpdated: '2025-08-20',
      purchaseDate: '2025-01-01'
    },
    {
      symbol: 'TLT',
      currency: 'USD',
      originalShares: 120.00,
      currentShares: 120.00,
      originalPrice: 86.40,
      currentPrice: 86.48,
      originalInvestment: 10368.00,
      currentValue: 10377.60,
      gainLoss: 9.60,
      dividendReceived: 0.00,
      sector: 'Bonds',
      accountType: 'RRSP',
      brokerage: 'Wealthsimple',
      lastUpdated: '2025-08-20',
      purchaseDate: '2025-01-01'
    },
    {
      symbol: 'CMG',
      currency: 'USD',
      originalShares: 120.00,
      currentShares: 120.00,
      originalPrice: 62.48,
      currentPrice: 43.66,
      originalInvestment: 7497.60,
      currentValue: 5239.20,
      gainLoss: -2258.40,
      dividendReceived: 0.00,
      sector: 'Consumer Discretionary',
      accountType: 'RRSP',
      brokerage: 'Wealthsimple',
      lastUpdated: '2025-08-20',
      purchaseDate: '2025-01-01'
    },
    {
      symbol: 'TNXP',
      currency: 'USD',
      originalShares: 16.00,
      currentShares: 16.00,
      originalPrice: 53.51,
      currentPrice: 44.40,
      originalInvestment: 856.16,
      currentValue: 710.40,
      gainLoss: -145.76,
      dividendReceived: 0.00,
      sector: 'Healthcare',
      accountType: 'RRSP',
      brokerage: 'Wealthsimple',
      lastUpdated: '2025-08-20',
      purchaseDate: '2025-01-01'
    },
    {
      symbol: 'IEF',
      currency: 'USD',
      originalShares: 121.00,
      currentShares: 121.00,
      originalPrice: 95.20,
      currentPrice: 95.20,
      originalInvestment: 11519.20,
      currentValue: 11519.20,
      gainLoss: 0.00,
      dividendReceived: 0.00,
      sector: 'Bonds',
      accountType: 'RRSP',
      brokerage: 'Wealthsimple',
      lastUpdated: '2025-08-20',
      purchaseDate: '2025-01-01'
    },
    {
      symbol: 'XLU',
      currency: 'USD',
      originalShares: 100.00,
      currentShares: 100.00,
      originalPrice: 85.50,
      currentPrice: 85.50,
      originalInvestment: 8550.00,
      currentValue: 8550.00,
      gainLoss: 0.00,
      dividendReceived: 0.00,
      sector: 'Utilities',
      accountType: 'RRSP',
      brokerage: 'Wealthsimple',
      lastUpdated: '2025-08-20',
      purchaseDate: '2025-01-01'
    },
    {
      symbol: 'XDIV',
      currency: 'CAD',
      originalShares: 76.31,
      currentShares: 82.48,
      originalPrice: 26.72,
      currentPrice: 32.69,
      originalInvestment: 2039.05,
      currentValue: 2696.30,
      gainLoss: 455.70,
      dividendReceived: 201.55,
      sector: 'Diversified',
      accountType: 'RRSP',
      brokerage: 'Wealthsimple',
      lastUpdated: '2025-08-20',
      purchaseDate: '2025-01-01'
    },
    {
      symbol: 'XID',
      currency: 'CAD',
      originalShares: 23.93,
      currentShares: 25.94,
      originalPrice: 56.60,
      currentPrice: 54.93,
      originalInvestment: 1354.45,
      currentValue: 1424.89,
      gainLoss: -40.60,
      dividendReceived: 111.04,
      sector: 'International',
      accountType: 'RRSP',
      brokerage: 'Wealthsimple',
      lastUpdated: '2025-08-20',
      purchaseDate: '2025-01-01'
    },
    {
      symbol: 'ENB',
      currency: 'CAD',
      originalShares: 164.00,
      currentShares: 164.00,
      originalPrice: 64.87,
      currentPrice: 64.65,
      originalInvestment: 10638.68,
      currentValue: 10602.60,
      gainLoss: -36.08,
      dividendReceived: 0.00,
      sector: 'Energy',
      accountType: 'RRSP',
      brokerage: 'Wealthsimple',
      lastUpdated: '2025-08-20',
      purchaseDate: '2025-01-01'
    },
    {
      symbol: 'QQC',
      currency: 'CAD',
      originalShares: 307.32,
      currentShares: 256.09,
      originalPrice: 32.57,
      currentPrice: 38.84,
      originalInvestment: 10013.42,
      currentValue: 9946.42,
      gainLoss: 1944.70,
      dividendReceived: 1900.30,
      sector: 'Technology',
      accountType: 'RRSP',
      brokerage: 'Wealthsimple',
      lastUpdated: '2025-08-20',
      purchaseDate: '2025-01-01'
    },
    {
      symbol: 'XEG',
      currency: 'CAD',
      originalShares: 550.06,
      currentShares: 580.77,
      originalPrice: 18.55,
      currentPrice: 17.00,
      originalInvestment: 10203.20,
      currentValue: 9873.09,
      gainLoss: -934.62,
      dividendReceived: 603.51,
      sector: 'Energy',
      accountType: 'RRSP',
      brokerage: 'Wealthsimple',
      lastUpdated: '2025-08-20',
      purchaseDate: '2025-01-01'
    },
    {
      symbol: 'RS',
      currency: 'CAD',
      originalShares: 468.76,
      currentShares: 514.14,
      originalPrice: 10.68,
      currentPrice: 9.93,
      originalInvestment: 5005.60,
      currentValue: 5105.53,
      gainLoss: -351.33,
      dividendReceived: 451.26,
      sector: 'Real Estate',
      accountType: 'RRSP',
      brokerage: 'Wealthsimple',
      lastUpdated: '2025-08-20',
      purchaseDate: '2025-01-01'
    }
  ];

  const INITIAL_CASH_POSITIONS = [
    { currency: 'USD', amount: 23432.13, dateAdded: '2025-01-01' },
    { currency: 'CAD', amount: 48.02, dateAdded: '2025-01-01' }
  ];

  // Alpha Vantage API Functions
  const AlphaVantageAPI = {
    async getStockQuote(symbol) {
      try {
        const response = await fetch(`${ALPHA_VANTAGE_BASE_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`);
        const data = await response.json();
        
        if (data["Error Message"]) {
          throw new Error(`API Error: ${data["Error Message"]}`);
        }
        
        if (data["Note"]) {
          throw new Error(`Rate Limit: ${data["Note"]}`);
        }
        
        const quote = data["Global Quote"];
        if (!quote) {
          throw new Error(`No data found for symbol: ${symbol}`);
        }
        
        return {
          symbol: quote["01. symbol"],
          price: parseFloat(quote["05. price"]),
          change: parseFloat(quote["09. change"]),
          changePercent: quote["10. change percent"].replace('%', ''),
          lastUpdated: new Date().toISOString(),
          volume: parseInt(quote["06. volume"]),
          high: parseFloat(quote["03. high"]),
          low: parseFloat(quote["04. low"]),
          open: parseFloat(quote["02. open"]),
          previousClose: parseFloat(quote["08. previous close"])
        };
        
      } catch (error) {
        console.error(`Error fetching quote for ${symbol}:`, error);
        throw error;
      }
    },

    async updatePortfolioPrices(currentPortfolio, onProgress) {
      console.log("🔄 Starting automated price update...");
      
      const results = [];
      const errors = [];
      const totalStocks = currentPortfolio.length;
      
      // Only update USD stocks (Canadian stocks not available on Alpha Vantage free tier easily)
      const usdStocks = currentPortfolio.filter(stock => stock.currency === 'USD');
      
      try {
        for (let i = 0; i < usdStocks.length; i++) {
          const stock = usdStocks[i];
          
          try {
            if (onProgress) {
              onProgress({
                current: i + 1,
                total: usdStocks.length,
                symbol: stock.symbol,
                status: 'fetching'
              });
            }
            
            console.log(`Fetching ${stock.symbol} (${i + 1}/${usdStocks.length})...`);
            const quote = await this.getStockQuote(stock.symbol);
            results.push({ ...quote, originalSymbol: stock.symbol });
            
            // Rate limiting: wait between requests (free tier allows 5 calls per minute)
            if (i < usdStocks.length - 1) {
              console.log(`Waiting 12 seconds before next request...`);
              if (onProgress) {
                onProgress({
                  current: i + 1,
                  total: usdStocks.length,
                  symbol: stock.symbol,
                  status: 'waiting'
                });
              }
              await new Promise(resolve => setTimeout(resolve, 12000));
            }
            
          } catch (error) {
            console.error(`Failed to fetch ${stock.symbol}:`, error.message);
            errors.push({ symbol: stock.symbol, error: error.message });
          }
        }
        
        // Update portfolio data
        const updatedPortfolio = currentPortfolio.map(stock => {
          const updatedQuote = results.find(quote => quote.originalSymbol === stock.symbol);
          
          if (updatedQuote && stock.currency === 'USD') {
            const newCurrentValue = stock.currentShares * updatedQuote.price;
            const newGainLoss = newCurrentValue - stock.originalInvestment;
            
            return {
              ...stock,
              currentPrice: updatedQuote.price,
              currentValue: newCurrentValue,
              gainLoss: newGainLoss,
              lastUpdated: new Date().toISOString().split('T')[0]
            };
          } else {
            return stock; // Keep CAD stocks unchanged
          }
        });
        
        console.log(`✅ Successfully updated ${results.length} USD stocks`);
        if (errors.length > 0) {
          console.warn(`⚠️ Failed to update ${errors.length} stocks:`, errors);
        }
        
        return {
          portfolio: updatedPortfolio,
          updateStats: {
            successful: results.length,
            failed: errors.length,
            totalProcessed: usdStocks.length,
            timestamp: new Date().toISOString()
          }
        };
        
      } catch (error) {
        console.error("❌ Portfolio update failed:", error);
        throw error;
      }
    }
  };

  // Helper functions for localStorage
  const saveToLocalStorage = (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      console.log(`✅ Saved ${key} to localStorage:`, data.length || Object.keys(data).length);
    } catch (error) {
      console.error(`❌ Failed to save ${key}:`, error);
    }
  };

  const loadFromLocalStorage = (key, fallback) => {
    try {
      const saved = localStorage.getItem(key);
      if (saved && saved !== 'undefined') {
        const parsed = JSON.parse(saved);
        console.log(`✅ Loaded ${key} from localStorage:`, parsed.length || Object.keys(parsed).length);
        return parsed;
      }
    } catch (error) {
      console.error(`❌ Failed to load ${key}:`, error);
    }
    console.log(`📁 Using initial ${key} data`);
    return fallback;
  };

  // Load data from localStorage or use initial data
  const [portfolioData, setPortfolioData] = useState(() => 
    loadFromLocalStorage('portfolioData', INITIAL_PORTFOLIO_DATA)
  );
  
  const [cashPositions, setCashPositions] = useState(() => 
    loadFromLocalStorage('cashPositions', INITIAL_CASH_POSITIONS)
  );

  const [activeTab, setActiveTab] = useState('performance');
  const [selectedSector, setSelectedSector] = useState(null);

  // API Update States
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateProgress, setUpdateProgress] = useState(null);
  const [lastApiUpdate, setLastApiUpdate] = useState(() => 
    loadFromLocalStorage('lastApiUpdate', null)
  );

  // Form states for adding new investments
  const [newCashForm, setNewCashForm] = useState({
    currency: 'USD',
    amount: '',
    dateAdded: new Date().toISOString().split('T')[0]
  });

  // Conversion rate for display purposes (approximate)
  const CAD_TO_USD_RATE = 0.74;

  // Available sectors for dropdown
  const SECTORS = [
    'Technology', 'Healthcare', 'Energy', 'Financials', 'Consumer Discretionary',
    'Consumer Staples', 'Real Estate', 'Utilities', 'Bonds', 'International', 'Diversified'
  ];

  // Available account types for dropdown
  const ACCOUNT_TYPES = [
    'RRSP', 'TFSA', 'Non-Registered'
  ];

  // Updated data management functions that save to localStorage
  const updatePortfolioData = (newData) => {
    setPortfolioData(newData);
    saveToLocalStorage('portfolioData', newData);
  };

  const updateCashPositions = (newCash) => {
    setCashPositions(newCash);
    saveToLocalStorage('cashPositions', newCash);
  };

  // API Update Functions
  const handleApiUpdate = async () => {
    setIsUpdating(true);
    setUpdateProgress({ current: 0, total: 0, symbol: 'Starting...', status: 'starting' });
    
    try {
      const result = await AlphaVantageAPI.updatePortfolioPrices(portfolioData, setUpdateProgress);
      updatePortfolioData(result.portfolio);
      
      const updateInfo = {
        timestamp: new Date().toISOString(),
        stats: result.updateStats
      };
      setLastApiUpdate(updateInfo);
      saveToLocalStorage('lastApiUpdate', updateInfo);
      
      alert(`✅ Portfolio updated! ${result.updateStats.successful} stocks updated successfully.`);
      
    } catch (error) {
      console.error('API update failed:', error);
      alert(`❌ Update failed: ${error.message}`);
    } finally {
      setIsUpdating(false);
      setUpdateProgress(null);
    }
  };

  // Test single stock API
  const testApiWithStock = async (symbol) => {
    try {
      console.log(`Testing API with ${symbol}...`);
      const quote = await AlphaVantageAPI.getStockQuote(symbol);
      alert(`✅ API Test Success!\n\n${symbol}: $${quote.price}\nChange: ${quote.change >= 0 ? '+' : ''}${quote.change} (${quote.changePercent}%)`);
    } catch (error) {
      alert(`❌ API Test Failed: ${error.message}`);
    }
  };

  // Data management functions (keeping existing ones)
  const exportPortfolioData = () => {
    const exportData = {
      portfolioData,
      cashPositions,
      lastApiUpdate,
      exportDate: new Date().toISOString(),
      version: '1.1'
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { 
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
    
    alert('✅ Portfolio backup downloaded!');
  };

  const importPortfolioData = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importData = JSON.parse(e.target.result);
        
        if (importData.portfolioData && importData.cashPositions) {
          updatePortfolioData(importData.portfolioData);
          updateCashPositions(importData.cashPositions);
          
          if (importData.lastApiUpdate) {
            setLastApiUpdate(importData.lastApiUpdate);
            saveToLocalStorage('lastApiUpdate', importData.lastApiUpdate);
          }
          
          alert('✅ Portfolio data imported successfully!');
        } else {
          alert('❌ Invalid backup file format');
        }
      } catch (error) {
        alert('❌ Failed to import data: ' + error.message);
      }
    };
    reader.readAsText(file);
    event.target.value = ''; // Reset file input
  };

  const resetToInitialData = () => {
    if (window.confirm('⚠️ This will reset all your portfolio data to initial values. Are you sure?')) {
      updatePortfolioData(INITIAL_PORTFOLIO_DATA);
      updateCashPositions(INITIAL_CASH_POSITIONS);
      setLastApiUpdate(null);
      saveToLocalStorage('lastApiUpdate', null);
      alert('🔄 Portfolio reset to initial data');
    }
  };

  const clearAllData = () => {
    if (window.confirm('⚠️ This will delete ALL portfolio data permanently. Are you sure?')) {
      if (window.confirm('🚨 FINAL WARNING: This cannot be undone. Continue?')) {
        localStorage.removeItem('portfolioData');
        localStorage.removeItem('cashPositions');
        localStorage.removeItem('lastApiUpdate');
        updatePortfolioData([]);
        updateCashPositions([]);
        setLastApiUpdate(null);
        alert('🗑️ All data cleared');
      }
    }
  };

  // Calculate total portfolio metrics
  const calculatePortfolioMetrics = () => {
    let totalOriginalUSD = 0;
    let totalCurrentUSD = 0;
    let totalDividendsUSD = 0;

    portfolioData.forEach(stock => {
      const conversionRate = stock.currency === 'CAD' ? CAD_TO_USD_RATE : 1;
      totalOriginalUSD += stock.originalInvestment * conversionRate;
      totalCurrentUSD += stock.currentValue * conversionRate;
      totalDividendsUSD += stock.dividendReceived * conversionRate;
    });

    // Add cash positions
    cashPositions.forEach(cash => {
      const conversionRate = cash.currency === 'CAD' ? CAD_TO_USD_RATE : 1;
      totalCurrentUSD += cash.amount * conversionRate;
    });

    const totalReturn = totalCurrentUSD - totalOriginalUSD;
    const returnPercentage = (totalReturn / totalOriginalUSD) * 100;

    return {
      totalOriginalUSD,
      totalCurrentUSD,
      totalDividendsUSD,
      totalReturn,
      returnPercentage
    };
  };

  const metrics = calculatePortfolioMetrics();

  // Keep all your existing tab components (PerformanceTab, OverviewTab, SectorBreakdownTab, DividendTab)
  // I'm keeping these unchanged to save space, but they remain exactly the same

  // Performance Tab Component (unchanged)
  const PerformanceTab = () => (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold text-center mb-6">Portfolio Performance</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800">Original Investment</h3>
          <p className="text-2xl font-bold text-blue-900">
            ${metrics.totalOriginalUSD.toLocaleString('en-US', {minimumFractionDigits: 2})} USD
          </p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-semibold text-green-800">Current Value</h3>
          <p className="text-2xl font-bold text-green-900">
            ${metrics.totalCurrentUSD.toLocaleString('en-US', {minimumFractionDigits: 2})} USD
          </p>
        </div>
        
        <div className={`p-4 rounded-lg ${metrics.totalReturn >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
          <h3 className={`font-semibold ${metrics.totalReturn >= 0 ? 'text-green-800' : 'text-red-800'}`}>
            Total Return
          </h3>
          <p className={`text-2xl font-bold ${metrics.totalReturn >= 0 ? 'text-green-900' : 'text-red-900'}`}>
            ${metrics.totalReturn.toLocaleString('en-US', {minimumFractionDigits: 2})} USD
          </p>
          <p className={`text-sm ${metrics.totalReturn >= 0 ? 'text-green-700' : 'text-red-700'}`}>
            ({metrics.returnPercentage.toFixed(1)}%)
          </p>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="font-semibold text-purple-800">Dividends Received</h3>
          <p className="text-2xl font-bold text-purple-900">
            ${metrics.totalDividendsUSD.toLocaleString('en-US', {minimumFractionDigits: 2})} USD
          </p>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Top Performers</h3>
        {portfolioData
          .sort((a, b) => b.gainLoss - a.gainLoss)
          .slice(0, 3)
          .map((stock, index) => {
            const conversionRate = stock.currency === 'CAD' ? CAD_TO_USD_RATE : 1;
            const gainLossUSD = stock.gainLoss * conversionRate;
            const returnPct = (stock.gainLoss / stock.originalInvestment) * 100;
            
            return (
              <div key={stock.symbol} className="flex justify-between items-center py-2 border-b">
                <span className="font-medium">{stock.symbol}</span>
                <div className="text-right">
                  <span className={`font-bold ${gainLossUSD >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ${gainLossUSD.toLocaleString('en-US', {minimumFractionDigits: 2})} USD
                  </span>
                  <div className={`text-sm ${gainLossUSD >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    ({returnPct.toFixed(1)}%)
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {/* API Status Card */}
      {lastApiUpdate && (
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="font-semibold text-blue-800 mb-2">📡 Last API Update</h3>
          <p className="text-sm text-blue-700">
            {new Date(lastApiUpdate.timestamp).toLocaleString()}
          </p>
          <p className="text-sm text-blue-600">
            Updated {lastApiUpdate.stats.successful} of {lastApiUpdate.stats.totalProcessed} USD stocks
          </p>
        </div>
      )}
    </div>
  );

  // [Keep OverviewTab, SectorBreakdownTab, and DividendTab unchanged - they're too long to include here]
  // I'm showing just the structure to save space

  const OverviewTab = () => {
    // ... existing OverviewTab code unchanged ...
    return <div>Overview Tab - Keep existing code</div>;
  };

  const SectorBreakdownTab = () => {
    // ... existing SectorBreakdownTab code unchanged ...
    return <div>Sector Tab - Keep existing code</div>;
  };

  const DividendTab = () => {
    // ... existing DividendTab code unchanged ...
    return <div>Dividend Tab - Keep existing code</div>;
  };

  // ENHANCED Update Price Tab with Alpha Vantage Integration
  const UpdatePriceTab = () => {
    const [updateMode, setUpdateMode] = useState('api');
    
    const [localNewStockForm, setLocalNewStockForm] = useState({
      symbol: '',
      currency: 'USD',
      shares: '',
      price: '',
      sector: '',
      accountType: 'RRSP',
      purchaseDate: new Date().toISOString().split('T')[0]
    });
    
    const [priceForm, setPriceForm] = useState({
      symbol: '',
      newPrice: ''
    });

    const handleUpdatePrice = () => {
      if (!priceForm.symbol || !priceForm.newPrice) return;
      
      const updatedData = portfolioData.map(stock => {
        if (stock.symbol === priceForm.symbol) {
          const newPrice = parseFloat(priceForm.newPrice);
          const newCurrentValue = stock.currentShares * newPrice;
          const newGainLoss = newCurrentValue - stock.originalInvestment;
          
          return {
            ...stock,
            currentPrice: newPrice,
            currentValue: newCurrentValue,
            gainLoss: newGainLoss,
            lastUpdated: new Date().toISOString().split('T')[0]
          };
        }
        return stock;
      });
      
      updatePortfolioData(updatedData);
      setPriceForm({ symbol: '', newPrice: '' });
    };

    const handleAddStock = () => {
      if (!localNewStockForm.symbol || !localNewStockForm.shares || !localNewStockForm.price || !localNewStockForm.sector) return;
      
      const shares = parseFloat(localNewStockForm.shares);
      const price = parseFloat(localNewStockForm.price);
      const investment = shares * price;
      
      const newStock = {
        symbol: localNewStockForm.symbol.toUpperCase(),
        currency: localNewStockForm.currency,
        originalShares: shares,
        currentShares: shares,
        originalPrice: price,
        currentPrice: price,
        originalInvestment: investment,
        currentValue: investment,
        gainLoss: 0,
        dividendReceived: 0,
        sector: localNewStockForm.sector,
        accountType: localNewStockForm.accountType,
        brokerage: 'Wealthsimple',
        lastUpdated: new Date().toISOString().split('T')[0],
        purchaseDate: localNewStockForm.purchaseDate
      };
      
      const updatedData = [...portfolioData, newStock];
      updatePortfolioData(updatedData);
      
      setLocalNewStockForm({
        symbol: '',
        currency: 'USD',
        shares: '',
        price: '',
        sector: '',
        accountType: 'RRSP',
        purchaseDate: new Date().toISOString().split('T')[0]
      });
    };

    const handleAddCash = () => {
      if (!newCashForm.amount) return;
      
      const amount = parseFloat(newCashForm.amount);
      
      const existingCashIndex = cashPositions.findIndex(cash => cash.currency === newCashForm.currency);
      
      if (existingCashIndex >= 0) {
        const updatedCash = cashPositions.map((cash, index) => 
          index === existingCashIndex 
            ? { ...cash, amount: cash.amount + amount }
            : cash
        );
        updateCashPositions(updatedCash);
      } else {
        const updatedCash = [...cashPositions, {
          currency: newCashForm.currency,
          amount: amount,
          dateAdded: newCashForm.dateAdded
        }];
        updateCashPositions(updatedCash);
      }
      
      setNewCashForm({
        currency: 'USD',
        amount: '',
        dateAdded: new Date().toISOString().split('T')[0]
      });
    };

    const [dividendForm, setDividendForm] = useState({
      symbol: '',
      dividendAmount: '',
      sharesReceived: '',
      currency: 'USD'
    });

    const handleAddDividend = () => {
      if (!dividendForm.symbol || !dividendForm.dividendAmount) return;
      
      const updatedData = portfolioData.map(stock => {
        if (stock.symbol === dividendForm.symbol) {
          const newDividendAmount = parseFloat(dividendForm.dividendAmount) || 0;
          const newShares = parseFloat(dividendForm.sharesReceived) || 0;
          
          return {
            ...stock,
            dividendReceived: stock.dividendReceived + newDividendAmount,
            currentShares: stock.currentShares + newShares,
            currentValue: (stock.currentShares + newShares) * stock.currentPrice
          };
        }
        return stock;
      });
      
      updatePortfolioData(updatedData);
      setDividendForm({ symbol: '', dividendAmount: '', sharesReceived: '', currency: 'USD' });
    };

    // Get USD stocks for display
    const usdStocks = portfolioData.filter(stock => stock.currency === 'USD');
    const cadStocks = portfolioData.filter(stock => stock.currency === 'CAD');

    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold text-center mb-6">Portfolio Updates</h2>
        
        {/* Radio Button Selection */}
        <div className="bg-gray-100 rounded-lg p-4 mb-6">
          <h3 className="font-bold mb-3">Select Action:</h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="updateMode"
                value="api"
                checked={updateMode === 'api'}
                onChange={(e) => setUpdateMode(e.target.value)}
                className="mr-2"
              />
              <span>🚀 Alpha Vantage API Updates</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="updateMode"
                value="price"
                checked={updateMode === 'price'}
                onChange={(e) => setUpdateMode(e.target.value)}
                className="mr-2"
              />
              <span>Update Stock Price (Manual)</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="updateMode"
                value="stock"
                checked={updateMode === 'stock'}
                onChange={(e) => setUpdateMode(e.target.value)}
                className="mr-2"
              />
              <span>Add New Stock</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="updateMode"
                value="cash"
                checked={updateMode === 'cash'}
                onChange={(e) => setUpdateMode(e.target.value)}
                className="mr-2"
              />
              <span>Add Cash</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="updateMode"
                value="dividend"
                checked={updateMode === 'dividend'}
                onChange={(e) => setUpdateMode(e.target.value)}
                className="mr-2"
              />
              <span>Add Dividend</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="updateMode"
                value="data"
                checked={updateMode === 'data'}
                onChange={(e) => setUpdateMode(e.target.value)}
                className="mr-2"
              />
              <span>💾 Data Management</span>
            </label>
          </div>
        </div>

        {/* ALPHA VANTAGE API UPDATES */}
        {updateMode === 'api' && (
          <div className="space-y-4">
            {/* API Status Card */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-bold mb-3 flex items-center text-blue-800">
                <Zap className="mr-2" size={20} />
                Alpha Vantage API Updates
              </h3>
              
              <div className="mb-4 text-sm text-gray-700">
                <p>📊 <strong>Your Portfolio:</strong> {usdStocks.length} USD stocks, {cadStocks.length} CAD stocks</p>
                <p>🔄 <strong>API will update:</strong> {usdStocks.length} USD stocks (CAD stocks require manual updates)</p>
                <p>⏱️ <strong>Estimated time:</strong> ~{Math.ceil(usdStocks.length * 12 / 60)} minutes</p>
                <p>🎯 <strong>Rate limit:</strong> 25 calls/day (free tier) | 5 calls/minute</p>
              </div>

              {lastApiUpdate && (
                <div className="bg-blue-100 p-3 rounded-md mb-4">
                  <h4 className="font-medium text-blue-800">Last Update:</h4>
                  <p className="text-sm text-blue-700">
                    {new Date(lastApiUpdate.timestamp).toLocaleString()}
                  </p>
                  <p className="text-sm text-blue-600">
                    ✅ {lastApiUpdate.stats.successful} stocks updated successfully
                  </p>
                </div>
              )}

              {/* API Progress */}
              {isUpdating && updateProgress && (
                <div className="bg-white p-3 rounded-md mb-4 border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Updating Portfolio...</span>
                    <span className="text-sm text-gray-600">
                      {updateProgress.current}/{updateProgress.total}
                    </span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${(updateProgress.current / Math.max(updateProgress.total, 1)) * 100}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    {updateProgress.status === 'fetching' && (
                      <>
                        <RefreshCw className="mr-1 animate-spin" size={14} />
                        Fetching {updateProgress.symbol}...
                      </>
                    )}
                    {updateProgress.status === 'waiting' && (
                      <>
                        <Clock className="mr-1" size={14} />
                        Waiting (rate limit)...
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleApiUpdate}
                  disabled={isUpdating}
                  className={`w-full py-3 rounded-md font-medium transition-colors ${
                    isUpdating 
                      ? 'bg-gray-400 text-gray-700 cursor-not-allowed' 
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {isUpdating ? '🔄 Updating Portfolio...' : '🚀 Update All USD Stocks'}
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => testApiWithStock('AAPL')}
                    className="bg-green-600 text-white py-2 rounded-md font-medium hover:bg-green-700 transition-colors"
                  >
                    🧪 Test API
                  </button>
                  
                  <button
                    onClick={() => testApiWithStock(usdStocks[0]?.symbol || 'PLTR')}
                    className="bg-purple-600 text-white py-2 rounded-md font-medium hover:bg-purple-700 transition-colors"
                  >
                    Test Your Stock
                  </button>
                </div>
              </div>
            </div>

            {/* Stocks that will be updated */}
            <div className="bg-white border rounded-lg p-4">
              <h4 className="font-bold mb-3">📈 USD Stocks (API Updates)</h4>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {usdStocks.map(stock => (
                  <div key={stock.symbol} className="flex justify-between text-sm">
                    <span className="font-medium">{stock.symbol}</span>
                    <span className="text-gray-600">
                      ${stock.currentPrice.toFixed(2)} • Updated: {stock.lastUpdated}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CAD stocks note */}
            {cadStocks.length > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h4 className="font-bold mb-2 text-amber-800">🍁 CAD Stocks (Manual Updates)</h4>
                <p className="text-sm text-amber-700 mb-2">
                  These require manual price updates (Alpha Vantage free tier focuses on US markets):
                </p>
                <div className="space-y-1">
                  {cadStocks.map(stock => (
                    <div key={stock.symbol} className="flex justify-between text-sm">
                      <span className="font-medium">{stock.symbol}</span>
                      <span className="text-gray-600">
                        CAD ${stock.currentPrice.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Keep all other existing forms unchanged */}
        {updateMode === 'price' && (
          <div className="bg-white border rounded-lg p-4 mb-6 shadow-sm">
            <h3 className="font-bold mb-4 flex items-center">
              <RefreshCw className="mr-2" size={20} />
              Update Stock Price (Manual)
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Stock Symbol</label>
                <select
                  value={priceForm.symbol}
                  onChange={(e) => setPriceForm(prev => ({ ...prev, symbol: e.target.value }))}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Select Stock</option>
                  {portfolioData.map(stock => (
                    <option key={stock.symbol} value={stock.symbol}>
                      {stock.symbol} (Current: {stock.currency} ${stock.currentPrice.toFixed(2)})
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">New Price</label>
                <input
                  type="number"
                  step="0.01"
                  value={priceForm.newPrice}
                  onChange={(e) => setPriceForm(prev => ({ ...prev, newPrice: e.target.value }))}
                  className="w-full p-2 border rounded-md"
                  placeholder="0.00"
                />
              </div>
              
              <button
                onClick={handleUpdatePrice}
                className="w-full bg-green-600 text-white py-2 rounded-md font-medium hover:bg-green-700 transition-colors"
              >
                Update Price
              </button>
            </div>
          </div>
        )}

        {/* Keep other forms (stock, cash, dividend, data) exactly as they were */}
        {/* ... existing form code ... */}

      </div>
    );
  };

  // Navigation Component (unchanged)
  const Navigation = () => {
    const tabs = [
      { id: 'performance', icon: TrendingUp, label: 'Performance' },
      { id: 'overview', icon: List, label: 'Overview' },
      { id: 'sector', icon: PieChart, label: 'Sectors' },
      { id: 'dividend', icon: DollarSign, label: 'Dividends' },
      { id: 'update', icon: RefreshCw, label: 'Update' }
    ];

    return (
   <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 z-50">
      <div className="flex justify-around max-w-md mx-auto">
    {tabs.map(tab => {
      const Icon = tab.icon;
      const isActive = activeTab === tab.id;
      
      return (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
            isActive 
              ? 'bg-blue-100 text-blue-600' 
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <Icon size={20} />
          <span className="text-xs mt-1">{tab.label}</span>
        </button>
      );
    })}
      </div>
    </div>
    );
  };

  // Main App Component
  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen flex flex-col pb-20">
      {/* Header */}
      <div style={{backgroundColor: '#2563eb', color: 'white', padding: '1rem', textAlign: 'center'}}>
        <h1 className="text-xl font-bold">Portfolio</h1>
        <p className="text-sm opacity-90">Total: ${metrics.totalCurrentUSD.toLocaleString('en-US', {minimumFractionDigits: 0})} USD</p>
        {isUpdating && (
          <p className="text-xs opacity-75 mt-1">🔄 Updating prices...</p>
        )}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'performance' && <PerformanceTab />}
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'sector' && <SectorBreakdownTab />}
        {activeTab === 'dividend' && <DividendTab />}
        {activeTab === 'update' && <UpdatePriceTab />}
      </div>

      {/* Navigation */}
      <Navigation />
    </div>
  );
};

export default PortfolioApp;