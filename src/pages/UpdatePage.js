import React, { useState } from 'react';
import { Zap, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react';
import { updatePortfolioAndCash, getUpdateTimeEstimate } from '../services/alphaVantageAPI';

const UpdatePage = ({ 
  portfolioData, 
  cashPositions, 
  updatePortfolioData, 
  updateCashPositions,
  onError 
}) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateProgress, setUpdateProgress] = useState(null);
  const [lastApiUpdate, setLastApiUpdate] = useState(() => {
    try {
      const saved = localStorage.getItem('lastApiUpdate');
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      return null;
    }
  });

  const timeEstimate = getUpdateTimeEstimate(portfolioData.length);

  const handleApiUpdate = async () => {
    try {
      setIsUpdating(true);
      setUpdateProgress({ current: 0, total: 0, symbol: 'Starting...', status: 'starting' });
      
      const result = await updatePortfolioAndCash(portfolioData, cashPositions, setUpdateProgress);
      updatePortfolioData(result.portfolio);
      updateCashPositions(result.cash);
      
      const updateInfo = {
        timestamp: new Date().toISOString(),
        stats: result.updateStats
      };
      
      setLastApiUpdate(updateInfo);
      localStorage.setItem('lastApiUpdate', JSON.stringify(updateInfo));
      
      alert(`Portfolio Updated!\n\n${result.updateStats.successful} stocks updated successfully.`);
      
    } catch (error) {
      console.error('API update failed:', error);
      if (onError) {
        onError({
          message: `Update failed: ${error.message}`,
          timestamp: new Date().toISOString(),
          details: {
            workflow: 'update',
            tab: 'api-update',
            portfolioCount: portfolioData.length,
            stack: error.stack
          }
        });
      }
    } finally {
      setIsUpdating(false);
      setUpdateProgress(null);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Portfolio Updates</h2>
      
      <div className="space-y-4">
        {/* API Update Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-bold mb-3 flex items-center text-blue-800">
            <Zap className="mr-2" size={20} />
            Enhanced API Updates
          </h3>
          
          <div className="mb-4 text-sm text-gray-700">
            <p><strong>Your Portfolio:</strong> {portfolioData.length} stocks tracked</p>
            <p><strong>Estimated time:</strong> {timeEstimate.formatted}</p>
            <p><strong>Rate limit:</strong> 25 calls/day (free tier)</p>
          </div>

          {lastApiUpdate && (
            <div className="bg-blue-100 p-3 rounded-md mb-4">
              <h4 className="font-medium text-blue-800 flex items-center">
                <CheckCircle className="mr-1" size={16} />
                Last Update:
              </h4>
              <p className="text-sm text-blue-700">
                {new Date(lastApiUpdate.timestamp).toLocaleString()}
              </p>
              <p className="text-sm text-blue-600">
                {lastApiUpdate.stats.successful} of {lastApiUpdate.stats.totalProcessed} stocks updated
              </p>
              {lastApiUpdate.stats.failed > 0 && (
                <p className="text-sm text-red-600">
                  {lastApiUpdate.stats.failed} failed updates
                </p>
              )}
            </div>
          )}

          {isUpdating && updateProgress && (
            <div className="bg-white p-3 rounded-md mb-4 border">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">Updating Portfolio...</span>
                <span className="text-sm text-gray-600">
                  {updateProgress.current}/{updateProgress.total}
                </span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${(updateProgress.current / Math.max(updateProgress.total, 1)) * 100}%` }}
                ></div>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                {updateProgress.status === 'fetching' && (
                  <>
                    <RefreshCw className="mr-1 animate-spin" size={14} />
                    Fetching {updateProgress.symbol}...
                  </>
                )}
              </div>
            </div>
          )}

          <button
            onClick={handleApiUpdate}
            disabled={isUpdating}
            className={`w-full py-3 rounded-md font-medium transition-colors ${
              isUpdating 
                ? 'bg-gray-400 text-gray-700 cursor-not-allowed' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isUpdating ? 'Updating Portfolio...' : 'Update All Stocks'}
          </button>
        </div>

        {/* Manual Entry Section */}
        <div className="bg-white border rounded-lg p-4 shadow-sm">
          <h3 className="font-bold mb-3 flex items-center">
            <AlertCircle className="mr-2" size={20} />
            Manual Updates
          </h3>
          
          <p className="text-sm text-gray-600 mb-4">
            For situations when API limits are reached or you need to update specific stocks manually.
          </p>
          
          <div className="space-y-2">
            <button 
              className="w-full p-2 text-left border rounded hover:bg-gray-50 text-sm"
              disabled
            >
              Edit Stock Price (Coming Soon)
            </button>
            <button 
              className="w-full p-2 text-left border rounded hover:bg-gray-50 text-sm"
              disabled
            >
              Add New Stock (Coming Soon)
            </button>
            <button 
              className="w-full p-2 text-left border rounded hover:bg-gray-50 text-sm"
              disabled
            >
              Update Exchange Rates (Coming Soon)
            </button>
          </div>
        </div>

        {/* Data Backup Section */}
        <div className="bg-gray-50 border rounded-lg p-4">
          <h3 className="font-bold mb-3">Data Management</h3>
          
          <div className="space-y-2">
            <button 
              onClick={() => {
                const data = {
                  portfolioData,
                  cashPositions,
                  timestamp: new Date().toISOString()
                };
                const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `portfolio_backup_${new Date().toISOString().split('T')[0]}.json`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
              }}
              className="w-full p-2 text-left border rounded hover:bg-gray-100 text-sm"
            >
              Download Data Backup
            </button>
            <button 
              className="w-full p-2 text-left border rounded hover:bg-gray-100 text-sm text-gray-500"
              disabled
            >
              Restore from Backup (Coming Soon)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePage;