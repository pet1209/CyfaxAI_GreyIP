import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constants/cookies";
import routes from "@/constants/routes";
import { getLogoutMutationOptions } from "@/cyfax-api-client/mutations";
import { getAuthUserAccountQueryOptions } from "@/cyfax-api-client/queries";
import { getApiErrorMessage, isAuthenticatedRoute } from "@/lib/utils";
import { appCache } from "@/node-cache";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const useAuthUserAccount = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const authUserAccountQuery = useQuery({
    ...getAuthUserAccountQueryOptions(),
    retry: false,
    enabled: !!isAuthenticatedRoute(router.asPath),
  });

  const logoutMutation = useMutation({
    ...getLogoutMutationOptions(),
    onSuccess() {
      router.replace(routes.login);
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

  const queryData = authUserAccountQuery.data?.data;

  return {
    authUserAccountQuery,
    data: queryData,
    logoutMutation,
    logout: logoutMutation.mutate,
    logoutAsync: logoutMutation.mutateAsync,
    isAdmin: !!queryData?.is_admin,
  };
};

export default useAuthUserAccount;
