// File: src/components/common/DataMigration.js
// src/components/common/DataMigration.js
import React, { useState } from 'react';
import { clearExistingPortfolioData, backupExistingData } from '../utils/dataMigration';

export const DataMigrationTool = () => {
  const [migrationStep, setMigrationStep] = useState('ready');
  const [backupCreated, setBackupCreated] = useState(false);

  const handleMigration = async () => {
    try {
      setMigrationStep('backing-up');
      
      // Step 1: Create backup
      const backup = backupExistingData();
      setBackupCreated(true);
      
      // Step 2: Clear existing data
      setMigrationStep('clearing');
      clearExistingPortfolioData();
      
      // Step 3: Complete
      setMigrationStep('complete');
      
      // Reload the page to initialize with new data model
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      
    } catch (error) {
      console.error('Migration failed:', error);
      setMigrationStep('error');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-md mx-4">
        <h2 className="text-xl font-bold mb-4">Data Model Migration</h2>
        
        {migrationStep === 'ready' && (
          <>
            <p className="text-sm text-gray-600 mb-4">
              This will migrate your portfolio to the new data model that properly tracks 
              sold positions and realized gains/losses.
            </p>
            <div className="bg-yellow-50 p-3 rounded mb-4">
              <p className="text-sm text-yellow-800">
                ⚠️ This will clear your existing data. A backup will be created first.
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleMigration}
                className="flex-1 bg-blue-600 text-white py-2 rounded font-medium"
              >
                Start Migration
              </button>
              <button
                onClick={() => setMigrationStep('cancelled')}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded font-medium"
              >
                Cancel
              </button>
            </div>
          </>
        )}

        {migrationStep === 'backing-up' && (
          <div className="text-center">
            <p className="mb-4">Creating data backup...</p>
            <div className="animate-spin w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
          </div>
        )}

        {migrationStep === 'clearing' && (
          <div className="text-center">
            <p className="mb-4">Clearing existing data...</p>
            <div className="animate-spin w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
          </div>
        )}

        {migrationStep === 'complete' && (
          <div className="text-center">
            <p className="text-green-600 mb-4">✅ Migration complete!</p>
            <p className="text-sm text-gray-600">Reloading application...</p>
          </div>
        )}

        {migrationStep === 'error' && (
          <div className="text-center">
            <p className="text-red-600 mb-4">❌ Migration failed</p>
            <p className="text-sm text-gray-600">Check console for details</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 bg-blue-600 text-white py-2 px-4 rounded"
            >
              Reload Page
            </button>
          </div>
        )}
      </div>
    </div>
  );
};