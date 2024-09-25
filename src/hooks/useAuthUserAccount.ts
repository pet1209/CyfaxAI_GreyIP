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
    onSuccess() {
      router.push(routes.login);
      appCache.del(ACCESS_TOKEN.name);
      appCache.del(REFRESH_TOKEN.name);

      queryClient.removeQueries();
    },
    onError(error) {
      toast.error(
        getApiErrorMessage(error, "Failed to logout. Please try again."),
      );
    },
  });

  const getAuthTokensQuery = useQuery({
    ...getAuthTokensQueryOptions(),
  });

  useEffect(() => {
    setAccessToken(getAuthTokensQuery.data?.access_token || null);
  }, [getAuthTokensQuery.data?.access_token, setAccessToken]);

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
