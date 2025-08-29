// src/utils/constants.js

// API Configuration - ADD THESE
export const ALPHA_VANTAGE_API_KEY = "4IBG3NW8PIR2ITBF";
export const ALPHA_VANTAGE_BASE_URL = "https://www.alphavantage.co/query";

export const SECTORS = [
  'Technology',
  'Healthcare', 
  'Energy',
  'Financials',
  'Consumer Discretionary',
  'Consumer Staples',
  'Real Estate',
  'Utilities',
  'Bonds',
  'International',
  'Diversified'
];

export const ACCOUNT_TYPES = [
  'RRSP',
  'TFSA', 
  'Non-Registered',
  'RESP',
  'Margin'
];

export const BROKERAGES = [
  'Wealthsimple',
  'Questrade',
  'Interactive Brokers',
  'TD Direct Investing',
  'RBC Direct Investing',
  'BMO InvestorLine',
  'Scotia iTRADE',
  'CIBC Investor\'s Edge'
];

export const CURRENCIES = ['USD', 'CAD'];

export const EXCHANGE_RATES = {
  DEFAULT_CAD_TO_USD: 0.74,
  DEFAULT_USD_TO_CAD: 1.35
};

export const API_CONFIG = {
  ALPHA_VANTAGE: {
    BASE_URL: 'https://www.alphavantage.co/query',
    RATE_LIMIT: {
      CALLS_PER_MINUTE: 5,
      CALLS_PER_DAY: 25,
      DELAY_BETWEEN_CALLS: 12000
    }
  }
};

export const APP_CONFIG = {
  NAME: 'Portfolio PWA',
  VERSION: '1.0',
  PHASE: 'Phase 1: Core Foundation',
  STORAGE_KEYS: {
    PORTFOLIO_DATA: 'portfolioData',
    CASH_POSITIONS: 'cashPositions',
    LAST_API_UPDATE: 'lastApiUpdate',
    USER_SETTINGS: 'userSettings'
  }
};

export const COLOR_SCHEMES = {
  SECTOR_COLORS: [
    '#2563eb', '#dc2626', '#16a34a', '#ca8a04', '#9333ea', 
    '#ea580c', '#0891b2', '#be185d', '#65a30d', '#7c3aed'
  ],
  PERFORMANCE_COLORS: {
    POSITIVE: '#16a34a',
    NEGATIVE: '#dc2626',
    NEUTRAL: '#6b7280'
  }
};