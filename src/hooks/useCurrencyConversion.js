import { useState, useCallback } from 'react';

export const useCurrencyConversion = (cashPositions = []) => {
  const [displayCurrency, setDisplayCurrency] = useState('USD');

  const cadToUsdRate = 0.74;
  const usdToCadRate = 1.35;

  const convertToDisplayCurrency = useCallback((amount, fromCurrency) => {
    if (!amount || isNaN(amount)) return 0;
    if (displayCurrency === fromCurrency) return amount;
    
    if (displayCurrency === 'USD' && fromCurrency === 'CAD') {
      return amount * cadToUsdRate;
    } else if (displayCurrency === 'CAD' && fromCurrency === 'USD') {
      return amount * usdToCadRate;
    }
    return amount;
  }, [displayCurrency, cadToUsdRate, usdToCadRate]);

  const convertToUSD = useCallback((amount, fromCurrency) => {
    if (!amount || isNaN(amount)) return 0;
    if (fromCurrency === 'USD') return amount;
    if (fromCurrency === 'CAD') return amount * cadToUsdRate;
    return amount;
  }, [cadToUsdRate]);

  const formatCurrency = useCallback((amount, fromCurrency = 'USD') => {
    const safeAmount = typeof amount === 'number' && !isNaN(amount) ? amount : 0;
    const convertedAmount = convertToDisplayCurrency(safeAmount, fromCurrency);
    return `${displayCurrency} $${convertedAmount.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
  }, [convertToDisplayCurrency, displayCurrency]);

  const setDisplayCurrencyTo = useCallback((currency) => {
    if (currency === 'USD' || currency === 'CAD') {
      setDisplayCurrency(currency);
    }
  }, []);

  return {
    displayCurrency,
    convertToDisplayCurrency,
    convertToUSD,
    formatCurrency,
    setDisplayCurrencyTo,
    cadToUsdRate,
    usdToCadRate
  };
};