import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constants/cookies";  
import routes from "@/constants/routes";  
import { getLogoutMutationOptions } from "@/cyfax-api-client/mutations";  
import {  
  getAuthTokensQueryOptions,  
  getAuthUserAccountQueryOptions,  
} from "@/cyfax-api-client/queries";  
import { getApiErrorMessage } from "@/lib/utils";  
import { appCache } from "@/node-cache";  
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";  
import { atom, useAtom } from "jotai";  
import { useRouter } from "next/router";  
import { useEffect } from "react";  
import { toast } from "react-toastify";  

const accessTokenAtom = atom<null | string>(null);  

const useAuthUserAccount = () => {  
  const router = useRouter();  
  const queryClient = useQueryClient();  
  const [accessToken, setAccessToken] = useAtom(accessTokenAtom);  

  const authUserAccountQuery = useQuery({  
    ...getAuthUserAccountQueryOptions(),  
    retry: false,  
    enabled: !!accessToken,  
    gcTime: 60 * 1000 * 2,  
  });  

  const logoutMutation = useMutation({  
    ...getLogoutMutationOptions(),  
    onSuccess: async () => {  
      try {  
        console.log('Logging out...');  
        clearSession();  
        broadcastLogout();  
        await router.push(routes.login);  
        console.log("Logged out successfully");  
      } catch (error) {  
        console.error("Error during logout:", error);  
        toast.error(getApiErrorMessage(error, "Failed to logout. Please try again."));  
      }  
    },  
  });  
  
  const clearSession = () => {  
    console.log("Clearing session");  
    appCache.del(ACCESS_TOKEN.name);  
    appCache.del(REFRESH_TOKEN.name);  
    document.cookie = `${ACCESS_TOKEN.name}=; Max-Age=0; path=/;`;  
    document.cookie = `${REFRESH_TOKEN.name}=; Max-Age=0; path=/;`;  
    setAccessToken(null);  
    queryClient.removeQueries();  
  }; 

  const getAuthTokensQuery = useQuery({  
    ...getAuthTokensQueryOptions(),  
  });  

  useEffect(() => {  
    setAccessToken(getAuthTokensQuery.data?.access_token || null);  
  }, [getAuthTokensQuery.data?.access_token, setAccessToken]);  

  useEffect(() => {  
    const handleStorage = (event: StorageEvent) => {  
      if (event.key === "logout") {  
        clearSession();  
        router.push(routes.login);  
      }  
    };  
  
    window.addEventListener("storage", handleStorage);  
  
    return () => window.removeEventListener("storage", handleStorage);  
  }, [router]);

  const broadcastLogout = () => {  
    console.log("Broadcasting logout");  
    localStorage.setItem("logout", Date.now().toString());  
  };  

  const queryData = authUserAccountQuery.data?.data;  

  return {  
    authUserAccountQuery,  
    data: queryData,  
    logoutMutation,  
    logout: logoutMutation.mutate,  
    logoutAsync: logoutMutation.mutateAsync,  
    isAdmin: !!queryData?.is_admin,  
    hasAuth: !!accessToken,  
    accessToken,  
    setAccessToken,  
  };  
};  

export default useAuthUserAccount;