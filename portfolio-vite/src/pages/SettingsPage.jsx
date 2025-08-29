// File: src/pages/SettingsPage.js
import React, { useState } from 'react';
import { BarChart3, AlertCircle, Trash2, Download, Upload } from 'lucide-react';

const SettingsPage = ({ 
  displayCurrency, 
  onCurrencyChange, 
  portfolioData, 
  cashPositions,
  onResetData
}) => {
  const [settings, setSettings] = useState({
    currency: displayCurrency,
    refreshFrequency: '3x-daily',
    enableNotifications: true,
    enableFaceId: true,
    autoLock: 'immediate',
    decimalPlaces: 2
  });

  const [confirmReset, setConfirmReset] = useState(false);

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    
    // Apply currency change immediately
    if (key === 'currency' && onCurrencyChange) {
      onCurrencyChange(value);
    }
  };

  const handleResetData = () => {
    if (confirmReset && onResetData) {
      onResetData();
      setConfirmReset(false);
      alert('Portfolio data has been reset to initial values');
    }
  };

  const exportSettings = () => {
    const data = {
      settings,
      portfolioData,
      cashPositions,
      exportDate: new Date().toISOString(),
      version: '1.0'
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio_settings_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Settings</h2>
      
      <div className="space-y-4">
        {/* Portfolio Settings */}
        <div className="bg-white border rounded-lg p-4 shadow-sm">
          <h3 className="font-bold mb-4 flex items-center">
            <BarChart3 className="mr-2" size={20} />
            Portfolio Settings
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Default Currency</label>
              <select
                value={settings.currency}
                onChange={(e) => handleSettingChange('currency', e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="USD">USD ($)</option>
                <option value="CAD">CAD ($)</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">
                All values will be displayed in this currency
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Price Update Frequency</label>
              <select
                value={settings.refreshFrequency}
                onChange={(e) => handleSettingChange('refreshFrequency', e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="3x-daily">3x Daily (8:30 AM, 12:30 PM, 6:00 PM)</option>
                <option value="hourly">Every Hour</option>
                <option value="manual">Manual Only</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Decimal Places</label>
              <select
                value={settings.decimalPlaces}
                onChange={(e) => handleSettingChange('decimalPlaces', parseInt(e.target.value))}
                className="w-full p-2 border rounded-md"
              >
                <option value={0}>0 (Whole numbers)</option>
                <option value={2}>2 (Standard)</option>
                <option value={4}>4 (Precise)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Security & Privacy Settings */}
        <div className="bg-white border rounded-lg p-4 shadow-sm">
          <h3 className="font-bold mb-4 flex items-center">
            <AlertCircle className="mr-2" size={20} />
            Security & Privacy
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium">Push Notifications</label>
                <p className="text-sm text-gray-600">Get alerts for significant changes</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.enableNotifications}
                  onChange={(e) => handleSettingChange('enableNotifications', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="font-medium">Face ID / Touch ID</label>
                <p className="text-sm text-gray-600">Use biometric authentication</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.enableFaceId}
                  onChange={(e) => handleSettingChange('enableFaceId', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Auto-Lock</label>
              <select
                value={settings.autoLock}
                onChange={(e) => handleSettingChange('autoLock', e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="immediate">Immediate</option>
                <option value="1min">1 Minute</option>
                <option value="5min">5 Minutes</option>
                <option value="never">Never</option>
              </select>
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="bg-white border rounded-lg p-4 shadow-sm">
          <h3 className="font-bold mb-4">Data Management</h3>
          
          <div className="space-y-3">
            <button
              onClick={exportSettings}
              className="w-full flex items-center justify-center p-3 border rounded-md hover:bg-gray-50 transition-colors"
            >
              <Download className="mr-2" size={16} />
              Export All Data
            </button>
            
            <button
              className="w-full flex items-center justify-center p-3 border rounded-md hover:bg-gray-50 transition-colors text-gray-500"
              disabled
            >
              <Upload className="mr-2" size={16} />
              Import Data (Coming Soon)
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="font-bold mb-4 flex items-center text-red-800">
            <Trash2 className="mr-2" size={20} />
            Danger Zone
          </h3>
          
          <div className="space-y-3">
            <p className="text-sm text-red-700">
              This will permanently delete all your portfolio data and reset to initial demo data.
            </p>
            
            <div className="flex items-center space-x-2">
              <label className="flex items-center text-sm">
                <input
                  type="checkbox"
                  checked={confirmReset}
                  onChange={(e) => setConfirmReset(e.target.checked)}
                  className="mr-2"
                />
                I understand this action cannot be undone
              </label>
            </div>
            
            <button
              onClick={handleResetData}
              disabled={!confirmReset}
              className={`w-full py-2 rounded-md font-medium transition-colors ${
                confirmReset
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Reset All Data
            </button>
          </div>
        </div>

        {/* App Info */}
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <h3 className="font-bold mb-2">Portfolio PWA</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p>Version 1.0 - Phase 1: Core Foundation</p>
            <p>{portfolioData.length} stocks • {cashPositions.length} cash positions</p>
            <p>Built with React & Alpha Vantage API</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;