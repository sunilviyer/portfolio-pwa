// File: src/components/common/ErrorBanner.js
// src/components/common/ErrorBanner.js
import React from 'react';
import { AlertCircle, X } from 'lucide-react';

export const ErrorBanner = ({ errorBanner, onClose }) => {
  if (!errorBanner) return null;

  const copyTechnicalDetails = () => {
    const details = `ERROR REPORT - ${errorBanner.timestamp}
Message: ${errorBanner.message}
Workflow: ${errorBanner.details?.workflow || 'Unknown'}
Tab: ${errorBanner.details?.tab || 'Unknown'}
Currency: ${errorBanner.details?.currency || 'Unknown'}
Portfolio Size: ${errorBanner.details?.portfolioCount || 'Unknown'}
Stack: ${errorBanner.details?.stack || 'No stack trace'}`;

    navigator.clipboard.writeText(details).then(() => {
      alert('Error details copied to clipboard');
    }).catch(() => {
      console.log('Clipboard not available');
    });
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-red-600 text-white p-3 z-50">
      <div className="max-w-md mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <AlertCircle size={18} className="mr-2" />
          <span className="text-sm">{errorBanner.message}</span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={copyTechnicalDetails}
            className="bg-red-700 px-2 py-1 rounded text-xs"
          >
            Copy Technical Details
          </button>
          <button
            onClick={onClose}
            className="text-red-200 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};