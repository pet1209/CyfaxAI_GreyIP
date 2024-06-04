import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <div className="flex flex-col lg:flex-row ">
        <Sidebar />
        {children}
      </div>
    </>
  );
};

export default Layout;
