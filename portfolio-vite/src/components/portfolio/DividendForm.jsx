// File: src/components/portfolio/DividendForm.js
import React, { useState } from 'react';

const DividendForm = ({ 
  portfolioData, 
  onAddDividend, 
  onCancel,
  isVisible = false 
}) => {
  const [formData, setFormData] = useState({
    symbol: '',
    dividendAmount: '',
    sharesReceived: '',
    paymentDate: new Date().toISOString().split('T')[0]
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.symbol) newErrors.symbol = 'Stock symbol is required';
    if (!formData.dividendAmount || parseFloat(formData.dividendAmount) <= 0) {
      newErrors.dividendAmount = 'Valid dividend amount is required';
    }
    if (formData.sharesReceived && parseFloat(formData.sharesReceived) < 0) {
      newErrors.sharesReceived = 'Shares received cannot be negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const dividendData = {
      symbol: formData.symbol,
      dividendAmount: parseFloat(formData.dividendAmount),
      sharesReceived: parseFloat(formData.sharesReceived) || 0,
      paymentDate: formData.paymentDate
    };

    onAddDividend(dividendData);
    
    // Reset form
    setFormData({
      symbol: '',
      dividendAmount: '',
      sharesReceived: '',
      paymentDate: new Date().toISOString().split('T')[0]
    });
    setErrors({});
  };

  if (!isVisible) return null;

  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm">
      <h3 className="font-bold mb-4">Add Dividend Payment</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Stock Symbol *</label>
          <select
            value={formData.symbol}
            onChange={(e) => setFormData(prev => ({ ...prev, symbol: e.target.value }))}
            className={`w-full p-2 border rounded-md ${errors.symbol ? 'border-red-500' : ''}`}
          >
            <option value="">Select Stock</option>
            {portfolioData.map(stock => (
              <option key={stock.symbol} value={stock.symbol}>
                {stock.symbol} - {stock.sector}
              </option>
            ))}
          </select>
          {errors.symbol && <p className="text-red-500 text-xs mt-1">{errors.symbol}</p>}
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Dividend Amount *</label>
            <input
              type="number"
              step="0.01"
              min="0"
              value={formData.dividendAmount}
              onChange={(e) => setFormData(prev => ({ ...prev, dividendAmount: e.target.value }))}
              className={`w-full p-2 border rounded-md ${errors.dividendAmount ? 'border-red-500' : ''}`}
              placeholder="0.00"
            />
            {errors.dividendAmount && <p className="text-red-500 text-xs mt-1">{errors.dividendAmount}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Shares Received</label>
            <input
              type="number"
              step="0.001"
              min="0"
              value={formData.sharesReceived}
              onChange={(e) => setFormData(prev => ({ ...prev, sharesReceived: e.target.value }))}
              className={`w-full p-2 border rounded-md ${errors.sharesReceived ? 'border-red-500' : ''}`}
              placeholder="0.000"
            />
            {errors.sharesReceived && <p className="text-red-500 text-xs mt-1">{errors.sharesReceived}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Payment Date</label>
          <input
            type="date"
            value={formData.paymentDate}
            onChange={(e) => setFormData(prev => ({ ...prev, paymentDate: e.target.value }))}
            className="w-full p-2 border rounded-md"
          />
        </div>
        
        <div className="flex space-x-3">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700 transition-colors"
          >
            Add Dividend
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md font-medium hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default DividendForm;
