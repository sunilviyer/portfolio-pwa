// File: src/utils/currencyFormatter.js
export const formatCurrency = (amount, currency = 'USD', options = {}) => {
  const {
    minimumFractionDigits = 2,
    maximumFractionDigits = 2,
    useSymbol = true
  } = options;

  const safeAmount = typeof amount === 'number' && !isNaN(amount) ? amount : 0;
  
  const formatted = safeAmount.toLocaleString('en-US', {
    minimumFractionDigits,
    maximumFractionDigits
  });

  if (useSymbol) {
    const symbol = currency === 'CAD' ? 'C$' : '$';
    return `${symbol}${formatted}`;
  }
  
  return `${currency} ${formatted}`;
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