import useAuthUserAccount from "@/hooks/useAuthUserAccount";
import { useCallback, useEffect, useRef } from "react";

const useIdleLogout = (timeout: number = 300000) => {
  const { logoutMutation, hasAuth } = useAuthUserAccount();
  // 300000ms = 5 minutes

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const logout = useCallback(() => {
    if (hasAuth) {
      logoutMutation.mutate();
    }
  }, [logoutMutation, hasAuth]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      logout();
    }, timeout);
  }, [logout, timeout]);

  useEffect(() => {
    if (!hasAuth) return;
    // Events to listen to for user activity
    const events = [
      "mousemove",
      "mousedown",
      "keypress",
      "touchstart",
      "click",
      "scroll",
    ];

    // Reset the timer on any of the above events
    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    // Initialize the timer when component mounts
    resetTimer();

    return () => {
      // Cleanup listeners and timer on component unmount
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [hasAuth, resetTimer]);

  return { logout }; // You might want to return this if you need it elsewhere
};

export default useIdleLogout;
