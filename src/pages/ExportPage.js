import React from 'react';
import { Download } from 'lucide-react';

const ExportPage = ({ portfolioData, cashPositions, metrics, formatCurrency }) => {
  const exportPortfolioData = () => {
    const csvHeaders = ['Symbol', 'Shares', 'CurrentPrice', 'CurrentValue', 'GainLoss', 'GainLossPercent', 'Sector', 'AccountType', 'Brokerage', 'Currency'];
    
    const csvData = portfolioData.map(stock => {
      const returnPct = ((stock.gainLoss / stock.originalInvestment) * 100).toFixed(2);
      return [
        stock.symbol,
        stock.currentShares.toFixed(2),
        stock.currentPrice.toFixed(2),
        stock.currentValue.toFixed(2),
        stock.gainLoss.toFixed(2),
        `${returnPct}%`,
        stock.sector,
        stock.accountType,
        stock.brokerage,
        stock.currency
      ];
    });
    
    const csvContent = [csvHeaders, ...csvData].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio_export_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert('Portfolio CSV exported successfully!');
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Export Portfolio</h2>
      
      <div className="bg-white border rounded-lg p-4 shadow-sm space-y-4">
        <div className="text-center">
          <Download size={48} className="mx-auto text-blue-600 mb-4" />
          <h3 className="font-bold text-lg mb-2">Export Portfolio Data</h3>
          <p className="text-gray-600 text-sm mb-4">
            Export your complete portfolio data including holdings, performance, and account details.
          </p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Export Includes:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Stock symbols and current shares</li>
            <li>• Current prices and total values</li>
            <li>• Gain/loss amounts and percentages</li>
            <li>• Sector classifications</li>
            <li>• Account types and brokerages</li>
            <li>• Currency information</li>
          </ul>
        </div>
        
        <div className="bg-blue-50 p-3 rounded-md">
          <p className="text-sm font-medium text-blue-800">Portfolio Summary</p>
          <p className="text-sm text-blue-600">
            {portfolioData.length} holdings • {cashPositions.length} cash positions
          </p>
          <p className="text-sm text-blue-600">
            Total Value: {formatCurrency(metrics.totalCurrentUSD, 'USD')}
          </p>
        </div>
        
        <button
          onClick={exportPortfolioData}
          className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
        >
          <Download className="mr-2" size={20} />
          Export as CSV
        </button>
      </div>
    </div>
  );
};

export default ExportPage;