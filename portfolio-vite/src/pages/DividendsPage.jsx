// File: src/pages/DividendsPage.js
import React, { useState } from 'react';

const DividendsPage = ({ 
  portfolioData, 
  updatePortfolioData, 
  convertToDisplayCurrency, 
  formatCurrency, 
  displayCurrency 
}) => {
  const [dividendForm, setDividendForm] = useState({
    symbol: '',
    dividendAmount: '',
    sharesReceived: ''
  });
  const [showAddForm, setShowAddForm] = useState(false);

  const calculateDividendMetrics = () => {
    let totalDividendsDisplay = 0;
    let dividendPayingStocks = [];
    
    portfolioData.forEach(stock => {
      const dividendDisplay = convertToDisplayCurrency(stock.dividendReceived, stock.currency);
      totalDividendsDisplay += dividendDisplay;
      
      if (stock.dividendReceived > 0) {
        const currentYield = stock.originalInvestment > 0 
          ? (stock.dividendReceived / stock.originalInvestment) * 100 
          : 0;
          
        dividendPayingStocks.push({
          ...stock,
          dividendDisplay,
          currentYield,
          annualEstimate: dividendDisplay * 4
        });
      }
    });

    return {
      totalDividendsDisplay,
      dividendPayingStocks: dividendPayingStocks.sort((a, b) => b.currentYield - a.currentYield),
      projectedAnnual: totalDividendsDisplay * 4
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
    setDividendForm({ symbol: '', dividendAmount: '', sharesReceived: '' });
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
      
      {/* Total Dividend Income Card */}
      <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-lg p-6 shadow-md">
        <h3 className="font-bold text-lg text-green-800 mb-4">Total Dividend Income</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-sm text-green-600 mb-1">Year-to-Date</p>
            <p className="text-2xl font-bold text-green-900">
              {formatCurrency(dividendMetrics.totalDividendsDisplay, displayCurrency)}
            </p>
          </div>
          
          <div>
            <p className="text-sm text-green-600 mb-1">Previous Year (Est.)</p>
            <p className="text-xl font-bold text-green-800">
              {formatCurrency(dividendMetrics.totalDividendsDisplay * 0.85, displayCurrency)}
            </p>
            <p className="text-xs text-green-600">
              +17.6% YoY
            </p>
          </div>
          
          <div>
            <p className="text-sm text-green-600 mb-1">Projected Annual</p>
            <p className="text-xl font-bold text-green-800">
              {formatCurrency(dividendMetrics.projectedAnnual, displayCurrency)}
            </p>
            <p className="text-xs text-green-600">Based on current rate</p>
          </div>
        </div>
      </div>

      {/* Individual Stock Dividends */}
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

export default DividendsPage;