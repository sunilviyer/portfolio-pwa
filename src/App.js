import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, List, PieChart, DollarSign, RefreshCw, ArrowLeft, Zap, Clock, CheckCircle, AlertCircle, Menu, X, Download, Settings, Eye, Newspaper, CreditCard } from 'lucide-react';
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
      symbol: 'XDIV.TO',
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
      symbol: 'XID.TO',
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
      symbol: 'ENB.TO',
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
      symbol: 'QQC.TO',
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
      symbol: 'XEG.TO',
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
      symbol: 'RS.TO',
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
    { currency: 'USD', amount: 23432.13, dateAdded: '2025-01-01', exchangeRate: 1.0 },
    { currency: 'CAD', amount: 48.02, dateAdded: '2025-01-01', exchangeRate: 0.74 }
  ];

  // Enhanced API Functions
  const EnhancedAPI = {
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

    async getExchangeRate() {
      try {
        const response = await fetch(`${ALPHA_VANTAGE_BASE_URL}?function=CURRENCY_EXCHANGE_RATE&from_currency=CAD&to_currency=USD&apikey=${ALPHA_VANTAGE_API_KEY}`);
        const data = await response.json();
        
        if (data["Error Message"]) {
          throw new Error(`Exchange Rate Error: ${data["Error Message"]}`);
        }
        
        const exchangeData = data["Realtime Currency Exchange Rate"];
        if (!exchangeData) {
          throw new Error("No exchange rate data found");
        }
        
        return {
          rate: parseFloat(exchangeData["5. Exchange Rate"]),
          lastUpdated: exchangeData["6. Last Refreshed"],
          fromCurrency: exchangeData["1. From_Currency Code"],
          toCurrency: exchangeData["3. To_Currency Code"]
        };
        
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
        throw error;
      }
    }
  };

  // Helper functions for localStorage
  const saveToLocalStorage = (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`Failed to save ${key}:`, error);
    }
  };

  const loadFromLocalStorage = (key, fallback) => {
    try {
      const saved = localStorage.getItem(key);
      if (saved && saved !== 'undefined') {
        const parsed = JSON.parse(saved);
        return parsed;
      }
    } catch (error) {
      console.error(`Failed to load ${key}:`, error);
    }
    return fallback;
  };

  // State management
  const [portfolioData, setPortfolioData] = useState(() => 
    loadFromLocalStorage('portfolioData', INITIAL_PORTFOLIO_DATA)
  );
  
  const [cashPositions, setCashPositions] = useState(() => 
    loadFromLocalStorage('cashPositions', INITIAL_CASH_POSITIONS)
  );

  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeWorkflow, setActiveWorkflow] = useState('portfolio');
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [selectedSector, setSelectedSector] = useState(null);
  const [displayCurrency, setDisplayCurrency] = useState('USD');
  const [errorBanner, setErrorBanner] = useState(null);

  // API Update States
  const [isUpdating, setIsUpdating] = useState(false);
  const [lastApiUpdate, setLastApiUpdate] = useState(() => 
    loadFromLocalStorage('lastApiUpdate', null)
  );

  // Service Worker Registration
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration);
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
  }, []);

  // Conversion rates
  const getCurrentExchangeRate = () => {
    const cadCash = cashPositions.find(cash => cash.currency === 'CAD');
    return cadCash?.exchangeRate || 0.74;
  };

  const CAD_TO_USD_RATE = getCurrentExchangeRate();
  const USD_TO_CAD_RATE = 1 / CAD_TO_USD_RATE;

  // Currency conversion functions
  const convertToDisplayCurrency = (amount, fromCurrency) => {
    if (!amount || isNaN(amount)) return 0;
    if (displayCurrency === fromCurrency) return amount;
    
    if (displayCurrency === 'USD' && fromCurrency === 'CAD') {
      return amount * CAD_TO_USD_RATE;
    } else if (displayCurrency === 'CAD' && fromCurrency === 'USD') {
      return amount * USD_TO_CAD_RATE;
    }
    return amount;
  };

  const formatCurrency = (amount, fromCurrency = 'USD') => {
    const safeAmount = typeof amount === 'number' && !isNaN(amount) ? amount : 0;
    const convertedAmount = convertToDisplayCurrency(safeAmount, fromCurrency);
    return `${displayCurrency} $${convertedAmount.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
  };

  // Constants
  const SECTORS = [
    'Technology', 'Healthcare', 'Energy', 'Financials', 'Consumer Discretionary',
    'Consumer Staples', 'Real Estate', 'Utilities', 'Bonds', 'International', 'Diversified'
  ];

  const ACCOUNT_TYPES = ['RRSP', 'TFSA', 'Non-Registered'];

  // Data management functions
  const updatePortfolioData = (newData) => {
    setPortfolioData(newData);
    saveToLocalStorage('portfolioData', newData);
  };

  const updateCashPositions = (newCash) => {
    setCashPositions(newCash);
    saveToLocalStorage('cashPositions', newCash);
  };

  // Calculate portfolio metrics
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

  // Error handling functions
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

  // Error Banner Component
  const ErrorBanner = () => {
    if (!errorBanner) return null;

    return (
      <div className="fixed top-0 left-0 right-0 bg-red-600 text-white p-3 z-50">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <AlertCircle size={18} className="mr-2" />
            <span className="text-sm">{errorBanner.message}</span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={copyTechnicalDetails}
              className="bg-red-700 px-2 py-1 rounded text-xs"
            >
              Copy Details
            </button>
            <button
              onClick={() => setErrorBanner(null)}
              className="text-red-200 hover:text-white"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Currency Flag Toggle Component
  const CurrencyToggle = () => {
    return (
      <div className="flex items-center space-x-2">
        <div className={`transition-opacity duration-200 ${
          displayCurrency === 'CAD' ? 'opacity-100' : 'opacity-50'
        }`}>
          <span className="text-xl">🇨🇦</span>
        </div>
        
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={displayCurrency === 'USD'}
            onChange={(e) => setDisplayCurrency(e.target.checked ? 'USD' : 'CAD')}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-blue-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-400"></div>
        </label>
        
        <div className={`transition-opacity duration-200 ${
          displayCurrency === 'USD' ? 'opacity-100' : 'opacity-50'
        }`}>
          <span className="text-xl">🇺🇸</span>
        </div>
      </div>
    );
  };

  // Dashboard Tab Component
  const DashboardTab = () => {
    return (
      <div className="p-4 space-y-6">
        <h2 className="text-2xl font-bold text-center mb-6">Portfolio Dashboard</h2>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800">Original Investment</h3>
            <p className="text-2xl font-bold text-blue-900">
              {formatCurrency(metrics.totalOriginalUSD, 'USD')}
            </p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-green-800">Current Value</h3>
            <p className="text-2xl font-bold text-green-900">
              {formatCurrency(metrics.totalCurrentUSD, 'USD')}
            </p>
          </div>
          
          <div className={`p-4 rounded-lg ${metrics.totalReturn >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
            <h3 className={`font-semibold ${metrics.totalReturn >= 0 ? 'text-green-800' : 'text-red-800'}`}>
              Total Return
            </h3>
            <p className={`text-2xl font-bold ${metrics.totalReturn >= 0 ? 'text-green-900' : 'text-red-900'}`}>
              {formatCurrency(metrics.totalReturn, 'USD')}
            </p>
            <p className={`text-sm ${metrics.totalReturn >= 0 ? 'text-green-700' : 'text-red-700'}`}>
              ({metrics.returnPercentage.toFixed(1)}%)
            </p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-800">Dividends Received</h3>
            <p className="text-2xl font-bold text-purple-900">
              {formatCurrency(metrics.totalDividendsUSD, 'USD')}
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
                      {formatCurrency(gainLossUSD, 'USD')}
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
  };

  // ENHANCED OVERVIEW TAB
  const OverviewTab = () => {
    const [brokerageFilter, setBrokerageFilter] = useState('All');
    const [accountFilter, setAccountFilter] = useState('All');
    const [sortBy, setSortBy] = useState('symbol');

    const uniqueBrokerages = [...new Set(portfolioData.map(stock => stock.brokerage))];
    const uniqueAccountTypes = [...new Set(portfolioData.map(stock => stock.accountType))];

    const filteredData = portfolioData.filter(stock => {
      const brokerageMatch = brokerageFilter === 'All' || stock.brokerage === brokerageFilter;
      const accountMatch = accountFilter === 'All' || stock.accountType === accountFilter;
      return brokerageMatch && accountMatch;
    });

    const sortedData = [...filteredData].sort((a, b) => {
      switch (sortBy) {
        case 'symbol':
          return a.symbol.localeCompare(b.symbol);
        case 'value':
          const aValueUSD = convertToDisplayCurrency(a.currentValue, a.currency);
          const bValueUSD = convertToDisplayCurrency(b.currentValue, b.currency);
          return bValueUSD - aValueUSD;
        case 'performance':
          const aReturn = (a.gainLoss / a.originalInvestment) * 100;
          const bReturn = (b.gainLoss / b.originalInvestment) * 100;
          return bReturn - aReturn;
        default:
          return 0;
      }
    });

    const StockCard = ({ stock }) => {
      const currentValueDisplay = convertToDisplayCurrency(stock.currentValue, stock.currency);
      const gainLossDisplay = convertToDisplayCurrency(stock.gainLoss, stock.currency);
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
                {stock.brokerage}
              </p>
              <p className="text-sm">
                {stock.currentShares.toFixed(2)} shares @ {stock.currency} ${stock.currentPrice.toFixed(2)}
              </p>
            </div>
            <div className="text-right">
              <p className="font-bold">{formatCurrency(currentValueDisplay, displayCurrency)}</p>
              <p className={`text-sm font-medium ${gainLossDisplay >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {gainLossDisplay >= 0 ? '+' : ''}{formatCurrency(Math.abs(gainLossDisplay), displayCurrency)}
              </p>
              <p className={`text-xs ${gainLossDisplay >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                ({returnPct.toFixed(1)}%)
              </p>
            </div>
          </div>
          
          <div className="text-xs text-gray-500 mt-2 flex justify-between">
            <span>Updated: {stock.lastUpdated}</span>
            <span>Purchased: {stock.purchaseDate}</span>
          </div>
        </div>
      );
    };

    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold text-center mb-6">Investment Overview</h2>
        
        <div className="bg-gray-100 rounded-lg p-4 mb-6">
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
                    {brokerage} ({count})
                  </button>
                );
              })}
            </div>
          </div>

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
            </select>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredData.length} of {portfolioData.length} holdings
            {brokerageFilter !== 'All' && ` • ${brokerageFilter}`}
            {accountFilter !== 'All' && ` • ${accountFilter}`}
          </div>
        </div>

        <div className="space-y-3">
          {sortedData.map((stock) => (
            <StockCard key={stock.symbol} stock={stock} />
          ))}
          
          {/* Cash Positions */}
          {cashPositions.length > 0 && (
            <div className="bg-gray-100 border rounded-lg p-4">
              <h3 className="font-bold text-lg mb-3">Cash Positions</h3>
              {cashPositions.map((cash) => {
                const displayValue = convertToDisplayCurrency(cash.amount, cash.currency);
                return (
                  <div key={cash.currency} className="flex justify-between items-center py-2">
                    <div>
                      <span className="font-medium">{cash.currency} Cash</span>
                      <p className="text-sm text-gray-600">
                        Rate: {cash.currency === 'CAD' ? `1 CAD = ${CAD_TO_USD_RATE.toFixed(4)} USD` : '1:1'}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold">{cash.currency} ${cash.amount.toLocaleString('en-US', {minimumFractionDigits: 2})}</span>
                      <p className="text-sm text-gray-600">
                        ≈ {formatCurrency(displayValue, displayCurrency)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  };

  // SECTOR BREAKDOWN TAB
  const SectorBreakdownTab = () => {
    const sectorData = portfolioData.reduce((acc, stock) => {
      const valueDisplay = convertToDisplayCurrency(stock.currentValue, stock.currency);
      
      if (!acc[stock.sector]) {
        acc[stock.sector] = {
          value: 0,
          stocks: [],
          count: 0
        };
      }
      
      acc[stock.sector].value += valueDisplay;
      acc[stock.sector].stocks.push(stock);
      acc[stock.sector].count += 1;
      
      return acc;
    }, {});

    const totalPortfolioValue = Object.values(sectorData).reduce((sum, sector) => sum + sector.value, 0);

    const pieChartData = Object.entries(sectorData).map(([sector, data], index) => ({
      name: sector,
      value: data.value,
      percentage: (data.value / totalPortfolioValue) * 100,
      count: data.count,
      stocks: data.stocks
    })).sort((a, b) => b.value - a.value);

    const SECTOR_COLORS = [
      '#2563eb', '#dc2626', '#16a34a', '#ca8a04', '#9333ea', 
      '#ea580c', '#0891b2', '#be185d', '#65a30d', '#7c3aed'
    ];

    const CustomTooltip = ({ active, payload }) => {
      if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
          <div className="bg-white p-3 border rounded-lg shadow-lg">
            <p className="font-semibold">{data.name}</p>
            <p className="text-sm">Value: {formatCurrency(data.value, displayCurrency)}</p>
            <p className="text-sm">Percentage: {data.percentage.toFixed(1)}%</p>
            <p className="text-sm">Holdings: {data.count}</p>
          </div>
        );
      }
      return null;
    };

    const handleSectorClick = (sector) => {
      setSelectedSector(sector);
    };

    const handleBackToMain = () => {
      setSelectedSector(null);
    };

    if (!selectedSector) {
      return (
        <div className="p-4">
          <h2 className="text-2xl font-bold text-center mb-6">Sector Breakdown</h2>
          
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
                    <p className="font-bold">{formatCurrency(sector.value, displayCurrency)}</p>
                    <p className="text-sm text-gray-600">({sector.percentage.toFixed(1)}%)</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

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
              {formatCurrency(selectedSector.value, displayCurrency)} 
              ({selectedSector.percentage.toFixed(1)}% of portfolio)
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {selectedSector.stocks
            .sort((a, b) => {
              const aValue = convertToDisplayCurrency(a.currentValue, a.currency);
              const bValue = convertToDisplayCurrency(b.currentValue, b.currency);
              return bValue - aValue;
            })
            .map((stock) => {
              const currentValueDisplay = convertToDisplayCurrency(stock.currentValue, stock.currency);
              const gainLossDisplay = convertToDisplayCurrency(stock.gainLoss, stock.currency);
              const returnPct = (stock.gainLoss / stock.originalInvestment) * 100;
              const sectorAllocation = (currentValueDisplay / selectedSector.value) * 100;
              
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
                      <p className="font-bold">{formatCurrency(currentValueDisplay, displayCurrency)}</p>
                      <p className={`text-sm font-medium ${gainLossDisplay >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {gainLossDisplay >= 0 ? '+' : ''}{formatCurrency(Math.abs(gainLossDisplay), displayCurrency)}
                      </p>
                      <p className={`text-xs ${gainLossDisplay >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        ({returnPct.toFixed(1)}%)
                      </p>
                    </div>
                  </div>
                  
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

        <div className="mt-6 bg-gray-100 rounded-lg p-4">
          <h3 className="font-bold mb-2">Sector Summary</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Total Value</p>
              <p className="font-bold">{formatCurrency(selectedSector.value, displayCurrency)}</p>
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
              <p className="font-bold">{formatCurrency(selectedSector.value / selectedSector.count, displayCurrency)}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ENHANCED DIVIDEND TAB
  const DividendTab = () => {
    const [dividendForm, setDividendForm] = useState({
      symbol: '',
      dividendAmount: '',
      sharesReceived: '',
      currency: 'USD'
    });

    const [showAddForm, setShowAddForm] = useState(false);

    // Calculate dividend metrics
    const calculateDividendMetrics = () => {
      const currentYear = new Date().getFullYear();
      
      let totalDividendsDisplay = 0;
      let totalPortfolioValueDisplay = 0;
      let dividendPayingStocks = [];
      
      portfolioData.forEach(stock => {
        const dividendDisplay = convertToDisplayCurrency(stock.dividendReceived, stock.currency);
        const currentValueDisplay = convertToDisplayCurrency(stock.currentValue, stock.currency);
        
        totalDividendsDisplay += dividendDisplay;
        totalPortfolioValueDisplay += currentValueDisplay;
        
        if (stock.dividendReceived > 0) {
          const currentYield = stock.originalInvestment > 0 
            ? (stock.dividendReceived / stock.originalInvestment) * 100 
            : 0;
            
          dividendPayingStocks.push({
            ...stock,
            dividendDisplay,
            currentValueDisplay,
            currentYield,
            annualEstimate: dividendDisplay * 4 // Rough quarterly estimation
          });
        }
      });

      // Calculate weighted average yield
      const portfolioYield = totalPortfolioValueDisplay > 0 
        ? (totalDividendsDisplay / totalPortfolioValueDisplay) * 100 
        : 0;

      // Market benchmark (typical dividend yield range)
      const marketBenchmark = 2.1; // Average market dividend yield

      return {
        totalDividendsDisplay,
        portfolioYield,
        marketBenchmark,
        dividendPayingStocks: dividendPayingStocks.sort((a, b) => b.currentYield - a.currentYield),
        projectedAnnual: totalDividendsDisplay * 4,
        previousYearEstimate: totalDividendsDisplay * 3.8 // Simulated previous year
      };
    };

    const dividendMetrics = calculateDividendMetrics();

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
      setShowAddForm(false);
    };

    return (
      <div className="p-4 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Dividend Management</h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors"
          >
            {showAddForm ? 'Cancel' : 'Add Dividend'}
          </button>
        </div>

        {/* Add Dividend Form */}
        {showAddForm && (
          <div className="bg-white border rounded-lg p-4 shadow-sm">
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
        )}
        
        {/* 1. TOTAL DIVIDEND INCOME CARD */}
        <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-lg p-6 shadow-md">
          <h3 className="font-bold text-lg text-green-800 mb-4">Total Dividend Income</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-sm text-green-600 mb-1">Year-to-Date</p>
              <p className="text-2xl font-bold text-green-900">
                {formatCurrency(dividendMetrics.totalDividendsDisplay, displayCurrency)}
              </p>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-green-600 mb-1">Previous Year (Est.)</p>
              <p className="text-xl font-bold text-green-800">
                {formatCurrency(dividendMetrics.previousYearEstimate, displayCurrency)}
              </p>
              <p className="text-xs text-green-600">
                {dividendMetrics.totalDividendsDisplay > dividendMetrics.previousYearEstimate ? '+' : ''}
                {(((dividendMetrics.totalDividendsDisplay - dividendMetrics.previousYearEstimate) / dividendMetrics.previousYearEstimate) * 100).toFixed(1)}% YoY
              </p>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-green-600 mb-1">Projected Annual</p>
              <p className="text-xl font-bold text-green-800">
                {formatCurrency(dividendMetrics.projectedAnnual, displayCurrency)}
              </p>
              <p className="text-xs text-green-600">Based on current rate</p>
            </div>
          </div>
        </div>

        {/* 2. DIVIDEND YIELD TRACKING CARD */}
        <div className="bg-white border rounded-lg p-4 shadow-md">
          <h3 className="font-bold text-lg mb-4">Dividend Yield Tracking</h3>
          
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-2">Portfolio Yield</p>
              <p className="text-3xl font-bold text-blue-900">
                {dividendMetrics.portfolioYield.toFixed(2)}%
              </p>
              <p className="text-sm text-gray-500">Weighted average</p>
            </div>
            
            <div>
              <p className="text-sm text-gray-600 mb-2">vs. Market Benchmark</p>
              <p className="text-2xl font-bold text-gray-700">
                {dividendMetrics.marketBenchmark.toFixed(1)}%
              </p>
              <p className={`text-sm font-medium ${
                dividendMetrics.portfolioYield > dividendMetrics.marketBenchmark 
                  ? 'text-green-600' 
                  : 'text-red-600'
              }`}>
                {dividendMetrics.portfolioYield > dividendMetrics.marketBenchmark ? 'Above' : 'Below'} market average
              </p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Portfolio vs. Market</span>
              <span className={`font-bold ${
                dividendMetrics.portfolioYield > dividendMetrics.marketBenchmark 
                  ? 'text-green-600' 
                  : 'text-red-600'
              }`}>
                {dividendMetrics.portfolioYield > dividendMetrics.marketBenchmark ? '+' : ''}
                {(dividendMetrics.portfolioYield - dividendMetrics.marketBenchmark).toFixed(2)}%
              </span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ 
                  width: `${Math.min((dividendMetrics.portfolioYield / (dividendMetrics.marketBenchmark * 2)) * 100, 100)}%` 
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* 3. INDIVIDUAL STOCK DIVIDENDS CARD */}
        <div className="bg-white border rounded-lg p-4 shadow-md">
          <h3 className="font-bold text-lg mb-4">Individual Stock Dividends</h3>
          
          {dividendMetrics.dividendPayingStocks.length > 0 ? (
            <div className="space-y-3">
              {dividendMetrics.dividendPayingStocks.map(stock => (
                <div key={stock.symbol} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-bold text-lg">{stock.symbol}</h4>
                    <p className="text-sm text-gray-600">{stock.sector}</p>
                    <p className="text-xs text-gray-500">
                      {stock.currentShares.toFixed(2)} shares
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-bold text-green-600">
                      {formatCurrency(stock.dividendDisplay, displayCurrency)}
                    </p>
                    <p className="text-sm text-gray-600">
                      Yield: {stock.currentYield.toFixed(2)}%
                    </p>
                    <p className="text-xs text-gray-500">
                      Est. Annual: {formatCurrency(stock.annualEstimate, displayCurrency)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No dividend payments recorded yet</p>
              <button
                onClick={() => setShowAddForm(true)}
                className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Add your first dividend
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Side Menu Component
  const SideMenu = () => {
    const menuItems = [
      { id: 'portfolio', icon: BarChart3, label: 'Portfolio', available: true },
      { id: 'export', icon: Download, label: 'Export', available: true },
      { id: 'update', icon: RefreshCw, label: 'Update', available: true },
      { id: 'settings', icon: Settings, label: 'Settings', available: true }
    ];

    const handleWorkflowChange = (workflowId) => {
      if (menuItems.find(item => item.id === workflowId)?.available) {
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
            <button onClick={() => setSideMenuOpen(false)} className="p-2">
              <X size={20} />
            </button>
          </div>
          
          <div className="p-4 space-y-2">
            {menuItems.map(item => {
              const Icon = item.icon;
              const isActive = activeWorkflow === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleWorkflowChange(item.id)}
                  className={`w-full flex items-center p-3 rounded-lg text-left transition-colors ${
                    isActive 
                      ? 'bg-blue-100 text-blue-600 border border-blue-200' 
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <Icon size={20} className="mr-3" />
                  <div className="flex-1">
                    <div className="font-medium">{item.label}</div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-gray-50">
            <div className="text-xs text-gray-500">
              <p>Portfolio PWA v1.0</p>
              <p>Phase 1: Complete</p>
              <p className="mt-1">
                Total: {formatCurrency(metrics.totalCurrentUSD, 'USD')}
              </p>
            </div>
          </div>
        </div>
      </>
    );
  };

  // Navigation Component
  const Navigation = () => {
    if (activeWorkflow !== 'portfolio') return null;

    const tabs = [
      { id: 'dashboard', icon: TrendingUp, label: 'Dashboard' },
      { id: 'overview', icon: List, label: 'Overview' },
      { id: 'sectors', icon: PieChart, label: 'Sectors' },
      { id: 'dividends', icon: DollarSign, label: 'Dividends' }
    ];

    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 z-30">
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

  // Content Renderer
  const renderContent = () => {
    switch (activeWorkflow) {
      case 'portfolio':
        switch (activeTab) {
          case 'dashboard':
            return <DashboardTab />;
          case 'overview':
            return <OverviewTab />;
          case 'sectors':
            return <SectorBreakdownTab />;
          case 'dividends':
            return <DividendTab />;
          default:
            return <DashboardTab />;
        }
      default:
        return (
          <div className="p-4 text-center">
            <h2 className="text-2xl font-bold mb-4">{activeWorkflow}</h2>
            <p className="text-gray-600">Feature coming soon</p>
          </div>
        );
    }
  };

  // Main App Component
  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen flex flex-col pb-20">
      <ErrorBanner />
      <SideMenu />
      
      <div style={{
        backgroundColor: '#2563eb', 
        color: 'white', 
        padding: '1rem',
        marginTop: errorBanner ? '60px' : '0'
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
              Total: {formatCurrency(metrics.totalCurrentUSD, 'USD')}
            </p>
            <p className="text-xs opacity-75">
              1 CAD = ${CAD_TO_USD_RATE.toFixed(4)} USD
            </p>
          </div>
          
          <CurrencyToggle />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {renderContent()}
      </div>

      <Navigation />
    </div>
  );
};

export default PortfolioApp;