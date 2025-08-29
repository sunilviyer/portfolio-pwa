// File: src/utils/calculations.js
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

export const calculateSectorBreakdown = (portfolioData, convertToDisplayCurrency) => {
  const sectorMap = {};

  portfolioData.forEach(stock => {
    const currentUSD = convertToDisplayCurrency(stock.currentValue, stock.currency);
    if (sectorMap[stock.sector]) {
      sectorMap[stock.sector] += currentUSD;
    } else {
      sectorMap[stock.sector] = currentUSD;
    }
  });

  const totalValue = Object.values(sectorMap).reduce((sum, val) => sum + val, 0);

  const sectorData = Object.entries(sectorMap).map(([sector, value]) => ({
    sector,
    value,
    percentage: totalValue > 0 ? (value / totalValue) * 100 : 0
  }));

  return { sectorData };
};


/* Duplicate calculateAccountTypeBreakdown removed to resolve redeclaration error. */
export const calculateCurrencyBreakdown = (portfolioData, cashPositions, convertToUSD) => {
  const currencyMap = {};
  
  // Include stocks
  portfolioData.forEach(stock => {
    const currentUSD = convertToUSD(stock.currentValue, stock.currency);
    if (currencyMap[stock.currency]) {
      currencyMap[stock.currency] += currentUSD;
    } else {
      currencyMap[stock.currency] = currentUSD;
    }
  });

  // Include cash positions
  cashPositions.forEach(cash => {
    const cashUSD = convertToUSD(cash.amount, cash.currency);
    if (currencyMap[cash.currency]) {
      currencyMap[cash.currency] += cashUSD;
    } else {
      currencyMap[cash.currency] = cashUSD;
    }
  });
  
  const totalValue = Object.values(currencyMap).reduce((sum, val) => sum + val, 0);
  const currencyData = Object.entries(currencyMap).map(([currency, value]) => ({
    currency,
    value,
    percentage: totalValue > 0 ? (value / totalValue) * 100 : 0
  }));
  
  return { currencyData };
};

export const formatCurrency = (amount, currency) => {
    if (typeof amount !== 'number' || isNaN(amount)) amount = 0;
    const symbol = currency === 'CAD' ? 'C$' : '$';
    return `${symbol}${amount.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
};

export const formatPercentage = (value, decimals = 1) => {
  const safeValue = typeof value === 'number' && !isNaN(value) ? value : 0;
  return `${safeValue >= 0 ? '+' : ''}${safeValue.toFixed(decimals)}%`;
};

export const formatNumber = (value, decimals = 2) => {
  const safeValue = typeof value === 'number' && !isNaN(value) ? value : 0;
  return safeValue.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });
};

export const roundToTwoDecimals = (num) => {
  return Math.round((num + Number.EPSILON) * 100) / 100;
};

export const roundToNDecimals = (num, n) => {
  const factor = Math.pow(10, n);
  return Math.round((num + Number.EPSILON) * factor) / factor;
};

export const safeDivide = (numerator, denominator) => {
  if (typeof numerator !== 'number' || isNaN(numerator)) numerator = 0;
  if (typeof denominator !== 'number' || isNaN(denominator) || denominator === 0) return 0;
  return numerator / denominator;
};

export const calculateGainLoss = (currentValue, originalInvestment) => {
  if (typeof currentValue !== 'number' || isNaN(currentValue)) currentValue = 0;
  if (typeof originalInvestment !== 'number' || isNaN(originalInvestment)) originalInvestment = 0;
  return currentValue - originalInvestment;
};

export const calculateGainLossPercentage = (gainLoss, originalInvestment) => {
  if (typeof gainLoss !== 'number' || isNaN(gainLoss)) gainLoss = 0;
  if (typeof originalInvestment !== 'number' || isNaN(originalInvestment) || originalInvestment === 0) return 0;
  return (gainLoss / originalInvestment) * 100;
};

export const calculateDividendYield = (annualDividends, currentValue) => {
  if (typeof annualDividends !== 'number' || isNaN(annualDividends)) annualDividends = 0;
  if (typeof currentValue !== 'number' || isNaN(currentValue) || currentValue === 0) return 0;
  return (annualDividends / currentValue) * 100;
};

export const calculateAnnualizedReturn = (currentValue, originalInvestment, yearsHeld) => {
  if (typeof currentValue !== 'number' || isNaN(currentValue)) currentValue = 0;
  if (typeof originalInvestment !== 'number' || isNaN(originalInvestment) || originalInvestment === 0) return 0;
  if (typeof yearsHeld !== 'number' || isNaN(yearsHeld) || yearsHeld <= 0) return 0;
  
  const totalReturn = currentValue / originalInvestment;
  return (Math.pow(totalReturn, 1 / yearsHeld) - 1) * 100;
};

export const calculateCAGR = (endingValue, beginningValue, years) => {
  if (typeof endingValue !== 'number' || isNaN(endingValue)) endingValue = 0;
  if (typeof beginningValue !== 'number' || isNaN(beginningValue) || beginningValue === 0) return 0;
  if (typeof years !== 'number' || isNaN(years) || years <= 0) return 0;

  return (Math.pow(endingValue / beginningValue, 1 / years) - 1) * 100;
};

export const calculateVolatility = (returns) => {
  if (!Array.isArray(returns) || returns.length === 0) return 0;

  const mean = returns.reduce((acc, val) => acc + val, 0) / returns.length;
  const squaredDiffs = returns.map(r => Math.pow(r - mean, 2));
  const variance = squaredDiffs.reduce((acc, val) => acc + val, 0) / returns.length;
  
  return Math.sqrt(variance);
};

export const calculateSharpeRatio = (portfolioReturn, riskFreeRate, volatility) => {
  if (typeof portfolioReturn !== 'number' || isNaN(portfolioReturn)) portfolioReturn = 0;
  if (typeof riskFreeRate !== 'number' || isNaN(riskFreeRate)) riskFreeRate = 0;
  if (typeof volatility !== 'number' || isNaN(volatility) || volatility === 0) return 0;

  return (portfolioReturn - riskFreeRate) / volatility;
};

export const calculateSortinoRatio = (portfolioReturn, riskFreeRate, downsideDeviation) => {
  if (typeof portfolioReturn !== 'number' || isNaN(portfolioReturn)) portfolioReturn = 0;
  if (typeof riskFreeRate !== 'number' || isNaN(riskFreeRate)) riskFreeRate = 0;
  if (typeof downsideDeviation !== 'number' || isNaN(downsideDeviation) || downsideDeviation === 0) return 0;

  return (portfolioReturn - riskFreeRate) / downsideDeviation;
};

export const calculateMaxDrawdown = (portfolioValues) => {
  if (!Array.isArray(portfolioValues) || portfolioValues.length === 0) return 0;

  let maxDrawdown = 0;
  let peak = portfolioValues[0];

  for (let value of portfolioValues) {
    if (value > peak) {
      peak = value;
    }
    const drawdown = (peak - value) / peak;
    if (drawdown > maxDrawdown) {
      maxDrawdown = drawdown;
    }
  }

  return maxDrawdown * 100; // Return as percentage
};

export const calculateBeta = (portfolioReturns, marketReturns) => {
  if (!Array.isArray(portfolioReturns) || !Array.isArray(marketReturns) || portfolioReturns.length === 0 || marketReturns.length === 0 || portfolioReturns.length !== marketReturns.length) {
    return 0;
  }

  const n = portfolioReturns.length;
  const portfolioMean = portfolioReturns.reduce((acc, val) => acc + val, 0) / n;
  const marketMean = marketReturns.reduce((acc, val) => acc + val, 0) / n;

  let covariance = 0;
  let marketVariance = 0;

  for (let i = 0; i < n; i++) {
    covariance += (portfolioReturns[i] - portfolioMean) * (marketReturns[i] - marketMean);
    marketVariance += Math.pow(marketReturns[i] - marketMean, 2);
  }

  covariance /= n;
  marketVariance /= n;

  if (marketVariance === 0) return 0;

  return covariance / marketVariance;
};

export const calculateAlpha = (portfolioReturn, riskFreeRate, beta, marketReturn) => {
  if (typeof portfolioReturn !== 'number' || isNaN(portfolioReturn)) portfolioReturn = 0;
  if (typeof riskFreeRate !== 'number' || isNaN(riskFreeRate)) riskFreeRate = 0;
  if (typeof beta !== 'number' || isNaN(beta)) beta = 0;
  if (typeof marketReturn !== 'number' || isNaN(marketReturn)) marketReturn = 0;

  return portfolioReturn - (riskFreeRate + beta * (marketReturn - riskFreeRate));
};

export const calculateTreynorRatio = (portfolioReturn, riskFreeRate, beta) => {
  if (typeof portfolioReturn !== 'number' || isNaN(portfolioReturn)) portfolioReturn = 0;
  if (typeof riskFreeRate !== 'number' || isNaN(riskFreeRate)) riskFreeRate = 0;
  if (typeof beta !== 'number' || isNaN(beta) || beta === 0) return 0;

  return (portfolioReturn - riskFreeRate) / beta;
};

export const calculateUpsideCaptureRatio = (portfolioReturns, marketReturns) => {
  if (!Array.isArray(portfolioReturns) || !Array.isArray(marketReturns) || portfolioReturns.length === 0 || marketReturns.length === 0 || portfolioReturns.length !== marketReturns.length) {
    return 0;
  }
  
  let portfolioUpside = 0;
  let marketUpside = 0;
    let count = 0;
    for (let i = 0; i < portfolioReturns.length; i++) {
        if (marketReturns[i] > 0) {
            portfolioUpside += portfolioReturns[i];
            marketUpside += marketReturns[i];
            count++;
        }
    }
    if (marketUpside === 0) return 0;
    return (portfolioUpside / marketUpside) * 100; // Return as percentage
};

export const calculateDownsideCaptureRatio = (portfolioReturns, marketReturns) => {
  if (!Array.isArray(portfolioReturns) || !Array.isArray(marketReturns) || portfolioReturns.length === 0 || marketReturns.length === 0 || portfolioReturns.length !== marketReturns.length) {
    return 0;
  }
  
  let portfolioDownside = 0;
  let marketDownside = 0;
    let count = 0;
    for (let i = 0; i < portfolioReturns.length; i++) {
        if (marketReturns[i] < 0) {
            portfolioDownside += portfolioReturns[i];
            marketDownside += marketReturns[i];
            count++;
        }
    }
    if (marketDownside === 0) return 0;
    return (portfolioDownside / marketDownside) * 100; // Return as percentage
};

export const calculateInformationRatio = (portfolioReturns, benchmarkReturns) => {
  if (!Array.isArray(portfolioReturns) || !Array.isArray(benchmarkReturns) || portfolioReturns.length === 0 || benchmarkReturns.length === 0 || portfolioReturns.length !== benchmarkReturns.length) {
    return 0;
  }

  const n = portfolioReturns.length;
  const portfolioMean = portfolioReturns.reduce((acc, val) => acc + val, 0) / n;
  const benchmarkMean = benchmarkReturns.reduce((acc, val) => acc + val, 0) / n;

  const activeReturns = portfolioReturns.map((r, i) => r - benchmarkReturns[i]);
  const activeMean = activeReturns.reduce((acc, val) => acc + val, 0) / n;
  const activeStdDev = Math.sqrt(activeReturns.reduce((acc, val) => acc + Math.pow(val - activeMean, 2), 0) / n);

  if (activeStdDev === 0) return 0;

  return activeMean / activeStdDev;
};

export const calculateTrackingError = (portfolioReturns, benchmarkReturns) => {
  if (!Array.isArray(portfolioReturns) || !Array.isArray(benchmarkReturns) || portfolioReturns.length === 0 || benchmarkReturns.length === 0 || portfolioReturns.length !== benchmarkReturns.length) {
    return 0;
  }

  const n = portfolioReturns.length;
  const activeReturns = portfolioReturns.map((r, i) => r - benchmarkReturns[i]);
  const activeMean = activeReturns.reduce((acc, val) => acc + val, 0) / n;
  const trackingError = Math.sqrt(activeReturns.reduce((acc, val) => acc + Math.pow(val - activeMean, 2), 0) / n);

  return trackingError;
};

export const calculateBattingAverage = (portfolioReturns, benchmarkReturns) => {
  if (!Array.isArray(portfolioReturns) || !Array.isArray(benchmarkReturns) || portfolioReturns.length === 0 || benchmarkReturns.length === 0 || portfolioReturns.length !== benchmarkReturns.length) {
    return 0;
  }

  let wins = 0;
  let total = portfolioReturns.length;

  for (let i = 0; i < total; i++) {
    if (portfolioReturns[i] > benchmarkReturns[i]) {
      wins++;
    }
  }

  return (wins / total) * 100; // Return as percentage
};

export const calculateCalmarRatio = (annualizedReturn, maxDrawdown) => {
  if (typeof annualizedReturn !== 'number' || isNaN(annualizedReturn)) annualizedReturn = 0;
  if (typeof maxDrawdown !== 'number' || isNaN(maxDrawdown) || maxDrawdown === 0) return 0;

  return annualizedReturn / Math.abs(maxDrawdown);
};
export const calculateSterlingRatio = (annualizedReturn, averageDrawdown) => {
  if (typeof annualizedReturn !== 'number' || isNaN(annualizedReturn)) annualizedReturn = 0;
  if (typeof averageDrawdown !== 'number' || isNaN(averageDrawdown) || averageDrawdown === 0) return 0;

  return annualizedReturn / Math.abs(averageDrawdown);
};

export const calculateUlcerIndex = (portfolioValues) => {
  if (!Array.isArray(portfolioValues) || portfolioValues.length === 0) return 0;

  let peak = portfolioValues[0];
  const drawdowns = [];

  for (let value of portfolioValues) {
    if (value > peak) {
      peak = value;
    }
    const drawdown = (peak - value) / peak;
    drawdowns.push(drawdown * 100); // Store as percentage
  }

  const squaredDrawdowns = drawdowns.map(dd => Math.pow(dd, 2));
  const meanSquaredDrawdown = squaredDrawdowns.reduce((acc, val) => acc + val, 0) / squaredDrawdowns.length;
  return Math.sqrt(meanSquaredDrawdown);
};

export const calculatePainIndex = (portfolioValues) => {
  if (!Array.isArray(portfolioValues) || portfolioValues.length === 0) return 0;

  let peak = portfolioValues[0];
  let totalDrawdown = 0;
  let drawdownDays = 0;

  for (let value of portfolioValues) {
    if (value > peak) {
      peak = value;
    }
    const drawdown = (peak - value) / peak;
    if (drawdown > 0) {
      totalDrawdown += drawdown * 100; // Store as percentage
      drawdownDays++;
    }
  }

  return drawdownDays > 0 ? totalDrawdown / drawdownDays : 0;
};

export const calculateDownsideDeviation = (returns, targetReturn = 0) => {
  if (!Array.isArray(returns) || returns.length === 0) return 0;

  const downsideReturns = returns.filter(r => r < targetReturn);
  if (downsideReturns.length === 0) return 0;

  const meanDownside = downsideReturns.reduce((acc, val) => acc + val, 0) / downsideReturns.length;
  const squaredDiffs = downsideReturns.map(r => Math.pow(r - meanDownside, 2));
  const variance = squaredDiffs.reduce((acc, val) => acc + val, 0) / downsideReturns.length;

  return Math.sqrt(variance);
};

export const calculateKurtosis = (returns) => {
  if (!Array.isArray(returns) || returns.length === 0) return 0;

  const n = returns.length;
  const mean = returns.reduce((acc, val) => acc + val, 0) / n;
  const stdDev = Math.sqrt(returns.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / n);

  if (stdDev === 0) return 0;

  const fourthMoment = returns.reduce((acc, val) => acc + Math.pow(val - mean, 4), 0) / n;
  return fourthMoment / Math.pow(stdDev, 4);
};

export const calculateSkewness = (returns) => {
  if (!Array.isArray(returns) || returns.length === 0) return 0;

  const n = returns.length;
  const mean = returns.reduce((acc, val) => acc + val, 0) / n;
  const stdDev = Math.sqrt(returns.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / n);

  if (stdDev === 0) return 0;

  const thirdMoment = returns.reduce((acc, val) => acc + Math.pow(val - mean, 3), 0) / n;
  return thirdMoment / Math.pow(stdDev, 3);
};

export const calculateZScore = (value, mean, stdDev) => {
  if (typeof value !== 'number' || isNaN(value)) value = 0;
  if (typeof mean !== 'number' || isNaN(mean)) mean = 0;
  if (typeof stdDev !== 'number' || isNaN(stdDev) || stdDev === 0) return 0;

  return (value - mean) / stdDev;
};

export const calculateExpectedReturn = (riskFreeRate, beta, marketReturn) => {
  if (typeof riskFreeRate !== 'number' || isNaN(riskFreeRate)) riskFreeRate = 0;
  if (typeof beta !== 'number' || isNaN(beta)) beta = 0;
  if (typeof marketReturn !== 'number' || isNaN(marketReturn)) marketReturn = 0;

  return riskFreeRate + beta * (marketReturn - riskFreeRate);
};

export const calculateValueAtRisk = (portfolioValues, confidenceLevel = 0.95) => {
  if (!Array.isArray(portfolioValues) || portfolioValues.length === 0) return 0;
  if (typeof confidenceLevel !== 'number' || isNaN(confidenceLevel) || confidenceLevel <= 0 || confidenceLevel >= 1) confidenceLevel = 0.95;

  const sortedValues = [...portfolioValues].sort((a, b) => a - b);
  const index = Math.floor((1 - confidenceLevel) * sortedValues.length);
  return sortedValues[index];
};

export const calculateConditionalValueAtRisk = (portfolioValues, confidenceLevel = 0.95) => {
  if (!Array.isArray(portfolioValues) || portfolioValues.length === 0) return 0;
  if (typeof confidenceLevel !== 'number' || isNaN(confidenceLevel) || confidenceLevel <= 0 || confidenceLevel >= 1) confidenceLevel = 0.95;

  const sortedValues = [...portfolioValues].sort((a, b) => a - b);
  const index = Math.floor((1 - confidenceLevel) * sortedValues.length);
  const tailValues = sortedValues.slice(0, index + 1);
  const cvar = tailValues.reduce((acc, val) => acc + val, 0) / tailValues.length;
  return cvar;
};
export const calculateMonteCarloSimulation = (initialInvestment, annualReturn, annualVolatility, years, simulations) => {
  if (typeof initialInvestment !== 'number' || isNaN(initialInvestment) || initialInvestment <= 0) return [];
  if (typeof annualReturn !== 'number' || isNaN(annualReturn)) annualReturn = 0;
  if (typeof annualVolatility !== 'number' || isNaN(annualVolatility) || annualVolatility < 0) annualVolatility = 0;
  if (typeof years !== 'number' || isNaN(years) || years <= 0) return [];
  if (typeof simulations !== 'number' || isNaN(simulations) || simulations <= 0) simulations = 1000;

  const results = [];

  for (let i = 0; i < simulations; i++) {
    let value = initialInvestment;
    for (let j = 0; j < years; j++) {
      const randomShock = (Math.random() * 2 - 1) * annualVolatility;
      value *= (1 + annualReturn + randomShock);
    }
    results.push(value);
  }

  return results;
};

export const calculateMonteCarloPercentiles = (simulationResults, percentiles = [5, 25, 50, 75, 95]) => {
  if (!Array.isArray(simulationResults) || simulationResults.length === 0) return {};
  if (!Array.isArray(percentiles) || percentiles.length === 0) percentiles = [5, 25, 50, 75, 95];

  const sortedResults = [...simulationResults].sort((a, b) => a - b);
  const results = {};

  percentiles.forEach(p => {
    if (typeof p === 'number' && !isNaN(p) && p >= 0 && p <= 100) {
      const index = Math.floor((p / 100) * sortedResults.length);
      results[p] = sortedResults[index];
    }
  });

  return results;
};

export const calculateMonteCarloMean = (simulationResults) => {
  if (!Array.isArray(simulationResults) || simulationResults.length === 0) return 0;

  const mean = simulationResults.reduce((acc, val) => acc + val, 0) / simulationResults.length;
  return mean;
};

export const calculateMonteCarloStdDev = (simulationResults) => {
  if (!Array.isArray(simulationResults) || simulationResults.length === 0) return 0;

  const mean = calculateMonteCarloMean(simulationResults);
  const variance = simulationResults.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / simulationResults.length;
  return Math.sqrt(variance);
};

export const calculateMonteCarloProbabilityAboveThreshold = (simulationResults, threshold) => {
  if (!Array.isArray(simulationResults) || simulationResults.length === 0) return 0;
  if (typeof threshold !== 'number' || isNaN(threshold)) return 0;

  const countAbove = simulationResults.filter(val => val > threshold).length;
  return (countAbove / simulationResults.length) * 100; // Return as percentage
};

export const calculateMonteCarloProbabilityBelowThreshold = (simulationResults, threshold) => {
  if (!Array.isArray(simulationResults) || simulationResults.length === 0) return 0;
  if (typeof threshold !== 'number' || isNaN(threshold)) return 0;

  const countBelow = simulationResults.filter(val => val < threshold).length;
  return (countBelow / simulationResults.length) * 100; // Return as percentage
};

export const calculateMonteCarloBestCase = (simulationResults) => {
  if (!Array.isArray(simulationResults) || simulationResults.length === 0) return 0;
  return Math.max(...simulationResults);
};

export const calculateMonteCarloWorstCase = (simulationResults) => {
  if (!Array.isArray(simulationResults) || simulationResults.length === 0) return 0;
  return Math.min(...simulationResults);
};

export const calculateMonteCarloRange = (simulationResults) => {
  if (!Array.isArray(simulationResults) || simulationResults.length === 0) return 0;
  return Math.max(...simulationResults) - Math.min(...simulationResults);
};

export const calculateMonteCarloMedian = (simulationResults) => {
  if (!Array.isArray(simulationResults) || simulationResults.length === 0) return 0;

  const sortedResults = [...simulationResults].sort((a, b) => a - b);
  const mid = Math.floor(sortedResults.length / 2);

  return sortedResults.length % 2 !== 0
    ? sortedResults[mid]
    : (sortedResults[mid - 1] + sortedResults[mid]) / 2;
};

export const calculateMonteCarloMode = (simulationResults) => {
  if (!Array.isArray(simulationResults) || simulationResults.length === 0) return 0;

  const frequencyMap = {};
  simulationResults.forEach(val => {
    frequencyMap[val] = (frequencyMap[val] || 0) + 1;
  });

  let mode = simulationResults[0];
  let maxCount = 0;

  for (let val in frequencyMap) {
    if (frequencyMap[val] > maxCount) {
      maxCount = frequencyMap[val];
      mode = Number(val);
    }
  }

  return mode;
};

export const calculateMonteCarloVariance = (simulationResults) => {
  if (!Array.isArray(simulationResults) || simulationResults.length === 0) return 0;

  const mean = calculateMonteCarloMean(simulationResults);
  const variance = simulationResults.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / simulationResults.length;
  return variance;
};

export const calculateMonteCarloCoefficientOfVariation = (simulationResults) => {
  if (!Array.isArray(simulationResults) || simulationResults.length === 0) return 0;

  const mean = calculateMonteCarloMean(simulationResults);
  const stdDev = calculateMonteCarloStdDev(simulationResults);

  if (mean === 0) return 0;

  return stdDev / mean;
};

export const calculateMonteCarloSkewness = (simulationResults) => {
  if (!Array.isArray(simulationResults) || simulationResults.length === 0) return 0;

  const n = simulationResults.length;
  const mean = calculateMonteCarloMean(simulationResults);
  const stdDev = calculateMonteCarloStdDev(simulationResults);

  if (stdDev === 0) return 0;

  const thirdMoment = simulationResults.reduce((acc, val) => acc + Math.pow(val - mean, 3), 0) / n;
  return thirdMoment / Math.pow(stdDev, 3);
};

export const calculateMonteCarloKurtosis = (simulationResults) => {
  if (!Array.isArray(simulationResults) || simulationResults.length === 0) return 0;

  const n = simulationResults.length;
  const mean = calculateMonteCarloMean(simulationResults);
  const stdDev = calculateMonteCarloStdDev(simulationResults);

  if (stdDev === 0) return 0;

  const fourthMoment = simulationResults.reduce((acc, val) => acc + Math.pow(val - mean, 4), 0) / n;
  return fourthMoment / Math.pow(stdDev, 4);
};

export const calculateMonteCarloZScore = (value, simulationResults) => {
  if (typeof value !== 'number' || isNaN(value)) return 0;
  if (!Array.isArray(simulationResults) || simulationResults.length === 0) return 0;

  const mean = calculateMonteCarloMean(simulationResults);
  const stdDev = calculateMonteCarloStdDev(simulationResults);

  if (stdDev === 0) return 0;

  return (value - mean) / stdDev;
};

export const calculateMonteCarloPercentileRank = (value, simulationResults) => {
  if (typeof value !== 'number' || isNaN(value)) return 0;
  if (!Array.isArray(simulationResults) || simulationResults.length === 0) return 0;

  const countBelow = simulationResults.filter(val => val < value).length;
  return (countBelow / simulationResults.length) * 100; // Return as percentage
};

export const calculateMonteCarloZScorePercentile = (zScore) => {
  if (typeof zScore !== 'number' || isNaN(zScore)) return 0;
  
  // Using the cumulative distribution function (CDF) for a standard normal distribution
  const percentile = 0.5 * (1 + erf(zScore / Math.sqrt(2)));
  return percentile * 100; // Return as percentage
};

// Error function approximation
const erf = (x) => {
  const sign = (x >= 0) ? 1 : -1;
  x = Math.abs(x);

  const a1 =  0.254829592;
  const a2 = -0.284496736;
  const a3 =  1.421413741;
  const a4 = -1.453152027;
  const a5 =  1.061405429;
  const p  =  0.3275911;

  const t = 1 / (1 + p * x);
  const y = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

  return sign * y;
};

export const convertToUSD = (amount, currency, exchangeRates) => {
  if (typeof amount !== 'number' || isNaN(amount)) return 0;
  if (currency === 'USD') return amount;
  if (exchangeRates && exchangeRates[currency]) {
    return amount * exchangeRates[currency];
  }
  // If no exchange rate is provided, assume 1:1 for simplicity
  return amount;
};

export const convertFromUSD = (amount, currency, exchangeRates) => {
  if (typeof amount !== 'number' || isNaN(amount)) return 0;
  if (currency === 'USD') return amount;
  if (exchangeRates && exchangeRates[currency]) {
    return amount / exchangeRates[currency];
  }
  // If no exchange rate is provided, assume 1:1 for simplicity
  return amount;
};

export const getExchangeRate = (fromCurrency, toCurrency, exchangeRates) => {
  if (fromCurrency === toCurrency) return 1;
  if (exchangeRates && exchangeRates[fromCurrency] && exchangeRates[toCurrency]) {
    return exchangeRates[toCurrency] / exchangeRates[fromCurrency];
  }
  // If no exchange rate is provided, assume 1:1 for simplicity
  return 1;
};

export const formatDate = (date) => {
  if (!(date instanceof Date)) return '';
  return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
};

export const parseDate = (dateString) => {
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? null : date;
};

export const calculatePortfolioSummary = (portfolioData, cashPositions, convertToUSD) => {
  let totalOriginalUSD = 0;
  let totalCurrentUSD = 0;
  let totalDividendsUSD = 0;

  portfolioData.forEach(stock => {
    const originalUSD = convertToUSD(stock.originalInvestment, stock.currency);
    // Convert current value and dividends to USD
    const currentUSD = convertToUSD(stock.currentValue, stock.currency);
    const dividendUSD = convertToUSD(stock.annualDividends, stock.currency);

    totalOriginalUSD += originalUSD;
    totalCurrentUSD += currentUSD;
    totalDividendsUSD += dividendUSD;
  });

  cashPositions.forEach(cash => {
    const cashUSD = convertToUSD(cash.amount, cash.currency);
    totalCurrentUSD += cashUSD;
  });

  const totalReturn = totalCurrentUSD + totalDividendsUSD - totalOriginalUSD;
  const returnPercentage = totalOriginalUSD > 0 ? (totalReturn / totalOriginalUSD) * 100 : 0;

  return {
    totalOriginalUSD,
    totalCurrentUSD,
    totalDividendsUSD,
    totalReturn,
    returnPercentage
  };
};

export const identifyTopAndBottomPerformers = (portfolioData, count = 5) => {
  const stocksWithPerformance = portfolioData.map(stock => ({
    ...stock,
    returnPercentage: stock.originalInvestment > 0
      ? ((stock.currentValue + stock.annualDividends - stock.originalInvestment) / stock.originalInvestment) * 100
      : 0
  }));

  const topPerformers = [...stocksWithPerformance]
    .sort((a, b) => b.returnPercentage - a.returnPercentage)
    .slice(0, count);

  const bottomPerformers = [...stocksWithPerformance]
    .sort((a, b) => a.returnPercentage - b.returnPercentage)
    .slice(0, count);

  return { topPerformers, bottomPerformers };
};