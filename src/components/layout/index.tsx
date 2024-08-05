import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import Spinner from "@/components/ui/spinner";
import useAuthUserAccount from "@/hooks/useAuthUserAccount";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  const { authUserAccountQuery } = useAuthUserAccount();
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
