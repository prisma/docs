import { useEffect, useState } from 'react';

export const useUTMParams = (): string => {
  const [utmParams, setUTMParams] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const updateUTMParams = () => {
        const storedParams = sessionStorage.getItem('utm_params');
        setUTMParams(storedParams || '');
      };

      // Initial load
      updateUTMParams();

      const handleStorageChange = (e: StorageEvent) => {
        if (e.key === 'utm_params') {
          updateUTMParams();
        }
      };

      window.addEventListener('storage', handleStorageChange);
      
      const interval = setInterval(updateUTMParams, 500);

      return () => {
        window.removeEventListener('storage', handleStorageChange);
        clearInterval(interval);
      };
    }
  }, []);

  return utmParams;
};