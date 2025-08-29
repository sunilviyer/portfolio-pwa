// src/services/alphaVantageAPI.js
import { ALPHA_VANTAGE_API_KEY, ALPHA_VANTAGE_BASE_URL } from '../utils/constants';

export const getStockQuote = async (symbol) => {
  const response = await fetch(`${ALPHA_VANTAGE_BASE_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`);
  const data = await response.json();
  const quote = data["Global Quote"];
  
  return {
    symbol: quote["01. symbol"],
    price: parseFloat(quote["05. price"]),
    change: parseFloat(quote["09. change"]),
    changePercent: quote["10. change percent"].replace('%', ''),
    lastUpdated: new Date().toISOString()
  };
};

export const updatePortfolioAndCash = async (currentPortfolio, currentCash, onProgress) => {
  const results = [];
  const totalOperations = currentPortfolio.length;
  
  for (let i = 0; i < currentPortfolio.length; i++) {
    const stock = currentPortfolio[i];
    
    if (onProgress) {
      onProgress({
        current: i + 1,
        total: totalOperations,
        symbol: stock.symbol,
        status: 'fetching'
      });
    }
    
    try {
      const quote = await getStockQuote(stock.symbol);
      results.push(quote);
      
      if (i < currentPortfolio.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 12000));
      }
    } catch (error) {
      console.error(`Failed to fetch ${stock.symbol}:`, error);
    }
  }
  
  const updatedPortfolio = currentPortfolio.map(stock => {
    const updatedQuote = results.find(quote => quote.symbol === stock.symbol);
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
    }
    return stock;
  });
  
  return {
    portfolio: updatedPortfolio,
    cash: currentCash,
    updateStats: {
      successful: results.length,
      failed: currentPortfolio.length - results.length,
      totalProcessed: currentPortfolio.length,
      timestamp: new Date().toISOString()
    }
  };
};

export const updatePortfolioFromAPI = updatePortfolioAndCash;

export const getUpdateTimeEstimate = (stockCount) => {
  const minutes = Math.ceil(stockCount * 12 / 60);
  return {
    minutes,
    formatted: `~${minutes} minute${minutes !== 1 ? 's' : ''}`
  };
};