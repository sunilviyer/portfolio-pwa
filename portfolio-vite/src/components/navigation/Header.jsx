// File: src/components/navigation/Header.js
import React from 'react';
import { Menu } from 'lucide-react';
import CurrencyToggle from '../common/CurrencyToggle';

const Header = ({ 
  onMenuClick,
  title = 'Portfolio',
  subtitle,
  exchangeRate,
  displayCurrency,
  onCurrencyToggle,
  showErrorOffset = false
}) => {
  return (
    <div 
      className="bg-blue-600 text-white p-4"
      style={{ marginTop: showErrorOffset ? '60px' : '0' }}
    >
      <div className="flex items-center justify-between">
        <button
          onClick={onMenuClick}
          className="p-2 hover:bg-blue-700 rounded-lg transition-colors"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
        
        <div className="text-center flex-1">
          <h1 className="text-xl font-bold">{title}</h1>
          {subtitle && (
            <p className="text-sm opacity-90">{subtitle}</p>
          )}
          {exchangeRate && (
            <p className="text-xs opacity-75">
              1 CAD = ${exchangeRate.toFixed(4)} USD
            </p>
          )}
        </div>
        
        <CurrencyToggle
          displayCurrency={displayCurrency}
          onToggle={onCurrencyToggle}
        />
      </div>
    </div>
  );
};

export default Header;