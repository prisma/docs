import { useState, useEffect } from 'react';

export const useUTMParams = (): string => {
  const [utmParams, setUTMParams] = useState('');

  useEffect(() => {
    // Check if we're on the client side
    if (typeof window !== 'undefined') {
      const updateUTMParams = () => {
        const storedParams = sessionStorage.getItem('utm_params');
        setUTMParams(storedParams || '');
      };

      // Initial load
      updateUTMParams();

      // Listen for storage changes (in case UTM params are set after initial load)
      const handleStorageChange = (e: StorageEvent) => {
        if (e.key === 'utm_params') {
          updateUTMParams();
        }
      };

      window.addEventListener('storage', handleStorageChange);
      
      // Also check periodically in case the storage was updated in the same tab
      const interval = setInterval(updateUTMParams, 100);
      
      // Clean up after a short time to avoid infinite checking
      setTimeout(() => {
        clearInterval(interval);
      }, 2000);

      return () => {
        window.removeEventListener('storage', handleStorageChange);
        clearInterval(interval);
      };
    }
  }, []);

  return utmParams;
};