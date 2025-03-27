import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

const useUTMPersistenceDocs = () => {
  const location = useLocation();
  const history = useHistory();
  const [utmParams, setUtmParams] = useState("");

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
        localStorage.removeItem("utm_params");
      }, inactivityTimeout);
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keypress", resetTimer);

    resetTimer();
  };

  useEffect(() => {
    const currentParams = new URLSearchParams(location.search);
    const isDirectEntry = !document.referrer;
    const isManualRemoval = !hasUTMParams(currentParams) && document.referrer?.includes(window.location.hostname);

    if (isDirectEntry || isManualRemoval) {
      sessionStorage.removeItem("utm_params");
      localStorage.removeItem("utm_params");
    }

    let storedUTM = sessionStorage.getItem("utm_params") || localStorage.getItem("utm_params");

    if (hasUTMParams(currentParams)) {
      const utmParamsString = currentParams.toString();
      sessionStorage.setItem("utm_params", utmParamsString);
      localStorage.setItem("utm_params", utmParamsString);
      setUtmParams(utmParamsString);
    } else if (storedUTM) {
      setUtmParams(storedUTM);
    }

    clearSessionStorageAfterInactivity();


  }, [location.pathname]);

  useEffect(() => {
    if (utmParams && !location.search.includes("utm_source")) {
      history.replace(`${location.pathname}?${utmParams}`);
    }
  }, [utmParams, location.pathname, history]);

  return { getStoredUTMParams: () => localStorage.getItem("utm_params") };
};

export default useUTMPersistenceDocs;