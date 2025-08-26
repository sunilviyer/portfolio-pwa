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

  // Enhanced API Functions for both USD and CAD stocks + Exchange Rates
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
    },

    async updatePortfolioAndCash(currentPortfolio, currentCash, onProgress) {
      console.log("Starting automated portfolio + cash update...");
      
      const results = [];
      const errors = [];
      let exchangeRate = 0.74; // fallback
      
      // Get all stocks (USD and CAD with .TO suffix)
      const allStocks = currentPortfolio;
      const totalOperations = allStocks.length + 1; // +1 for exchange rate
      let currentOperation = 0;
      
      try {
        // First, get exchange rate
        try {
          if (onProgress) {
            onProgress({
              current: ++currentOperation,
              total: totalOperations,
              symbol: 'CAD/USD',
              status: 'fetching'
            });
          }
          
          console.log("Fetching CAD/USD exchange rate...");
          const exchangeData = await this.getExchangeRate();
          exchangeRate = exchangeData.rate;
          console.log(`Exchange rate: 1 CAD = ${exchangeRate} USD`);
          
          // Wait for rate limit
          await new Promise(resolve => setTimeout(resolve, 12000));
          
        } catch (error) {
          console.warn("Failed to get exchange rate, using fallback:", error.message);
        }
        
        // Update stock prices
        for (let i = 0; i < allStocks.length; i++) {
          const stock = allStocks[i];
          
          try {
            if (onProgress) {
              onProgress({
                current: ++currentOperation,
                total: totalOperations,
                symbol: stock.symbol,
                status: 'fetching'
              });
            }
            
            console.log(`Fetching ${stock.symbol} (${currentOperation}/${totalOperations})...`);
            const quote = await this.getStockQuote(stock.symbol);
            results.push({ ...quote, originalSymbol: stock.symbol });
            
            // Rate limiting: wait between requests
            if (i < allStocks.length - 1) {
              console.log(`Waiting 12 seconds before next request...`);
              if (onProgress) {
                onProgress({
                  current: currentOperation,
                  total: totalOperations,
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
          
          if (updatedQuote) {
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
            return stock;
          }
        });
        
        // Update cash positions with new exchange rate
        const updatedCash = currentCash.map(cash => ({
          ...cash,
          exchangeRate: cash.currency === 'CAD' ? exchangeRate : 1.0,
          lastUpdated: new Date().toISOString()
        }));
        
        console.log(`Successfully updated ${results.length} stocks and exchange rate`);
        if (errors.length > 0) {
          console.warn(`Failed to update ${errors.length} stocks:`, errors);
        }
        
        return {
          portfolio: updatedPortfolio,
          cash: updatedCash,
          updateStats: {
            successful: results.length,
            failed: errors.length,
            totalProcessed: allStocks.length,
            exchangeRate: exchangeRate,
            timestamp: new Date().toISOString()
          }
        };
        
      } catch (error) {
        console.error("Portfolio update failed:", error);
        throw error;
      }
    }
  };

  // Helper functions for localStorage
  const saveToLocalStorage = (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      console.log(`Saved ${key} to localStorage`);
    } catch (error) {
      console.error(`Failed to save ${key}:`, error);
    }
  };

  const loadFromLocalStorage = (key, fallback) => {
    try {
      const saved = localStorage.getItem(key);
      if (saved && saved !== 'undefined') {
        const parsed = JSON.parse(saved);
        console.log(`Loaded ${key} from localStorage`);
        return parsed;
      }
    } catch (error) {
      console.error(`Failed to load ${key}:`, error);
    }
    console.log(`Using initial ${key} data`);
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

  // API Update States
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateProgress, setUpdateProgress] = useState(null);
  const [lastApiUpdate, setLastApiUpdate] = useState(() => 
    loadFromLocalStorage('lastApiUpdate', null)
  );

  // Form states
  const [newCashForm, setNewCashForm] = useState({
    currency: 'USD',
    amount: '',
    dateAdded: new Date().toISOString().split('T')[0]
  });

  // Service Worker Registration
  useEffect(() => {
    // Register service worker for PWA functionality
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration);
            
            // Listen for updates
            registration.addEventListener('updatefound', () => {
              const newWorker = registration.installing;
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New version available
                  console.log('New app version available. Please refresh.');
                }
              });
            });
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
          });
      });

      // Listen for messages from service worker
      navigator.serviceWorker.addEventListener('message', (event) => {
        const { type, payload } = event.data;
        
        switch (type) {
          case 'SYNC_COMPLETE':
            console.log('Background sync completed');
            // Optionally refresh portfolio data here
            break;
          default:
            console.log('Unknown message from SW:', type);
        }
      });
    }
  }, []);

  // Cache portfolio data when it updates (for offline access)
  useEffect(() => {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'CACHE_PORTFOLIO_DATA',
        payload: {
          portfolioData,
          cashPositions,
          lastApiUpdate,
          timestamp: new Date().toISOString()
        }
      });
    }
  }, [portfolioData, cashPositions, lastApiUpdate]);

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

  // Enhanced API Update Function
  const handleApiUpdate = async () => {
    setIsUpdating(true);
    setUpdateProgress({ current: 0, total: 0, symbol: 'Starting...', status: 'starting' });
    
    try {
      const result = await EnhancedAPI.updatePortfolioAndCash(portfolioData, cashPositions, setUpdateProgress);
      updatePortfolioData(result.portfolio);
      updateCashPositions(result.cash);
      
      const updateInfo = {
        timestamp: new Date().toISOString(),
        stats: result.updateStats
      };
      setLastApiUpdate(updateInfo);
      saveToLocalStorage('lastApiUpdate', updateInfo);
      
      alert(`Portfolio & Cash Updated!\n\n${result.updateStats.successful} stocks updated\nExchange rate: 1 CAD = ${result.updateStats.exchangeRate.toFixed(4)} USD`);
      
    } catch (error) {
      console.error('API update failed:', error);
      alert(`Update failed: ${error.message}`);
    } finally {
      setIsUpdating(false);
      setUpdateProgress(null);
    }
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

  // Simple placeholder tabs (keeping existing working tabs)
  const OverviewTab = () => (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Overview</h2>
      <p>Overview content will be here</p>
    </div>
  );

  const SectorBreakdownTab = () => (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Sectors</h2>
      <p>Sector breakdown content will be here</p>
    </div>
  );

  const DividendTab = () => (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Dividends</h2>
      <p>Dividend content will be here</p>
    </div>
  );

  const ExportTab = () => (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Export</h2>
      <p>Export functionality will be here</p>
    </div>
  );

  const SettingsTab = () => (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Settings</h2>
      <p>Settings will be here</p>
    </div>
  );

  const UpdatePriceTab = () => (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Updates</h2>
      <p>Update functionality will be here</p>
    </div>
  );

  // Side Menu Component
  const SideMenu = () => {
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
        label: 'News', 
        available: false,
        description: 'Coming in Phase 3'
      },
      { 
        id: 'transactions', 
        icon: CreditCard, 
        label: 'Transactions', 
        available: false,
        description: 'Coming in Phase 8'
      }
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
          
          {/* Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-gray-50">
            <div className="text-xs text-gray-500">
              <p>Portfolio PWA v1.0</p>
              <p>Phase 1: Core Foundation</p>
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
    // Only show bottom tabs when Portfolio workflow is active
    if (activeWorkflow !== 'portfolio') {
      return null;
    }

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
      case 'export':
        return <ExportTab />;
      case 'update':
        return <UpdatePriceTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return (
          <div className="p-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Feature Coming Soon</h2>
            <p className="text-gray-600">This feature will be available in a future phase.</p>
          </div>
        );
    }
  };

  // Main App Component
  return (
    <div className="max-w-md mx-auto bg-gray-50 min-h-screen flex flex-col pb-20">
      {/* Side Menu */}
      <SideMenu />
      
      {/* Header with Currency Toggle */}
      <div style={{backgroundColor: '#2563eb', color: 'white', padding: '1rem'}}>
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSideMenuOpen(true)}
            className="p-2 hover:bg-blue-700 rounded-lg transition-colors"
          >
            <Menu size={20} />
          </button>
          
          <div className="text-center flex-1">
            <h1 className="text-xl font-bold">
              {activeWorkflow === 'portfolio' ? 'Portfolio' : 
               activeWorkflow === 'export' ? 'Export' :
               activeWorkflow === 'update' ? 'Update' :
               activeWorkflow === 'settings' ? 'Settings' : 'Portfolio App'}
            </h1>
            {activeWorkflow === 'portfolio' && (
              <>
                <p className="text-sm opacity-90">
                  Total: {formatCurrency(metrics.totalCurrentUSD, 'USD')}
                </p>
                <p className="text-xs opacity-75">
                  1 CAD = ${CAD_TO_USD_RATE.toFixed(4)} USD
                </p>
              </>
            )}
          </div>
          
          <CurrencyToggle />
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto">
        {renderContent()}
      </div>

      {/* Navigation - Only shows for Portfolio workflow */}
      <Navigation />
    </div>
  );
};

export default PortfolioApp;