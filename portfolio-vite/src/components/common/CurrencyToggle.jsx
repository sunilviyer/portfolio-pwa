// File: src/components/common/CurrencyToggle.js

// Change from named export to default export
import React from 'react';

const CurrencyToggle = ({ displayCurrency, onCurrencyChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <div className={`transition-opacity duration-200 ${
        displayCurrency === 'CAD' ? 'opacity-100' : 'opacity-50'
      }`}>
        <span className="text-xl">🇨🇦</span>
      </div>
      
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={displayCurrency === 'USD'}
          onChange={(e) => onCurrencyChange(e.target.checked ? 'USD' : 'CAD')}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-blue-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-400"></div>
      </label>
      
      <div className={`transition-opacity duration-200 ${
        displayCurrency === 'USD' ? 'opacity-100' : 'opacity-50'
      }`}>
        <span className="text-xl">🇺🇸</span>
      </div>
    </div>
  );
};

export default CurrencyToggle;