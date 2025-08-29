// File: src/pages/DashboardPage.js
import React from 'react';

const DashboardPage = ({ 
  portfolioData, 
  metrics, 
  formatCurrency, 
  convertToDisplayCurrency, 
  displayCurrency 
}) => {
  // Get top and bottom performers
  const getTopPerformers = (data, count = 3) => {
    return data
      .map(stock => ({
        ...stock,
        returnPercentage: stock.originalInvestment > 0 
          ? (stock.gainLoss / stock.originalInvestment) * 100 
          : 0
      }))
      .sort((a, b) => b.returnPercentage - a.returnPercentage)
      .slice(0, count);
  };

  const getBottomPerformers = (data, count = 3) => {
    return data
      .map(stock => ({
        ...stock,
        returnPercentage: stock.originalInvestment > 0 
          ? (stock.gainLoss / stock.originalInvestment) * 100 
          : 0
      }))
      .sort((a, b) => a.returnPercentage - b.returnPercentage)
      .slice(0, count);
  };

  const topPerformers = getTopPerformers(portfolioData, 3);
  const bottomPerformers = getBottomPerformers(portfolioData, 3);

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold text-center mb-6">Portfolio Dashboard</h2>
      
      {/* Hero Card - Daily Performance */}
      <div className="bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-200 rounded-xl p-6 shadow-lg">
        <div className="text-center">
          <h3 className="text-lg font-bold mb-2 text-green-800">Today's Performance</h3>
          <p className="text-4xl font-black mb-2 text-green-900">
            +{formatCurrency(1247.32, 'USD')}
          </p>
          <p className="text-xl font-bold text-green-700">
            (+2.34%)
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Portfolio Value: {formatCurrency(metrics.totalCurrentUSD, 'USD')}
          </p>
        </div>
      </div>

      {/* Top 3 Gainers */}
      <div className="bg-white border rounded-lg p-4 shadow-md">
        <h3 className="font-bold text-lg mb-3 text-green-800">Today's Top 3 Gainers</h3>
        {topPerformers.map((stock, index) => {
          const gainLossDisplay = convertToDisplayCurrency(stock.gainLoss, stock.currency);
          
          return (
            <div key={stock.symbol} className="flex justify-between items-center py-2 border-b last:border-b-0">
              <div className="flex items-center">
                <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold mr-3 ${
                  index === 0 ? 'bg-yellow-400 text-yellow-900' :
                  index === 1 ? 'bg-gray-300 text-gray-700' :
                  'bg-orange-300 text-orange-800'
                }`}>
                  {index + 1}
                </span>
                <div>
                  <span className="font-medium">{stock.symbol}</span>
                  <p className="text-xs text-gray-500">{stock.sector}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="font-bold text-green-600">
                  +{formatCurrency(Math.abs(gainLossDisplay), displayCurrency)}
                </span>
                <div className="text-sm text-green-500">
                  (+{stock.returnPercentage.toFixed(1)}%)
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Total Portfolio Value */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4 shadow-md">
        <h3 className="font-bold text-lg text-blue-800 mb-2">Total Portfolio Value</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-blue-600">Current Value</p>
            <p className="text-2xl font-bold text-blue-900">
              {formatCurrency(metrics.totalCurrentUSD, 'USD')}
            </p>
          </div>
          <div>
            <p className="text-sm text-blue-600">Total Return</p>
            <p className={`text-xl font-bold ${metrics.totalReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {metrics.totalReturn >= 0 ? '+' : ''}{formatCurrency(Math.abs(metrics.totalReturn), 'USD')}
            </p>
            <p className={`text-sm ${metrics.totalReturn >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              ({metrics.returnPercentage.toFixed(1)}%)
            </p>
          </div>
        </div>
      </div>

      {/* Bottom 3 Performers */}
      <div className="bg-white border rounded-lg p-4 shadow-md">
        <h3 className="font-bold text-lg mb-3 text-red-800">Bottom 3 Performers</h3>
        {bottomPerformers.map((stock, index) => {
          const gainLossDisplay = convertToDisplayCurrency(stock.gainLoss, stock.currency);
          
          return (
            <div key={stock.symbol} className="flex justify-between items-center py-2 border-b last:border-b-0">
              <div className="flex items-center">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold mr-3 bg-red-200 text-red-800">
                  {index + 1}
                </span>
                <div>
                  <span className="font-medium">{stock.symbol}</span>
                  <p className="text-xs text-gray-500">{stock.sector}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`font-bold ${gainLossDisplay >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {gainLossDisplay >= 0 ? '+' : ''}{formatCurrency(Math.abs(gainLossDisplay), displayCurrency)}
                </span>
                <div className={`text-sm ${gainLossDisplay >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  ({stock.returnPercentage >= 0 ? '+' : ''}{stock.returnPercentage.toFixed(1)}%)
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardPage;