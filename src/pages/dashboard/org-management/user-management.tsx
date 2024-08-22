import React, { useState, useEffect } from 'react';  
import UserManagementTable from "./user-management-table";  
import { Tabs, TabsContent } from "@/components/ui/tabs";  
import { PaginationComponent } from '@/components/common/pagination';  
import useDetailReport from "@/views/current-risk/hooks/useDetailReport";  
import { FormattedMessage } from "react-intl";  

const AttackSurface = () => {  
  const { data } = useDetailReport();  
  const [currentPage, setCurrentPage] = useState(1);  
  const [itemsPerPage, setItemsPerPage] = useState(10);  
  const [maxPage, setMaxPage] = useState(0); // Define maxPage and its setter  
  
  const gotoPage = (page: number) => {  
    setCurrentPage(page);  
  };  

  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {  
    setItemsPerPage(Number(event.target.value));  
    setCurrentPage(1); // Reset to first page as the items per page changes  
  };  


  return (  
    <>  
        <div className="p-4 font-mulish xl:p-5 flex justify-between items-center">   
            <h2 className="text-sm font-semibold sm:text-2xl/[120%]">   
                <FormattedMessage id="userManagementTitle" />   
            </h2>   
            <button   
                className="h-12 w-30 rounded-lg bg-accent px-8 text-sm font-semibold text-white duration-300 hover:opacity-90 md:text-base lg:text-lg"   
            >   
                <FormattedMessage id="createUserButton" />   
            </button>
        </div>
      <div className="p-3 sm:rounded-xl sm:p-5">  
        <Tabs defaultValue="sub_domain_exploitable_services">  
          <TabsContent value="sub_domain_exploitable_services" key="sub_domain_exploitable_services" asChild>  
            <div className="overflow-hidden rounded shadow-[0_4px_14px_2px_rgba(0,0,0,0.06)]">  
              <UserManagementTable  />  

              
              <div className="flex w-full justify-center py-4">  
                        <div className="flex items-center justify-center space-x-8">  
                            <div className="flex w-full justify-center py-4">  
                                <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 w-full">  
                                    {/* Items per page selection */}  
                                    <div className="flex flex-row items-center justify-center md:justify-start">  
                                        <label htmlFor="itemsPerPage" className="mr-2">  
                                            <FormattedMessage id="pageShowCount" />  
                                        </label>  
                                        <select value={itemsPerPage} onChange={handleItemsPerPageChange} className="text-center md:text-left">  
                                            <option value="10">10</option>  
                                            <option value="20">20</option>  
                                            <option value="50">50</option>  
                                        </select>  
                                    </div>  

                                    {/* Pagination component - center on mobile */}  
                                    <div className="w-full flex justify-center md:justify-start">  
                                        <PaginationComponent  
                                            currentPage={currentPage}  
                                            maxPage={maxPage}  
                                            gotoPage={gotoPage}  
                                        />   
                                    </div>  
                                </div>  
                            </div>
                        </div>  
                    </div>
            </div>  
          </TabsContent>  
        </Tabs>  
      </div>  
    </>  
  );  
};  

export default AttackSurface;