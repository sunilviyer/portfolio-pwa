// File: src/services/CurrencyService.js
export class CurrencyService {
  constructor(initialRates = { CAD_TO_USD: 0.74 }) {
    this.rates = initialRates;
    this.lastUpdated = new Date().toISOString();
  }

  setExchangeRate(fromCurrency, toCurrency, rate) {
    const key = `${fromCurrency}_TO_${toCurrency}`;
    this.rates[key] = rate;
    this.lastUpdated = new Date().toISOString();
  }

  getExchangeRate(fromCurrency, toCurrency) {
    if (fromCurrency === toCurrency) return 1;
    
    const directKey = `${fromCurrency}_TO_${toCurrency}`;
    if (this.rates[directKey]) return this.rates[directKey];
    
    const reverseKey = `${toCurrency}_TO_${fromCurrency}`;
    if (this.rates[reverseKey]) return 1 / this.rates[reverseKey];
    
    // Default fallback
    if (fromCurrency === 'CAD' && toCurrency === 'USD') return 0.74;
    if (fromCurrency === 'USD' && toCurrency === 'CAD') return 1.35;
    
    return 1;
  }

  convert(amount, fromCurrency, toCurrency) {
    if (!amount || isNaN(amount)) return 0;
    const rate = this.getExchangeRate(fromCurrency, toCurrency);
    return amount * rate;
  }

  getAllRates() {
    return { ...this.rates, lastUpdated: this.lastUpdated };
  }

  updateFromCashPositions(cashPositions) {
    cashPositions.forEach(cash => {
      if (cash.currency === 'CAD' && cash.exchangeRate) {
        this.setExchangeRate('CAD', 'USD', cash.exchangeRate);
      }
    });
  }
}

export const currencyService = new CurrencyService();
