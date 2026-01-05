import { useHistory, useLocation } from '@docusaurus/router';
import { useEffect, useRef } from 'react';

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign'] as const;
const STORAGE_KEY = 'utm_params';

const extractUTMParams = (search: string): string => {
  const params = new URLSearchParams(search);
  const utmParams = new URLSearchParams();
  UTM_KEYS.forEach(key => {
    const value = params.get(key);
    if (value) utmParams.set(key, value);
  });
  return utmParams.toString();
};

export const useUTMPersistenceDocs = () => {
  const location = useLocation();
  const history = useHistory();
  const prevPathname = useRef(location.pathname);

  useEffect(() => {
    const currentUTMs = extractUTMParams(location.search);
    const storedUTMs = sessionStorage.getItem(STORAGE_KEY);
    const isNavigation = prevPathname.current !== location.pathname;

    if (currentUTMs) {
      sessionStorage.setItem(STORAGE_KEY, currentUTMs);
    } else if (storedUTMs && isNavigation) {
      history.replace({
        pathname: location.pathname,
        search: `?${storedUTMs}`,
        hash: location.hash,
      });
    } else if (!currentUTMs && storedUTMs && !isNavigation) {
      sessionStorage.removeItem(STORAGE_KEY);
    }

    prevPathname.current = location.pathname;
  }, [location.pathname, location.search, location.hash]);
};
