// File: src/services/exportService.js
export const exportService = {
  exportPortfolioCSV(portfolioData, filename) {
    const headers = ['Symbol', 'Shares', 'CurrentPrice', 'CurrentValue', 'GainLoss', 'GainLossPercent', 'Sector', 'AccountType', 'Brokerage', 'Currency'];
    
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
    
    this.downloadCSV([headers, ...csvData], filename || `portfolio_export_${new Date().toISOString().split('T')[0]}.csv`);
  },

  exportDividendsCSV(portfolioData, filename) {
    const dividendStocks = portfolioData.filter(stock => stock.dividendReceived > 0);
    
    const headers = ['Symbol', 'Sector', 'DividendReceived', 'CurrentYield', 'Currency'];
    
    const csvData = dividendStocks.map(stock => {
      const currentYield = ((stock.dividendReceived / stock.originalInvestment) * 100).toFixed(2);
      return [
        stock.symbol,
        stock.sector,
        stock.dividendReceived.toFixed(2),
        `${currentYield}%`,
        stock.currency
      ];
    });
    
    this.downloadCSV([headers, ...csvData], filename || `dividends_export_${new Date().toISOString().split('T')[0]}.csv`);
  },

  exportFullDataJSON(portfolioData, cashPositions, filename) {
    const data = {
      portfolioData,
      cashPositions,
      exportDate: new Date().toISOString(),
      version: '1.0'
    };
    
    this.downloadJSON(data, filename || `portfolio_full_export_${new Date().toISOString().split('T')[0]}.json`);
  },

  downloadCSV(data, filename) {
    const csvContent = data.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    this.downloadFile(blob, filename);
  },

  downloadJSON(data, filename) {
    const jsonContent = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    this.downloadFile(blob, filename);
  },

  downloadFile(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
};

export default exportService;