export const calculatePortfolioMetrics = (portfolioData, cashPositions, convertToUSD) => {
  let totalOriginalUSD = 0;
  let totalCurrentUSD = 0;
  let totalDividendsUSD = 0;

  // Calculate stock values
  portfolioData.forEach(stock => {
    const originalUSD = convertToUSD(stock.originalInvestment, stock.currency);
    const currentUSD = convertToUSD(stock.currentValue, stock.currency);
    const dividendUSD = convertToUSD(stock.dividendReceived, stock.currency);
    
    totalOriginalUSD += originalUSD;
    totalCurrentUSD += currentUSD;
    totalDividendsUSD += dividendUSD;
  });

  // Add cash positions to current value only
  cashPositions.forEach(cash => {
    const cashUSD = convertToUSD(cash.amount, cash.currency);
    totalCurrentUSD += cashUSD;
  });

  const totalReturn = totalCurrentUSD - totalOriginalUSD;
  const returnPercentage = totalOriginalUSD > 0 ? (totalReturn / totalOriginalUSD) * 100 : 0;

  return {
    totalOriginalUSD,
    totalCurrentUSD,
    totalDividendsUSD,
    totalReturn,
    returnPercentage
  };
};

export const getTopBottomPerformers = (portfolioData, count = 3) => {
  const stocksWithPerformance = portfolioData.map(stock => ({
    ...stock,
    returnPercentage: stock.originalInvestment > 0 
      ? (stock.gainLoss / stock.originalInvestment) * 100 
      : 0
  }));

  const topPerformers = stocksWithPerformance
    .sort((a, b) => b.returnPercentage - a.returnPercentage)
    .slice(0, count);

  const bottomPerformers = stocksWithPerformance
    .sort((a, b) => a.returnPercentage - b.returnPercentage)
    .slice(0, count);

  return {
    topPerformers,
    bottomPerformers
  };
};