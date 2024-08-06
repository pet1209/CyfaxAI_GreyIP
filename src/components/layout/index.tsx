import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import Spinner from "@/components/ui/spinner";
import { ACCESS_TOKEN } from "@/constants/cookies";
import useAuthUserAccount from "@/hooks/useAuthUserAccount";
import useIdleLogout from "@/hooks/useIdleLogout";
import { appCache } from "@/node-cache";
import { ReactNode, useEffect } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  useIdleLogout();

  const { authUserAccountQuery, setAccessToken } = useAuthUserAccount();

  useEffect(() => {
    const handleOnSet = (key: string, value: string) => {
      if (key === ACCESS_TOKEN.name) {
        setAccessToken(value);
      }
    };
    const handleOnDelete = (key: string) => {
      if (key === ACCESS_TOKEN.name) {
        setAccessToken(null);
      }
    };

    appCache.on("set", handleOnSet);
    appCache.on("del", handleOnDelete);

    return () => {
      appCache.off("set", handleOnSet);
      appCache.off("del", handleOnDelete);
    };
  }, [setAccessToken]);

  if (
    authUserAccountQuery.isLoading &&
    authUserAccountQuery.fetchStatus !== "idle"
  ) {
    return (
      <div className="grid h-screen place-items-center">
        <Spinner />
      </div>
    );
  }
  return (
    <>
      <Header />
      <div className="flex flex-col lg:flex-row ">
        <Sidebar />
        <div className="h-[calc(100vh-80px)] grow overflow-auto">
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
