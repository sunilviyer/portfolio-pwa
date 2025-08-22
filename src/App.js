import React, { useState } from 'react';
import { BarChart3, TrendingUp, List, PieChart, DollarSign, RefreshCw, ArrowLeft } from 'lucide-react';
import { PieChart as RechartsPieChart, Cell, ResponsiveContainer, Tooltip, Pie } from 'recharts';

const PortfolioApp = () => {
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

  // Form states for adding new investments
  const [newStockForm, setNewStockForm] = useState({
    symbol: '',
    currency: 'USD',
    shares: '',
    price: '',
    sector: '',
    accountType: 'RRSP',
    purchaseDate: new Date().toISOString().split('T')[0]
  });

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

  // Data management functions
  const exportPortfolioData = () => {
    const exportData = {
      portfolioData,
      cashPositions,
      exportDate: new Date().toISOString(),
      version: '1.0'
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
    if (confirm('⚠️ This will reset all your portfolio data to initial values. Are you sure?')) {
      updatePortfolioData(INITIAL_PORTFOLIO_DATA);
      updateCashPositions(INITIAL_CASH_POSITIONS);
      alert('🔄 Portfolio reset to initial data');
    }
  };

  const clearAllData = () => {
    if (confirm('⚠️ This will delete ALL portfolio data permanently. Are you sure?')) {
      if (confirm('🚨 FINAL WARNING: This cannot be undone. Continue?')) {
        localStorage.removeItem('portfolioData');
        localStorage.removeItem('cashPositions');
        updatePortfolioData([]);
        updateCashPositions([]);
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

  // Performance Tab Component
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
    </div>
  );

  // ENHANCED OVERVIEW TAB WITH BROKERAGE FEATURES
  const OverviewTab = () => {
    const [brokerageFilter, setBrokerageFilter] = useState('All');
    const [accountFilter, setAccountFilter] = useState('All');
    const [groupByBrokerage, setGroupByBrokerage] = useState(false);
    const [sortBy, setSortBy] = useState('symbol'); // 'symbol', 'value', 'performance', 'brokerage'

    // Get unique brokerages and account types from portfolio data
    const uniqueBrokerages = [...new Set(portfolioData.map(stock => stock.brokerage))];
    const uniqueAccountTypes = [...new Set(portfolioData.map(stock => stock.accountType))];

    // Filter portfolio data based on selected filters
    const filteredData = portfolioData.filter(stock => {
      const brokerageMatch = brokerageFilter === 'All' || stock.brokerage === brokerageFilter;
      const accountMatch = accountFilter === 'All' || stock.accountType === accountFilter;
      return brokerageMatch && accountMatch;
    });

    // Sort filtered data
    const sortedData = [...filteredData].sort((a, b) => {
      switch (sortBy) {
        case 'symbol':
          return a.symbol.localeCompare(b.symbol);
        case 'value':
          const aValueUSD = a.currentValue * (a.currency === 'CAD' ? CAD_TO_USD_RATE : 1);
          const bValueUSD = b.currentValue * (b.currency === 'CAD' ? CAD_TO_USD_RATE : 1);
          return bValueUSD - aValueUSD; // Highest to lowest
        case 'performance':
          const aReturn = (a.gainLoss / a.originalInvestment) * 100;
          const bReturn = (b.gainLoss / b.originalInvestment) * 100;
          return bReturn - aReturn; // Best to worst
        case 'brokerage':
          return a.brokerage.localeCompare(b.brokerage);
        default:
          return 0;
      }
    });

    // Group data by brokerage if enabled
    const groupedData = groupByBrokerage 
      ? sortedData.reduce((acc, stock) => {
          if (!acc[stock.brokerage]) {
            acc[stock.brokerage] = [];
          }
          acc[stock.brokerage].push(stock);
          return acc;
        }, {})
      : null;

    // Calculate brokerage statistics
    const calculateBrokerageStats = (stocks) => {
      const totalValueUSD = stocks.reduce((sum, stock) => {
        const conversionRate = stock.currency === 'CAD' ? CAD_TO_USD_RATE : 1;
        return sum + (stock.currentValue * conversionRate);
      }, 0);

      const totalGainLossUSD = stocks.reduce((sum, stock) => {
        const conversionRate = stock.currency === 'CAD' ? CAD_TO_USD_RATE : 1;
        return sum + (stock.gainLoss * conversionRate);
      }, 0);

      return {
        totalValueUSD,
        totalGainLossUSD,
        stockCount: stocks.length
      };
    };

    // Individual Stock Card Component
    const StockCard = ({ stock }) => {
      const conversionRate = stock.currency === 'CAD' ? CAD_TO_USD_RATE : 1;
      const currentValueUSD = stock.currentValue * conversionRate;
      const gainLossUSD = stock.gainLoss * conversionRate;
      const returnPct = (stock.gainLoss / stock.originalInvestment) * 100;

      return (
        <div className="bg-white border rounded-lg p-4 shadow-sm">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-bold text-lg">{stock.symbol}</h3>
              <p className="text-sm text-gray-600">
                {stock.sector} • {stock.accountType}
              </p>
              <p className="text-xs text-blue-600 font-medium">
                📱 {stock.brokerage}
              </p>
              <p className="text-sm">
                {stock.currentShares.toFixed(2)} shares @ {stock.currency} ${stock.currentPrice.toFixed(2)}
              </p>
            </div>
            <div className="text-right">
              <p className="font-bold">${currentValueUSD.toLocaleString('en-US', {minimumFractionDigits: 2})} USD</p>
              <p className={`text-sm font-medium ${gainLossUSD >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {gainLossUSD >= 0 ? '+' : ''}${gainLossUSD.toLocaleString('en-US', {minimumFractionDigits: 2})} USD
              </p>
              <p className={`text-xs ${gainLossUSD >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                ({returnPct.toFixed(1)}%)
              </p>
            </div>
          </div>
          
          {/* Last Updated Info */}
          <div className="text-xs text-gray-500 mt-2 flex justify-between">
            <span>Updated: {stock.lastUpdated}</span>
            <span>Purchased: {stock.purchaseDate}</span>
          </div>
        </div>
      );
    };

    // Brokerage Group Component
    const BrokerageGroup = ({ brokerage, stocks }) => {
      const stats = calculateBrokerageStats(stocks);
      
      return (
        <div className="mb-6">
          {/* Brokerage Header */}
          <div className="bg-blue-50 border border-blue-200 rounded-t-lg p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg text-blue-800">📱 {brokerage}</h3>
                <p className="text-sm text-blue-600">{stats.stockCount} holdings</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg text-blue-800">
                  ${stats.totalValueUSD.toLocaleString('en-US', {minimumFractionDigits: 2})} USD
                </p>
                <p className={`text-sm font-medium ${stats.totalGainLossUSD >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {stats.totalGainLossUSD >= 0 ? '+' : ''}${stats.totalGainLossUSD.toLocaleString('en-US', {minimumFractionDigits: 2})} USD
                </p>
              </div>
            </div>
          </div>
          
          {/* Stocks in this brokerage */}
          <div className="space-y-3 border-l border-r border-b border-blue-200 rounded-b-lg p-4 bg-white">
            {stocks.map((stock) => (
              <StockCard key={stock.symbol} stock={stock} />
            ))}
          </div>
        </div>
      );
    };

    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold text-center mb-6">Investment Overview</h2>
        
        {/* Filter and Control Section */}
        <div className="bg-gray-100 rounded-lg p-4 mb-6">
          {/* Brokerage Filter */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Filter by Brokerage:</label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setBrokerageFilter('All')}
                className={`px-3 py-1 rounded text-sm ${
                  brokerageFilter === 'All' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-white text-gray-700 border'
                }`}
              >
                All ({portfolioData.length})
              </button>
              {uniqueBrokerages.map(brokerage => {
                const count = portfolioData.filter(stock => stock.brokerage === brokerage).length;
                return (
                  <button
                    key={brokerage}
                    onClick={() => setBrokerageFilter(brokerage)}
                    className={`px-3 py-1 rounded text-sm ${
                      brokerageFilter === brokerage 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-white text-gray-700 border'
                    }`}
                  >
                    📱 {brokerage} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Account Type Filter */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Filter by Account:</label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setAccountFilter('All')}
                className={`px-3 py-1 rounded text-sm ${
                  accountFilter === 'All' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-white text-gray-700 border'
                }`}
              >
                All
              </button>
              {uniqueAccountTypes.map(accountType => (
                <button
                  key={accountType}
                  onClick={() => setAccountFilter(accountType)}
                  className={`px-3 py-1 rounded text-sm ${
                    accountFilter === accountType 
                      ? 'bg-green-500 text-white' 
                      : 'bg-white text-gray-700 border'
                  }`}
                >
                  {accountType}
                </button>
              ))}
            </div>
          </div>

          {/* Sort and Group Controls */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-2 border rounded text-sm"
              >
                <option value="symbol">Symbol (A-Z)</option>
                <option value="value">Value (High-Low)</option>
                <option value="performance">Performance (Best-Worst)</option>
                <option value="brokerage">Brokerage (A-Z)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Display:</label>
              <button
                onClick={() => setGroupByBrokerage(!groupByBrokerage)}
                className={`w-full p-2 rounded text-sm ${
                  groupByBrokerage 
                    ? 'bg-purple-500 text-white' 
                    : 'bg-white text-gray-700 border'
                }`}
              >
                {groupByBrokerage ? '📱 Grouped' : '📋 List View'}
              </button>
            </div>
          </div>

          {/* Filter Summary */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredData.length} of {portfolioData.length} holdings
            {brokerageFilter !== 'All' && ` • ${brokerageFilter}`}
            {accountFilter !== 'All' && ` • ${accountFilter}`}
          </div>
        </div>

        {/* Holdings Display */}
        <div className="space-y-3">
          {groupByBrokerage ? (
            // Grouped by Brokerage View
            Object.entries(groupedData).map(([brokerage, stocks]) => (
              <BrokerageGroup 
                key={brokerage} 
                brokerage={brokerage} 
                stocks={stocks} 
              />
            ))
          ) : (
            // Standard List View
            sortedData.map((stock) => (
              <StockCard key={stock.symbol} stock={stock} />
            ))
          )}
          
          {/* Cash Positions (always show at bottom) */}
          {cashPositions.length > 0 && (
            <div className="bg-gray-100 border rounded-lg p-4">
              <h3 className="font-bold text-lg mb-2">💰 Cash Positions</h3>
              {cashPositions.map((cash) => (
                <div key={cash.currency} className="flex justify-between">
                  <span>{cash.currency} Cash</span>
                  <span className="font-medium">{cash.currency} ${cash.amount.toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Sector Breakdown Tab Component with Interactive Pie Chart
  const SectorBreakdownTab = () => {
    const sectorData = portfolioData.reduce((acc, stock) => {
      const conversionRate = stock.currency === 'CAD' ? CAD_TO_USD_RATE : 1;
      const valueUSD = stock.currentValue * conversionRate;
      
      if (!acc[stock.sector]) {
        acc[stock.sector] = {
          value: 0,
          stocks: [],
          count: 0
        };
      }
      
      acc[stock.sector].value += valueUSD;
      acc[stock.sector].stocks.push(stock);
      acc[stock.sector].count += 1;
      
      return acc;
    }, {});

    const totalPortfolioValue = Object.values(sectorData).reduce((sum, sector) => sum + sector.value, 0);

    // Prepare data for pie chart
    const pieChartData = Object.entries(sectorData).map(([sector, data], index) => ({
      name: sector,
      value: data.value,
      percentage: (data.value / totalPortfolioValue) * 100,
      count: data.count,
      stocks: data.stocks
    })).sort((a, b) => b.value - a.value);

    // Color palette for sectors
    const SECTOR_COLORS = [
      '#2563eb', // Blue
      '#dc2626', // Red  
      '#16a34a', // Green
      '#ca8a04', // Yellow
      '#9333ea', // Purple
      '#ea580c', // Orange
      '#0891b2', // Cyan
      '#be185d', // Pink
      '#65a30d', // Lime
      '#7c3aed'  // Violet
    ];

    // Custom tooltip for pie chart
    const CustomTooltip = ({ active, payload }) => {
      if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
          <div className="bg-white p-3 border rounded-lg shadow-lg">
            <p className="font-semibold">{data.name}</p>
            <p className="text-sm">Value: ${data.value.toLocaleString('en-US', {minimumFractionDigits: 2})} USD</p>
            <p className="text-sm">Percentage: {data.percentage.toFixed(1)}%</p>
            <p className="text-sm">Holdings: {data.count}</p>
          </div>
        );
      }
      return null;
    };

    // Handle sector click for drill-down
    const handleSectorClick = (sector) => {
      setSelectedSector(sector);
    };

    // Reset to main view
    const handleBackToMain = () => {
      setSelectedSector(null);
    };

    // Main pie chart view
    if (!selectedSector) {
      return (
        <div className="p-4">
          <h2 className="text-2xl font-bold text-center mb-6">Sector Breakdown</h2>
          
          {/* Pie Chart */}
          <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={2}
                  dataKey="value"
                  onClick={(data) => handleSectorClick(data)}
                  className="cursor-pointer"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={SECTOR_COLORS[index % SECTOR_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </RechartsPieChart>
            </ResponsiveContainer>
            
            <p className="text-center text-sm text-gray-600 mt-2">
              Tap any sector to see individual holdings
            </p>
          </div>

          {/* Sector Summary List */}
          <div className="space-y-3">
            {pieChartData.map((sector, index) => (
              <div 
                key={sector.name} 
                className="bg-white border rounded-lg p-4 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleSectorClick(sector)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div 
                      className="w-4 h-4 rounded mr-3"
                      style={{ backgroundColor: SECTOR_COLORS[index % SECTOR_COLORS.length] }}
                    ></div>
                    <div>
                      <h3 className="font-bold text-lg">{sector.name}</h3>
                      <p className="text-sm text-gray-600">{sector.count} holdings</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">${sector.value.toLocaleString('en-US', {minimumFractionDigits: 2})} USD</p>
                    <p className="text-sm text-gray-600">({sector.percentage.toFixed(1)}%)</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Drill-down view for selected sector
    return (
      <div className="p-4">
        <div className="flex items-center mb-6">
          <button 
            onClick={handleBackToMain}
            className="mr-3 p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-2xl font-bold">{selectedSector.name}</h2>
            <p className="text-sm text-gray-600">
              ${selectedSector.value.toLocaleString('en-US', {minimumFractionDigits: 2})} USD 
              ({selectedSector.percentage.toFixed(1)}% of portfolio)
            </p>
          </div>
        </div>

        {/* Individual Holdings in Selected Sector */}
        <div className="space-y-3">
          {selectedSector.stocks
            .sort((a, b) => {
              const aValue = a.currentValue * (a.currency === 'CAD' ? CAD_TO_USD_RATE : 1);
              const bValue = b.currentValue * (b.currency === 'CAD' ? CAD_TO_USD_RATE : 1);
              return bValue - aValue;
            })
            .map((stock) => {
              const conversionRate = stock.currency === 'CAD' ? CAD_TO_USD_RATE : 1;
              const currentValueUSD = stock.currentValue * conversionRate;
              const gainLossUSD = stock.gainLoss * conversionRate;
              const returnPct = (stock.gainLoss / stock.originalInvestment) * 100;
              const sectorAllocation = (currentValueUSD / selectedSector.value) * 100;
              
              return (
                <div key={stock.symbol} className="bg-white border rounded-lg p-4 shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-lg">{stock.symbol}</h3>
                      <p className="text-sm text-gray-600">
                        {stock.currentShares.toFixed(2)} shares @ {stock.currency} ${stock.currentPrice.toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-500">
                        {sectorAllocation.toFixed(1)}% of {selectedSector.name}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">${currentValueUSD.toLocaleString('en-US', {minimumFractionDigits: 2})} USD</p>
                      <p className={`text-sm font-medium ${gainLossUSD >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {gainLossUSD >= 0 ? '+' : ''}${gainLossUSD.toLocaleString('en-US', {minimumFractionDigits: 2})} USD
                      </p>
                      <p className={`text-xs ${gainLossUSD >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        ({returnPct.toFixed(1)}%)
                      </p>
                    </div>
                  </div>
                  
                  {/* Individual stock allocation bar within sector */}
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${sectorAllocation}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
        </div>

        {/* Sector Summary at Bottom */}
        <div className="mt-6 bg-gray-100 rounded-lg p-4">
          <h3 className="font-bold mb-2">Sector Summary</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Total Value</p>
              <p className="font-bold">${selectedSector.value.toLocaleString('en-US', {minimumFractionDigits: 2})} USD</p>
            </div>
            <div>
              <p className="text-gray-600">Portfolio Weight</p>
              <p className="font-bold">{selectedSector.percentage.toFixed(1)}%</p>
            </div>
            <div>
              <p className="text-gray-600">Number of Holdings</p>
              <p className="font-bold">{selectedSector.count}</p>
            </div>
            <div>
              <p className="text-gray-600">Average Holding</p>
              <p className="font-bold">${(selectedSector.value / selectedSector.count).toLocaleString('en-US', {minimumFractionDigits: 2})} USD</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Dividend Tab Component
  const DividendTab = () => {
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

    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold text-center mb-6">Dividend Management</h2>
        
        {/* Add Dividend Form */}
        <div className="bg-white border rounded-lg p-4 mb-6 shadow-sm">
          <h3 className="font-bold mb-4">Add Dividend</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Stock Symbol</label>
              <select
                value={dividendForm.symbol}
                onChange={(e) => setDividendForm(prev => ({ ...prev, symbol: e.target.value }))}
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select Stock</option>
                {portfolioData.map(stock => (
                  <option key={stock.symbol} value={stock.symbol}>{stock.symbol}</option>
                ))}
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Dividend Amount</label>
                <input
                  type="number"
                  step="0.01"
                  value={dividendForm.dividendAmount}
                  onChange={(e) => setDividendForm(prev => ({ ...prev, dividendAmount: e.target.value }))}
                  className="w-full p-2 border rounded-md"
                  placeholder="0.00"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Shares Received (Optional)</label>
                <input
                  type="number"
                  step="0.01"
                  value={dividendForm.sharesReceived}
                  onChange={(e) => setDividendForm(prev => ({ ...prev, sharesReceived: e.target.value }))}
                  className="w-full p-2 border rounded-md"
                  placeholder="0.00"
                />
              </div>
            </div>
            
            <button
              onClick={handleAddDividend}
              className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              Add Dividend
            </button>
          </div>
        </div>
        
        {/* Dividend History */}
        <div className="space-y-3">
          <h3 className="font-bold">Dividend History</h3>
          {portfolioData
            .filter(stock => stock.dividendReceived > 0)
            .map(stock => {
              const conversionRate = stock.currency === 'CAD' ? CAD_TO_USD_RATE : 1;
              const dividendUSD = stock.dividendReceived * conversionRate;
              
              return (
                <div key={stock.symbol} className="bg-white border rounded-lg p-4 shadow-sm">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-bold">{stock.symbol}</h4>
                      <p className="text-sm text-gray-600">{stock.sector}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">
                        ${dividendUSD.toLocaleString('en-US', {minimumFractionDigits: 2})} USD
                      </p>
                      <p className="text-sm text-gray-600">
                        {stock.currency} ${stock.dividendReceived.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    );
  };

  // Update Price Tab Component with ALL fixes
  const UpdatePriceTab = () => {
    const [updateMode, setUpdateMode] = useState('price');
    
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
      if (!newStockForm.symbol || !newStockForm.shares || !newStockForm.price || !newStockForm.sector) return;
      
      const shares = parseFloat(newStockForm.shares);
      const price = parseFloat(newStockForm.price);
      const investment = shares * price;
      
      const newStock = {
        symbol: newStockForm.symbol.toUpperCase(),
        currency: newStockForm.currency,
        originalShares: shares,
        currentShares: shares,
        originalPrice: price,
        currentPrice: price,
        originalInvestment: investment,
        currentValue: investment,
        gainLoss: 0,
        dividendReceived: 0,
        sector: newStockForm.sector,
        accountType: newStockForm.accountType,
        brokerage: 'Wealthsimple',
        lastUpdated: new Date().toISOString().split('T')[0],
        purchaseDate: newStockForm.purchaseDate
      };
      
      const updatedData = [...portfolioData, newStock];
      updatePortfolioData(updatedData);
      
      setNewStockForm({
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

    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold text-center mb-6">Portfolio Updates</h2>
        
        {/* Radio Button Selection - FIXED */}
        <div className="bg-gray-100 rounded-lg p-4 mb-6">
          <h3 className="font-bold mb-3">Select Action:</h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="updateMode"
                value="price"
                checked={updateMode === 'price'}
                onChange={(e) => setUpdateMode(e.target.value)}
                className="mr-2"
              />
              <span>Update Stock Price</span>
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

        {/* Update Stock Price Form */}
        {updateMode === 'price' && (
          <div className="bg-white border rounded-lg p-4 mb-6 shadow-sm">
            <h3 className="font-bold mb-4 flex items-center">
              <RefreshCw className="mr-2" size={20} />
              Update Stock Price
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

        {/* Add Stock Form */}
        {updateMode === 'stock' && (
          <div className="bg-white border rounded-lg p-4 mb-6 shadow-sm">
            <h3 className="font-bold mb-4 flex items-center">
              <BarChart3 className="mr-2" size={20} />
              Add New Stock
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Symbol *</label>
                  <input
                    type="text"
                    value={newStockForm.symbol}
                    onChange={(e) => setNewStockForm(prev => ({ ...prev, symbol: e.target.value.toUpperCase() }))}
                    className="w-full p-2 border rounded-md uppercase"
                    placeholder="AAPL"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Currency *</label>
                  <select
                    value={newStockForm.currency}
                    onChange={(e) => setNewStockForm(prev => ({ ...prev, currency: e.target.value }))}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="USD">USD</option>
                    <option value="CAD">CAD</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Shares *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newStockForm.shares}
                    onChange={(e) => setNewStockForm(prev => ({ ...prev, shares: e.target.value }))}
                    className="w-full p-2 border rounded-md"
                    placeholder="100"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Price per Share *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newStockForm.price}
                    onChange={(e) => setNewStockForm(prev => ({ ...prev, price: e.target.value }))}
                    className="w-full p-2 border rounded-md"
                    placeholder="150.00"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Sector *</label>
                  <select
                    value={newStockForm.sector}
                    onChange={(e) => setNewStockForm(prev => ({ ...prev, sector: e.target.value }))}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">Select Sector</option>
                    {SECTORS.map(sector => (
                      <option key={sector} value={sector}>{sector}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Account Type *</label>
                  <select
                    value={newStockForm.accountType}
                    onChange={(e) => setNewStockForm(prev => ({ ...prev, accountType: e.target.value }))}
                    className="w-full p-2 border rounded-md"
                  >
                    {ACCOUNT_TYPES.map(accountType => (
                      <option key={accountType} value={accountType}>{accountType}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Purchase Date *</label>
                <input
                  type="date"
                  value={newStockForm.purchaseDate}
                  onChange={(e) => setNewStockForm(prev => ({ ...prev, purchaseDate: e.target.value }))}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              
              {newStockForm.shares && newStockForm.price && (
                <div className="bg-gray-100 p-3 rounded-md">
                  <p className="text-sm font-medium">
                    Total Investment: {newStockForm.currency} ${(parseFloat(newStockForm.shares || 0) * parseFloat(newStockForm.price || 0)).toLocaleString('en-US', {minimumFractionDigits: 2})}
                  </p>
                </div>
              )}
              
              <button
                onClick={handleAddStock}
                className="w-full bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition-colors"
              >
                Add Stock
              </button>
            </div>
          </div>
        )}

        {/* Add Cash Form */}
        {updateMode === 'cash' && (
          <div className="bg-white border rounded-lg p-4 mb-6 shadow-sm">
            <h3 className="font-bold mb-4 flex items-center">
              <DollarSign className="mr-2" size={20} />
              Add Cash
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Currency *</label>
                  <select
                    value={newCashForm.currency}
                    onChange={(e) => setNewCashForm(prev => ({ ...prev, currency: e.target.value }))}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="USD">USD</option>
                    <option value="CAD">CAD</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Amount *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newCashForm.amount}
                    onChange={(e) => setNewCashForm(prev => ({ ...prev, amount: e.target.value }))}
                    className="w-full p-2 border rounded-md"
                    placeholder="1000.00"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Date Added *</label>
                <input
                  type="date"
                  value={newCashForm.dateAdded}
                  onChange={(e) => setNewCashForm(prev => ({ ...prev, dateAdded: e.target.value }))}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              
              <button
                onClick={handleAddCash}
                className="w-full bg-green-600 text-white py-2 rounded-md font-medium hover:bg-green-700 transition-colors"
              >
                Add Cash
              </button>
            </div>
          </div>
        )}

        {/* Add Dividend Form */}
        {updateMode === 'dividend' && (
          <div className="bg-white border rounded-lg p-4 mb-6 shadow-sm">
            <h3 className="font-bold mb-4 flex items-center">
              <DollarSign className="mr-2" size={20} />
              Add Dividend
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Stock Symbol</label>
                <select
                  value={dividendForm.symbol}
                  onChange={(e) => setDividendForm(prev => ({ ...prev, symbol: e.target.value }))}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="">Select Stock</option>
                  {portfolioData.map(stock => (
                    <option key={stock.symbol} value={stock.symbol}>{stock.symbol}</option>
                  ))}
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Dividend Amount</label>
                  <input
                    type="number"
                    step="0.01"
                    value={dividendForm.dividendAmount}
                    onChange={(e) => setDividendForm(prev => ({ ...prev, dividendAmount: e.target.value }))}
                    className="w-full p-2 border rounded-md"
                    placeholder="0.00"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Shares Received (Optional)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={dividendForm.sharesReceived}
                    onChange={(e) => setDividendForm(prev => ({ ...prev, sharesReceived: e.target.value }))}
                    className="w-full p-2 border rounded-md"
                    placeholder="0.00"
                  />
                </div>
              </div>
              
              <button
                onClick={handleAddDividend}
                className="w-full bg-purple-600 text-white py-2 rounded-md font-medium hover:bg-purple-700 transition-colors"
              >
                Add Dividend
              </button>
            </div>
          </div>
        )}

        {/* FIXED Data Management Section */}
        {updateMode === 'data' && (
          <div className="bg-white border rounded-lg p-4 shadow-sm">
            <h3 className="font-bold mb-4">💾 Data Management</h3>
            
            <div className="space-y-3">
              <button
                onClick={exportPortfolioData}
                className="w-full bg-green-600 text-white py-2 rounded-md font-medium hover:bg-green-700 transition-colors"
              >
                📤 Export Backup
              </button>
              
              <div>
                <label className="block text-sm font-medium mb-1">Import Backup File:</label>
                <input
                  type="file"
                  accept=".json"
                  onChange={importPortfolioData}
                  className="w-full p-2 border rounded-md text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">Import backup file (.json)</p>
              </div>
              
              <button
                onClick={resetToInitialData}
                className="w-full bg-yellow-600 text-white py-2 rounded-md font-medium hover:bg-yellow-700 transition-colors"
              >
                🔄 Reset to Initial Data
              </button>
              
              <button
                onClick={clearAllData}
                className="w-full bg-red-600 text-white py-2 rounded-md font-medium hover:bg-red-700 transition-colors"
              >
                🗑️ Clear All Data
              </button>
            </div>
            
            <div className="mt-4 text-xs text-gray-500 bg-gray-50 p-3 rounded-md">
              <p><strong>💡 How Data Persistence Works:</strong></p>
              <p>• All changes are automatically saved to your device</p>
              <p>• Data survives app updates and refreshes</p>
              <p>• Export backup before major changes</p>
              <p>• Each device stores its own data</p>
              <div className="mt-2">
                <p><strong>📊 Current Storage:</strong></p>
                <p>• {portfolioData.length} stocks tracked</p>
                <p>• {cashPositions.length} cash positions</p>
                <p>• Last saved: {new Date().toLocaleString()}</p>
              </div>
            </div>
          </div>
        )}

        {/* Current Portfolio Summary (always visible for non-data modes) */}
        {updateMode !== 'data' && (
          <div className="bg-white border rounded-lg p-4 shadow-sm">
            <h3 className="font-bold mb-4">Portfolio Summary</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Total Holdings</p>
                <p className="font-bold">{portfolioData.length} stocks</p>
              </div>
              <div>
                <p className="text-gray-600">Cash Positions</p>
                <p className="font-bold">{cashPositions.length} currencies</p>
              </div>
              <div>
                <p className="text-gray-600">Portfolio Value</p>
                <p className="font-bold">${metrics.totalCurrentUSD.toLocaleString('en-US', {minimumFractionDigits: 0})} USD</p>
              </div>
              <div>
                <p className="text-gray-600">Total Return</p>
                <p className={`font-bold ${metrics.returnPercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {metrics.returnPercentage >= 0 ? '+' : ''}{metrics.returnPercentage.toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Navigation Component
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