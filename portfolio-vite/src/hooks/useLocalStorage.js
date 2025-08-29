// File: src/hooks/useLocalStorage.js
import { useState } from 'react';  
import { INITIAL_PORTFOLIO_DATA, INITIAL_CASH_POSITIONS } from '../data/initialData';

import { useState } from 'react';

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error loading ${key}:`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving ${key}:`, error);
    }
  };

  return [storedValue, setValue];
};

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
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error(`Failed to load ${key}:`, error);
  }
  return fallback;
};

export const usePortfolioData = () => {
  const [portfolioData, setPortfolioData] = useState(() => 
    loadFromLocalStorage('portfolioData', INITIAL_PORTFOLIO_DATA)
  );
  
  const [cashPositions, setCashPositions] = useState(() => 
    loadFromLocalStorage('cashPositions', INITIAL_CASH_POSITIONS)
  );

  const updatePortfolioData = (newData) => {
    setPortfolioData(newData);
    saveToLocalStorage('portfolioData', newData);
  };

  const updateCashPositions = (newCash) => {
    setCashPositions(newCash);
    saveToLocalStorage('cashPositions', newCash);
  };

  const addDividend = (symbol, dividendAmount, sharesReceived = 0) => {
    const updatedData = portfolioData.map(stock => {
      if (stock.symbol === symbol) {
        const newDividendAmount = parseFloat(dividendAmount) || 0;
        const newShares = parseFloat(sharesReceived) || 0;
        
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
  };

  const resetToInitialData = () => {
    setPortfolioData(INITIAL_PORTFOLIO_DATA);
    setCashPositions(INITIAL_CASH_POSITIONS);
    saveToLocalStorage('portfolioData', INITIAL_PORTFOLIO_DATA);
    saveToLocalStorage('cashPositions', INITIAL_CASH_POSITIONS);
  };

  return {
    portfolioData,
    cashPositions,
    updatePortfolioData,
    updateCashPositions,
    addDividend,
    resetToInitialData
  };
};

export default usePortfolioData;