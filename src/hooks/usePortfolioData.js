import { useState } from 'react';

// Initial hardcoded data
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
  }
];

const INITIAL_CASH_POSITIONS = [
  { currency: 'USD', amount: 23432.13, dateAdded: '2025-01-01', exchangeRate: 1.0 },
  { currency: 'CAD', amount: 48.02, dateAdded: '2025-01-01', exchangeRate: 0.74 }
];

export const usePortfolioData = () => {
  const [portfolioData, setPortfolioData] = useState(INITIAL_PORTFOLIO_DATA);
  const [cashPositions, setCashPositions] = useState(INITIAL_CASH_POSITIONS);

  const updatePortfolioData = (newData) => {
    setPortfolioData(newData);
  };

  const updateCashPositions = (newCash) => {
    setCashPositions(newCash);
  };

  const resetToInitialData = () => {
    setPortfolioData(INITIAL_PORTFOLIO_DATA);
    setCashPositions(INITIAL_CASH_POSITIONS);
  };

  return {
    portfolioData,
    cashPositions,
    updatePortfolioData,
    updateCashPositions,
    resetToInitialData
  };
};