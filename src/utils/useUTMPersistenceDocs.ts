import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

const useUTMPersistenceDocs = () => {
  const location = useLocation();
  const history = useHistory();
  const [isManualRemoval, setIsManualRemoval] = useState(false);

  const hasUTMParams = (params) => {
    return params.has("utm_source") || params.has("utm_medium") || params.has("utm_campaign");
  };

  // Clears session storage after 30 minutes of inactivity
  const clearSessionStorageAfterInactivity = () => {
    const inactivityTimeout = 30 * 60 * 1000; // 30 minutes
    let inactivityTimer;

    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        sessionStorage.removeItem("utm_params");
      }, inactivityTimeout);
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keypress", resetTimer);

    resetTimer();
  };

  useEffect(() => {
    const currentParams = new URLSearchParams(location.search);
    const isDirectEntry = !document.referrer;

    if (isDirectEntry) {
      sessionStorage.removeItem("utm_params");
      setIsManualRemoval(false);
    }

    if (!hasUTMParams(currentParams) && !isDirectEntry) {
      setIsManualRemoval(true);
    }

    if (hasUTMParams(currentParams)) {
      const utmParams = currentParams.toString();
      sessionStorage.setItem("utm_params", utmParams);
      localStorage.setItem("utm_params", utmParams);
      setIsManualRemoval(false);
    }

    const storedParams = sessionStorage.getItem("utm_params");
    if (storedParams && !isManualRemoval) {
      const newURL = `${location.pathname}?${storedParams}`;
      if (window.location.href !== newURL) {
        history.replace(newURL);
      }
    }

    clearSessionStorageAfterInactivity();

  }, [location, history, isManualRemoval]);

  const getStoredUTMParams = () => localStorage.getItem("utm_params");

  return { getStoredUTMParams };
};

export default useUTMPersistenceDocs;