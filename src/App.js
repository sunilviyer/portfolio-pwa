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
      console.log("🔄 Starting automated portfolio + cash update...");
      
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
          console.log(`✅ Exchange rate: 1 CAD = ${exchangeRate} USD`);
          
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
        
        console.log(`✅ Successfully updated ${results.length} stocks and exchange rate`);
        if (errors.length > 0) {
          console.warn(`⚠️ Failed to update ${errors.length} stocks:`, errors);
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
        console.error("❌ Portfolio update failed:", error);
        throw error;
      }
    }
  };

  // Helper functions for localStorage
  const saveToLocalStorage = (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      console.log(`✅ Saved ${key} to localStorage`);
    } catch (error) {
      console.error(`❌ Failed to save ${key}:`, error);
    }
  };

  const loadFromLocalStorage = (key, fallback) => {
    try {
      const saved = localStorage.getItem(key);
      if (saved && saved !== 'undefined') {
        const parsed = JSON.parse(saved);
        console.log(`✅ Loaded ${key} from localStorage`);
        return parsed;
      }
    } catch (error) {
      console.error(`❌ Failed to load ${key}:`, error);
    }
    console.log(`📁 Using initial ${key} data`);
    return fallback;
  };

  // State management
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

  // Form states
  const [newCashForm, setNewCashForm] = useState({
    currency: 'USD',
    amount: '',
    dateAdded: new Date().toISOString().split('T')[0]
  });

  // Conversion rate for display (use live rate from cash positions)
  const getCurrentExchangeRate = () => {
    const cadCash = cashPositions.find(cash => cash.currency === 'CAD');
    return cadCash?.exchangeRate || 0.74;
  };

  const CAD_TO_USD_RATE = getCurrentExchangeRate();

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
      
      alert(`✅ Portfolio & Cash Updated!\n\n📈 ${result.updateStats.successful} stocks updated\n💱 Exchange rate: 1 CAD = ${result.updateStats.exchangeRate.toFixed(4)} USD`);
      
    } catch (error) {
      console.error('API update failed:', error);
      alert(`❌ Update failed: ${error.message}`);
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

      {/* Exchange Rate Info */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-blue-800 mb-2">💱 Current Exchange Rate</h3>
        <p className="text-lg font-bold text-blue-900">
          1 CAD = ${CAD_TO_USD_RATE.toFixed(4)} USD
        </p>
        {lastApiUpdate && (
          <div className="mt-2">
            <p className="text-sm text-blue-700">
              Last updated: {new Date(lastApiUpdate.timestamp).toLocaleString()}
            </p>
            <p className="text-sm text-blue-600">
              📈 Updated {lastApiUpdate.stats.successful} stocks + exchange rate
            </p>
          </div>
        )}
      </div>
    </div>
  );

  // ENHANCED OVERVIEW TAB
  const OverviewTab = () => {
    const [brokerageFilter, setBrokerageFilter] = useState('All');
    const [accountFilter, setAccountFilter] = useState('All');
    const [groupByBrokerage, setGroupByBrokerage] = useState(false);
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
          const aValueUSD = a.currentValue * (a.currency === 'CAD' ? CAD_TO_USD_RATE : 1);
          const bValueUSD = b.currentValue * (b.currency === 'CAD' ? CAD_TO_USD_RATE : 1);
          return bValueUSD - aValueUSD;
        case 'performance':
          const aReturn = (a.gainLoss / a.originalInvestment) * 100;
          const bReturn = (b.gainLoss / b.originalInvestment) * 100;
          return bReturn - aReturn;
        case 'brokerage':
          return a.brokerage.localeCompare(b.brokerage);
        default:
          return 0;
      }
    });

    const groupedData = groupByBrokerage 
      ? sortedData.reduce((acc, stock) => {
          if (!acc[stock.brokerage]) {
            acc[stock.brokerage] = [];
          }
          acc[stock.brokerage].push(stock);
          return acc;
        }, {})
      : null;

    const calculateBrokerageStats = (stocks) => {
      const totalValueUSD = stocks.reduce((sum, stock) => {
        const conversionRate = stock.currency === 'CAD' ? CAD_TO_USD_RATE : 1;
        return sum + (stock.currentValue * conversionRate);
      }, 0);

      const totalGainLossUSD = stocks.reduce((sum, stock) => {
        const conversionRate = stock.currency === 'CAD' ? CAD_TO_USD_RATE : 1;
        return sum + (stock.gainLoss * conversionRate);
      }, 0);

      return { totalValueUSD, totalGainLossUSD, stockCount: stocks.length };
    };

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
          
          <div className="text-xs text-gray-500 mt-2 flex justify-between">
            <span>Updated: {stock.lastUpdated}</span>
            <span>Purchased: {stock.purchaseDate}</span>
          </div>
        </div>
      );
    };

    const BrokerageGroup = ({ brokerage, stocks }) => {
      const stats = calculateBrokerageStats(stocks);
      
      return (
        <div className="mb-6">
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
                    📱 {brokerage} ({count})
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

          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredData.length} of {portfolioData.length} holdings
            {brokerageFilter !== 'All' && ` • ${brokerageFilter}`}
            {accountFilter !== 'All' && ` • ${accountFilter}`}
          </div>
        </div>

        <div className="space-y-3">
          {groupByBrokerage ? (
            Object.entries(groupedData).map(([brokerage, stocks]) => (
              <BrokerageGroup 
                key={brokerage} 
                brokerage={brokerage} 
                stocks={stocks} 
              />
            ))
          ) : (
            sortedData.map((stock) => (
              <StockCard key={stock.symbol} stock={stock} />
            ))
          )}
          
          {/* Enhanced Cash Positions */}
          {cashPositions.length > 0 && (
            <div className="bg-gray-100 border rounded-lg p-4">
              <h3 className="font-bold text-lg mb-3">💰 Cash Positions</h3>
              {cashPositions.map((cash) => {
                const usdValue = cash.currency === 'CAD' ? cash.amount * CAD_TO_USD_RATE : cash.amount;
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
                        ≈ ${usdValue.toLocaleString('en-US', {minimumFractionDigits: 2})} USD
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
            <p className="text-sm">Value: ${data.value.toLocaleString('en-US', {minimumFractionDigits: 2})} USD</p>
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

  // DIVIDEND TAB
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

  // ENHANCED UPDATE TAB WITH CASH AND CAD STOCKS
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

    const [dividendForm, setDividendForm] = useState({
      symbol: '',
      dividendAmount: '',
      sharesReceived: '',
      currency: 'USD'
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
      
      // Auto-add .TO suffix for CAD stocks
      const symbol = localNewStockForm.currency === 'CAD' 
        ? (localNewStockForm.symbol.includes('.TO') ? localNewStockForm.symbol : `${localNewStockForm.symbol}.TO`)
        : localNewStockForm.symbol;
      
      const newStock = {
        symbol: symbol.toUpperCase(),
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
          dateAdded: newCashForm.dateAdded,
          exchangeRate: newCashForm.currency === 'CAD' ? CAD_TO_USD_RATE : 1.0
        }];
        updateCashPositions(updatedCash);
      }
      
      setNewCashForm({
        currency: 'USD',
        amount: '',
        dateAdded: new Date().toISOString().split('T')[0]
      });
    };

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

    // Data management functions
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
      event.target.value = '';
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

    const usdStocks = portfolioData.filter(stock => stock.currency === 'USD');
    const cadStocks = portfolioData.filter(stock => stock.currency === 'CAD');

    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold text-center mb-6">Portfolio Updates</h2>
        
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

        {/* ENHANCED API UPDATES */}
        {updateMode === 'api' && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-bold mb-3 flex items-center text-blue-800">
                <Zap className="mr-2" size={20} />
                Enhanced API Updates (USD + CAD + Cash)
              </h3>
              
              <div className="mb-4 text-sm text-gray-700">
                <p>📊 <strong>Your Portfolio:</strong> {usdStocks.length} USD stocks, {cadStocks.length} CAD stocks</p>
                <p>🔄 <strong>Will update:</strong> All {portfolioData.length} stocks + CAD/USD exchange rate</p>
                <p>⏱️ <strong>Estimated time:</strong> ~{Math.ceil((portfolioData.length + 1) * 12 / 60)} minutes</p>
                <p>🎯 <strong>Rate limit:</strong> 25 calls/day (free tier) | 5 calls/minute</p>
                <p>💰 <strong>Cash rates:</strong> Live CAD/USD exchange rate</p>
              </div>

              {lastApiUpdate && (
                <div className="bg-blue-100 p-3 rounded-md mb-4">
                  <h4 className="font-medium text-blue-800">Last Update:</h4>
                  <p className="text-sm text-blue-700">
                    {new Date(lastApiUpdate.timestamp).toLocaleString()}
                  </p>
                  <p className="text-sm text-blue-600">
                    ✅ {lastApiUpdate.stats.successful} stocks + exchange rate updated
                  </p>
                  <p className="text-sm text-blue-600">
                    💱 Rate: 1 CAD = {lastApiUpdate.stats.exchangeRate?.toFixed(4)} USD
                  </p>
                </div>
              )}

              {isUpdating && updateProgress && (
                <div className="bg-white p-3 rounded-md mb-4 border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Updating Portfolio + Cash...</span>
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
                  {isUpdating ? '🔄 Updating Portfolio + Cash...' : '🚀 Update All Stocks + Exchange Rate'}
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => EnhancedAPI.getStockQuote('AAPL').then(quote => 
                      alert(`✅ Test Success!\n\nAAPL: $${quote.price}\nChange: ${quote.change >= 0 ? '+' : ''}${quote.change} (${quote.changePercent}%)`)
                    ).catch(error => alert(`❌ Test Failed: ${error.message}`))}
                    className="bg-green-600 text-white py-2 rounded-md font-medium hover:bg-green-700 transition-colors"
                  >
                    🧪 Test USD Stock
                  </button>
                  
                  <button
                    onClick={() => EnhancedAPI.getExchangeRate().then(rate => 
                      alert(`✅ Exchange Rate Test!\n\n1 CAD = ${rate.rate} USD\nUpdated: ${rate.lastUpdated}`)
                    ).catch(error => alert(`❌ Exchange Test Failed: ${error.message}`))}
                    className="bg-purple-600 text-white py-2 rounded-md font-medium hover:bg-purple-700 transition-colors"
                  >
                    💱 Test Exchange Rate
                  </button>
                </div>
              </div>
            </div>

            {/* Enhanced stocks display */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white border rounded-lg p-4">
                <h4 className="font-bold mb-3 text-green-700">📈 USD Stocks (API Updates)</h4>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {usdStocks.map(stock => (
                    <div key={stock.symbol} className="flex justify-between text-sm">
                      <span className="font-medium">{stock.symbol}</span>
                      <span className="text-gray-600">
                        ${stock.currentPrice.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border rounded-lg p-4">
                <h4 className="font-bold mb-3 text-red-700">🍁 CAD Stocks (API Updates)</h4>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {cadStocks.map(stock => (
                    <div key={stock.symbol} className="flex justify-between text-sm">
                      <span className="font-medium">{stock.symbol}</span>
                      <span className="text-gray-600">
                        CAD ${stock.currentPrice.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  ✅ Alpha Vantage supports .TO symbols
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Manual Price Update Form */}
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

        {/* Enhanced Add Stock Form */}
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
                    value={localNewStockForm.symbol}
                    onChange={(e) => setLocalNewStockForm(prev => ({ ...prev, symbol: e.target.value.toUpperCase() }))}
                    className="w-full p-2 border rounded-md uppercase"
                    placeholder="AAPL or ENB"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Currency *</label>
                  <select
                    value={localNewStockForm.currency}
                    onChange={(e) => setLocalNewStockForm(prev => ({ ...prev, currency: e.target.value }))}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="USD">USD</option>
                    <option value="CAD">CAD (auto-adds .TO)</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Shares *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={localNewStockForm.shares}
                    onChange={(e) => setLocalNewStockForm(prev => ({ ...prev, shares: e.target.value }))}
                    className="w-full p-2 border rounded-md"
                    placeholder="100"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Price per Share *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={localNewStockForm.price}
                    onChange={(e) => setLocalNewStockForm(prev => ({ ...prev, price: e.target.value }))}
                    className="w-full p-2 border rounded-md"
                    placeholder="150.00"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Sector *</label>
                  <select
                    value={localNewStockForm.sector}
                    onChange={(e) => setLocalNewStockForm(prev => ({ ...prev, sector: e.target.value }))}
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
                    value={localNewStockForm.accountType}
                    onChange={(e) => setLocalNewStockForm(prev => ({ ...prev, accountType: e.target.value }))}
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
                  value={localNewStockForm.purchaseDate}
                  onChange={(e) => setLocalNewStockForm(prev => ({ ...prev, purchaseDate: e.target.value }))}
                  className="w-full p-2 border rounded-md"
                />
              </div>
              
              {localNewStockForm.shares && localNewStockForm.price && (
                <div className="bg-gray-100 p-3 rounded-md">
                  <p className="text-sm font-medium">
                    Total Investment: {localNewStockForm.currency} ${(parseFloat(localNewStockForm.shares || 0) * parseFloat(localNewStockForm.price || 0)).toLocaleString('en-US', {minimumFractionDigits: 2})}
                  </p>
                  {localNewStockForm.currency === 'CAD' && (
                    <p className="text-sm text-gray-600">
                      Symbol will be: {localNewStockForm.symbol.includes('.TO') ? localNewStockForm.symbol : `${localNewStockForm.symbol}.TO`}
                    </p>
                  )}
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

        {/* Enhanced Add Cash Form */}
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

              {newCashForm.amount && newCashForm.currency === 'CAD' && (
                <div className="bg-gray-100 p-3 rounded-md">
                  <p className="text-sm font-medium">
                    USD Value: ~${(parseFloat(newCashForm.amount || 0) * CAD_TO_USD_RATE).toLocaleString('en-US', {minimumFractionDigits: 2})} USD
                  </p>
                  <p className="text-sm text-gray-600">
                    Using rate: 1 CAD = {CAD_TO_USD_RATE.toFixed(4)} USD
                  </p>
                </div>
              )}
              
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

        {/* Data Management */}
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
              <p><strong>💡 Enhanced Data Management:</strong></p>
              <p>• All changes automatically saved</p>
              <p>• Cash exchange rates updated via API</p>
              <p>• CAD stocks support via .TO symbols</p>
              <p>• Backup includes API update history</p>
              <div className="mt-2">
                <p><strong>📊 Current Storage:</strong></p>
                <p>• {portfolioData.length} stocks tracked</p>
                <p>• {cashPositions.length} cash positions</p>
                <p>• Exchange rate: 1 CAD = {CAD_TO_USD_RATE.toFixed(4)} USD</p>
                <p>• Last saved: {new Date().toLocaleString()}</p>
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
        {isUpdating && (
          <p className="text-xs opacity-75 mt-1">🔄 Updating prices + exchange rate...</p>
        )}
        <p className="text-xs opacity-75">
          💱 1 CAD = ${CAD_TO_USD_RATE.toFixed(4)} USD
        </p>
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