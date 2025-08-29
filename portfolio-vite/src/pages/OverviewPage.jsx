// File: src/pages/OverviewPage.js
import React, { useState } from 'react';

// Main OverviewPage component (default export, matches App.js import)
const OverviewPage = ({
  portfolioData,
  cashPositions,
  convertToDisplayCurrency,
  formatCurrency,
  displayCurrency
}) => {
  const [brokerageFilter, setBrokerageFilter] = useState('All');
  const [accountFilter, setAccountFilter] = useState('All');
  const [sortBy, setSortBy] = useState('symbol');

  const uniqueBrokerages = [...new Set(portfolioData.map(stock => stock.brokerage))];
  const uniqueAccountTypes = [...new Set(portfolioData.map(stock => stock.accountType))];

  const CAD_TO_USD_RATE = 0.74; // You'll need to pass this as prop or get from hook
  // Use only the props passed from App.js
  const filteredData = portfolioData.filter(stock => {
    const brokerageMatch = brokerageFilter === 'All' || stock.brokerage === brokerageFilter;
    const accountMatch = accountFilter === 'All' || stock.accountType === accountFilter;
    return brokerageMatch && accountMatch;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    switch (sortBy) {
      case 'symbol':
        return a.symbol.localeCompare(b.symbol);
      case 'value': {
        const aValueUSD = convertToDisplayCurrency(a.currentValue, a.currency);
        const bValueUSD = convertToDisplayCurrency(b.currentValue, b.currency);
        return bValueUSD - aValueUSD;
      }
      case 'performance': {
        const aReturn = (a.gainLoss / a.originalInvestment) * 100;
        const bReturn = (b.gainLoss / b.originalInvestment) * 100;
        return bReturn - aReturn;
      }
      default:
        return 0;
    }
  });

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Investment Overview</h2>
      
      {/* Filters */}
      <div className="bg-gray-100 rounded-lg p-4 mb-6">
        <div className="space-y-4">
          <div>
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
              {uniqueBrokerages.map(brokerage => (
                <button
                  key={brokerage}
                  onClick={() => setBrokerageFilter(brokerage)}
                  className={`px-3 py-1 rounded text-sm ${
                    brokerageFilter === brokerage 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-white text-gray-700 border'
                  }`}
                >
                  {brokerage}
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
        </div>
      </div>

      {/* Holdings */}
      <div className="space-y-3">
        {sortedData.map((stock) => {
          const currentValueDisplay = convertToDisplayCurrency(stock.currentValue, stock.currency);
          const gainLossDisplay = convertToDisplayCurrency(stock.gainLoss, stock.currency);
          const returnPct = (stock.gainLoss / stock.originalInvestment) * 100;

          return (
            <div key={stock.symbol} className="bg-white border rounded-lg p-4 shadow-sm">
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
            </div>
          );
        })}
        
        {cashPositions && cashPositions.length > 0 && (
          <div className="bg-gray-100 border rounded-lg p-4">
            <h3 className="font-bold text-lg mb-3">Cash Positions</h3>
            {cashPositions.map((cash) => {
              const displayValue = convertToDisplayCurrency(cash.amount, cash.currency);
              return (
                <div key={cash.currency} className="flex justify-between items-center py-2">
                  <div>
                    <span className="font-medium">{cash.currency} Cash</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold">{formatCurrency(displayValue, displayCurrency)}</span>
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

export default OverviewPage;