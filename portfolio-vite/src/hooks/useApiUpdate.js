// File: src/hooks/useApiUpdate.js
// hooks/useApiUpdate.js
import { useState } from 'react';
import { updatePortfolioAndCash } from '../services/alphaVantageAPI';
import { useLocalStorage } from './useLocalStorage';

export const useApiUpdate = (portfolioData, cashPositions, updatePortfolioData, updateCashPositions) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateProgress, setUpdateProgress] = useState(null);
  const [lastApiUpdate, setLastApiUpdate] = useLocalStorage('lastApiUpdate', null);

  const performUpdate = async (onError) => {
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
      
      return {
        success: true,
        stats: result.updateStats,
        message: `${result.updateStats.successful} stocks updated successfully.`
      };
      
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
      
      return {
        success: false,
        error: error.message
      };
      
    } finally {
      setIsUpdating(false);
      setUpdateProgress(null);
    }
  };

  return {
    isUpdating,
    updateProgress,
    lastApiUpdate,
    performUpdate
  };
};