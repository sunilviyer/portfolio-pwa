// File: src/components/portfolio/StockCard.js
import React from 'react';

const StockCard = ({ 
  stock, 
  convertToDisplayCurrency, 
  formatCurrency, 
  displayCurrency,
  onClick,
  showDetails = true
}) => {
  const currentValueDisplay = convertToDisplayCurrency(stock.currentValue, stock.currency);
  const gainLossDisplay = convertToDisplayCurrency(stock.gainLoss, stock.currency);
  const returnPct = (stock.gainLoss / stock.originalInvestment) * 100;

  return (
    <div 
      className={`bg-white border rounded-lg p-4 shadow-sm ${onClick ? 'cursor-pointer hover:shadow-md' : ''}`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <h3 className="font-bold text-lg">{stock.symbol}</h3>
          {showDetails && (
            <>
              <p className="text-sm text-gray-600">
                {stock.sector} • {stock.accountType}
              </p>
              <p className="text-xs text-blue-600 font-medium">
                {stock.brokerage}
              </p>
              <p className="text-sm mt-1">
                {stock.currentShares.toFixed(2)} shares @ {stock.currency} ${stock.currentPrice.toFixed(2)}
              </p>
            </>
          )}
        </div>
        
        <div className="text-right">
          <p className="font-bold">{formatCurrency(currentValueDisplay, displayCurrency)}</p>
          <p className={`text-sm font-medium ${gainLossDisplay >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {gainLossDisplay >= 0 ? '+' : ''}{formatCurrency(Math.abs(gainLossDisplay), displayCurrency)}
          </p>
          <p className={`text-xs ${gainLossDisplay >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            ({returnPct.toFixed(1)}%)
          </p>
        </div>
      </div>
      
      {stock.dividendReceived > 0 && showDetails && (
        <div className="mt-2 pt-2 border-t border-gray-100">
          <p className="text-xs text-green-600">
            Dividends: {formatCurrency(convertToDisplayCurrency(stock.dividendReceived, stock.currency), displayCurrency)}
          </p>
        </div>
      )}
    </div>
  );
};

export default StockCard;