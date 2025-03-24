import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

// Utility: Check for UTM presence
const hasUTMParams = (params: URLSearchParams) => {
  return (
    params.has("utm_source") ||
    params.has("utm_medium") ||
    params.has("utm_campaign") ||
    params.has("utm_term") ||
    params.has("utm_content")
  );
};

// Constants
const LOCAL_STORAGE_KEY = "utm_params";
const SESSION_STORAGE_KEY = "utm_params";
const UTM_REMOVED_FLAG = "utm_removed";
const MAX_AGE_DAYS = 30;

export const useUTMPersistenceDocs = () => {
    const location = useLocation();
    const history = useHistory();

    useEffect(() => {
        const currentParams = new URLSearchParams(location.search);
        const hasUTM = hasUTMParams(currentParams);

        const now = Date.now();

        const saveUTMToStorage = (paramsString: string) => {
        sessionStorage.setItem(SESSION_STORAGE_KEY, paramsString);
        sessionStorage.removeItem(UTM_REMOVED_FLAG); // user didn’t remove them
        localStorage.setItem(
            LOCAL_STORAGE_KEY,
            JSON.stringify({ value: paramsString, timestamp: now })
        );
        };

        const clearUTMFromStorage = () => {
        sessionStorage.removeItem(SESSION_STORAGE_KEY);
        sessionStorage.setItem(UTM_REMOVED_FLAG, "true");
        };

        const restoreUTMFromSession = () => {
        const stored = sessionStorage.getItem(SESSION_STORAGE_KEY);
        console.log(stored);
        console.log(sessionStorage)
        if (stored && !sessionStorage.getItem(UTM_REMOVED_FLAG)) {
            history.replace({
            pathname: location.pathname,
            search: stored,
            });
        }
        };

        // CASE 1: UTM present in URL → store it
        if (hasUTM) {
        const utmParamsString = Array.from(currentParams.entries())
            .filter(([key]) => key.startsWith("utm_"))
            .map(([key, value]) => `${key}=${value}`)
            .join("&");

        saveUTMToStorage(utmParamsString);
        return; // done
        }

        // CASE 2: UTM was manually removed (no utm_ in query, but query string exists)
        if (!hasUTM && location.search.includes("utm_") === false && location.search === "") {
        clearUTMFromStorage();
        return;
        }

        // CASE 3: Navigating internally → restore from session if allowed
        const hasRemoved = sessionStorage.getItem(UTM_REMOVED_FLAG);
        const hasStoredUTM = sessionStorage.getItem(SESSION_STORAGE_KEY);
        if (hasStoredUTM) {
            restoreUTMFromSession();
        }
        
        // CASE 4: Clean up old localStorage if expired
        const localStored = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (localStored) {
            const { timestamp } = JSON.parse(localStored);
            const ageInDays = (now - timestamp) / (1000 * 60 * 60 * 24);
            if (ageInDays > MAX_AGE_DAYS) {
                localStorage.removeItem(LOCAL_STORAGE_KEY);
            }
        }
    }, [location]);
};