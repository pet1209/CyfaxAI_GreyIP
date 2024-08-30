import { useCallback, useEffect } from 'react';  
import useAuthUserAccount from '@/hooks/useAuthUserAccount';  

const useIdleLogout = (inactivityPeriod = 300000) => {  
  const { logoutMutation, hasAuth } = useAuthUserAccount();  
  const isClient = typeof window !== 'undefined';  

  const logoutIfInactive = useCallback(() => {  
    if (isClient && hasAuth) {  
      const savedTimestamp = localStorage.getItem('logoutTimestamp');  
      if (savedTimestamp && Date.now() > Number(savedTimestamp)) {  
        logoutMutation.mutate();  
        localStorage.removeItem('logoutTimestamp');  
      }  
    }  
  }, [logoutMutation, isClient, hasAuth]);  
 
  useEffect(() => {  
    logoutIfInactive(); 
  }, [logoutIfInactive]);  

  useEffect(() => {  
    if (!isClient || !hasAuth) return;  

    const intervalId = setInterval(logoutIfInactive, 10000);  

    const updateTimestamp = () => {  
      if (isClient && hasAuth) {  
        localStorage.setItem('logoutTimestamp', (Date.now() + inactivityPeriod).toString());  
      }  
    };  

    const events = ['mousemove', 'mousedown', 'keypress', 'touchstart', 'click', 'scroll'];  
    events.forEach(event => window.addEventListener(event, updateTimestamp));  

    updateTimestamp();

    return () => {  
      clearInterval(intervalId);  
      events.forEach(event => window.removeEventListener(event, updateTimestamp));  
    };  
  }, [logoutIfInactive, isClient, hasAuth, inactivityPeriod]);  

  return { logout: logoutMutation.mutate };  
};  

export default useIdleLogout;