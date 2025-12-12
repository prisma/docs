import { useEffect, useState } from 'react';

export const useUTMParams = (): string => {
  const [utmParams, setUTMParams] = useState('');

  useEffect(() => {
    // Check if we're on the client side
    if (typeof window !== 'undefined') {
      const storedParams = sessionStorage.getItem('utm_params');
      setUTMParams(storedParams || '');
    }
  }, []);

  return utmParams;
};
