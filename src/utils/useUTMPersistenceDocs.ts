import { useHistory, useLocation } from '@docusaurus/router';
import { useEffect, useRef } from 'react';

const hasUTMParams = (search: string) => {
  const params = new URLSearchParams(search);
  return ['utm_source', 'utm_medium', 'utm_campaign'].some(p => params.has(p));
};

export const useUTMPersistenceDocs = () => {
  const location = useLocation();
  const history = useHistory();
  const isManualRemoval = useRef(false);
  const previousSearch = useRef('');

  const getUTMParams = (search: string) => {
    const params = new URLSearchParams(search);
    const utmParams = new URLSearchParams();
    ['utm_source', 'utm_medium', 'utm_campaign'].forEach(param => {
      const value = params.get(param);
      if (value) utmParams.set(param, value);
    });
    return utmParams.toString();
  };

  useEffect(() => {
    if (previousSearch.current === '') {
      previousSearch.current = location.search;
      if (hasUTMParams(location.search)) {
        sessionStorage.setItem('utm_params', getUTMParams(location.search));
      }
      return;
    }

    const hadUTMs = hasUTMParams(previousSearch.current);
    const hasUTMs = hasUTMParams(location.search);

    if (hadUTMs && !hasUTMs) {
      isManualRemoval.current = true;
      sessionStorage.removeItem('utm_params');
    }
    else if (hasUTMs) {
      isManualRemoval.current = false;
      sessionStorage.setItem('utm_params', getUTMParams(location.search));
    }
    else if (!isManualRemoval.current) {
      const storedParams = sessionStorage.getItem('utm_params');
      if (storedParams) {
        const newSearch = `?${storedParams}`;
        if (location.search !== newSearch) {
          history.replace({
            pathname: location.pathname,
            search: newSearch,
          });
        }
      }
    }

    previousSearch.current = location.search;
  }, [location, history]);

  useEffect(() => {
    const handlePopState = () => {
      setTimeout(() => {
        const currentHasUTMs = hasUTMParams(window.location.search);
        const storedParams = sessionStorage.getItem('utm_params');
        
        if (!currentHasUTMs && storedParams) {
          sessionStorage.removeItem('utm_params');
          isManualRemoval.current = true;
        }
      }, 50);
    };

    const handleHashChange = () => {
      const currentHasUTMs = hasUTMParams(window.location.search);
      const storedParams = sessionStorage.getItem('utm_params');
      
      if (!currentHasUTMs && storedParams) {
        sessionStorage.removeItem('utm_params');
        isManualRemoval.current = true;
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handleHashChange);
    
    const intervalId = setInterval(() => {
      const currentHasUTMs = hasUTMParams(window.location.search);
      const storedParams = sessionStorage.getItem('utm_params');
      
      if (!currentHasUTMs && storedParams && !isManualRemoval.current) {
        sessionStorage.removeItem('utm_params');
        isManualRemoval.current = true;
      }
    }, 1000);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handleHashChange);
      clearInterval(intervalId);
    };
  }, []);
};
