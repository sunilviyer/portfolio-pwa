// File: src/utils/validation.js
export const validateStock = (stock) => {
  const errors = [];
  const warnings = [];

  // Required fields
  if (!stock.symbol) errors.push('Symbol is required');
  if (!stock.sector) warnings.push('Sector classification missing');
  
  // Numeric validations
  if (typeof stock.currentShares !== 'number' || stock.currentShares < 0) {
    errors.push(`Invalid currentShares: ${stock.currentShares}`);
  }
  if (typeof stock.currentPrice !== 'number' || stock.currentPrice < 0) {
    errors.push(`Invalid currentPrice: ${stock.currentPrice}`);
  }
  if (typeof stock.originalInvestment !== 'number' || stock.originalInvestment <= 0) {
    errors.push(`Invalid originalInvestment: ${stock.originalInvestment}`);
  }

  // Calculated field validation
  const expectedCurrentValue = stock.currentShares * stock.currentPrice;
  if (Math.abs(stock.currentValue - expectedCurrentValue) > 0.01) {
    warnings.push(`Current value mismatch: expected ${expectedCurrentValue}, got ${stock.currentValue}`);
  }

  return { isValid: errors.length === 0, errors, warnings };
};

export const validateCashPosition = (cash) => {
  const errors = [];
  
  if (!['USD', 'CAD'].includes(cash.currency)) {
    errors.push(`Unsupported currency: ${cash.currency}`);
  }
  if (typeof cash.amount !== 'number' || cash.amount < 0) {
    errors.push(`Invalid cash amount: ${cash.amount}`);
  }
  if (typeof cash.exchangeRate !== 'number' || cash.exchangeRate <= 0) {
    errors.push(`Invalid exchange rate: ${cash.exchangeRate}`);
  }

  return { isValid: errors.length === 0, errors };
};

export const sanitizeNumericInput = (value, min = 0, max = Number.MAX_SAFE_INTEGER) => {
  const num = parseFloat(value);
  if (isNaN(num)) return min;
  return Math.min(Math.max(num, min), max);
};
