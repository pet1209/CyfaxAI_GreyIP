import { useCallback, useEffect, useRef } from 'react';  
import useAuthUserAccount from '@/hooks/useAuthUserAccount';  

const useIdleLogout = (inactivityPeriod = 300000) => {  
  const { logoutMutation, hasAuth } = useAuthUserAccount();  
  // inactivityPeriod = 60000 is equivalent to 5 minutes  
  
  const isClient = typeof window !== 'undefined';  

  const getSavedTimestamp = () => {  
    if (!isClient) {  
      return Date.now() + inactivityPeriod; 
    }  
    const savedTimestamp = localStorage.getItem('logoutTimestamp');  
    if (savedTimestamp) {  
      return Number(savedTimestamp);  
    } else {  
      const futureTimestamp = Date.now() + inactivityPeriod;  
      localStorage.setItem('logoutTimestamp', futureTimestamp.toString());  
      return futureTimestamp;  
    }  
  } 

  const activityTimestampRef = useRef<number>(getSavedTimestamp());  

  const refreshActivityTimestamp = useCallback(() => {  
    if (!isClient) return; 
    const newTimestamp = Date.now() + inactivityPeriod;  
    activityTimestampRef.current = newTimestamp;  
    localStorage.setItem('logoutTimestamp', newTimestamp.toString());  
  }, [inactivityPeriod]);

  const checkActivityTimeout = useCallback(() => {  
    if (!isClient) return; 
    if (Date.now() > activityTimestampRef.current && hasAuth) {  
      logoutMutation.mutate();  
      localStorage.removeItem('logoutTimestamp'); 
    }  
  }, [logoutMutation, hasAuth]); 

  useEffect(() => {  
    if(!isClient || !hasAuth) return;
    const checkInitialTimeout = () => {  
      const savedTimestamp = Number(localStorage.getItem('logoutTimestamp'));  
      if (Date.now() > savedTimestamp && hasAuth) {  
        logoutMutation.mutate();  
        localStorage.removeItem('logoutTimestamp'); 
      }  
    };  

    if (!hasAuth) return;  

    checkInitialTimeout();
  
    refreshActivityTimestamp();

    const interval = setInterval(checkActivityTimeout, 10000);  

    const events = [  
      'mousemove',  
      'mousedown',  
      'keypress',  
      'touchstart',  
      'click',  
      'scroll',  
    ];  

    events.forEach(event => {  
      window.addEventListener(event, refreshActivityTimestamp);  
    });  

    return () => {  
      clearInterval(interval);  
      events.forEach(event => {  
        window.removeEventListener(event, refreshActivityTimestamp);  
      });  
    };  
  }, [checkActivityTimeout, refreshActivityTimestamp, hasAuth, logoutMutation]);  

  return { logout: logoutMutation.mutate };  
};  

export default useIdleLogout;