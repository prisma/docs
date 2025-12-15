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
    // Skip initial render
    if (previousSearch.current === '') {
      previousSearch.current = location.search;
      if (hasUTMParams(location.search)) {
        const utms = getUTMParams(location.search);
        sessionStorage.setItem('utm_params', utms);
      }
      return;
    }

    const hadUTMs = hasUTMParams(previousSearch.current);
    const hasUTMs = hasUTMParams(location.search);

    // Detect manual removal
    if (hadUTMs && !hasUTMs && location.pathname === previousSearch.current.split('?')[0]) {
      isManualRemoval.current = true;
      sessionStorage.removeItem('utm_params');
    }
    // Save new UTMs if they exist
    else if (hasUTMs) {
      isManualRemoval.current = false;
      sessionStorage.setItem('utm_params', getUTMParams(location.search));
    }
    // Restore UTMs if they're missing and weren't manually removed
    else if (!isManualRemoval.current) {
      const storedParams = sessionStorage.getItem('utm_params');
      if (storedParams) {
        const newSearch = storedParams ? `?${storedParams}` : '';
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
};
