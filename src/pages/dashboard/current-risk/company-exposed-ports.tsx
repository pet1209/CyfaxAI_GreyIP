import React, { useState, useEffect } from 'react';  
import CompanyExploitableServicesAllTable from "@/components/company-exploitable-services-all-table";  
import { Tabs, TabsContent } from "@/components/ui/tabs";  
import { PaginationComponent } from '@/components/common/pagination';  // Ensure correct path  
import useDetailReport from "@/views/current-risk/hooks/useDetailReport";  
import { FormattedMessage } from "react-intl";  

const AttackSurface = () => {  
  const { data } = useDetailReport();  
  const [currentPage, setCurrentPage] = useState(1);  
  const [itemsPerPage, setItemsPerPage] = useState(10);  
  const [maxPage, setMaxPage] = useState(0);  

  useEffect(() => {  
    const ports = data?.vulnscan_result?.org_domain?.ports || [];  
    setMaxPage(Math.ceil(ports.length / itemsPerPage));  
  }, [data, itemsPerPage]);  

  const paginatedData = data?.vulnscan_result?.org_domain?.ports?.slice(  
    (currentPage - 1) * itemsPerPage,  
    currentPage * itemsPerPage  
  );  

  const gotoPage = (page: number) => {  
    setCurrentPage(page);  
  };  

  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {  
    setItemsPerPage(Number(event.target.value));  
    setCurrentPage(1); // Reset to first page since the items per page changed  
  };  

  return (  
    <>  
      <div className="p-4 font-mulish xl:p-5"> 
        <h2 className="text-sm font-semibold sm:text-2xl/[120%]">  
          <FormattedMessage id="companyExploitableServicesTableTitle" />  
        </h2>  
      </div>  
      <div className="p-3 sm:rounded-xl sm:p-5">  
        <Tabs defaultValue="company_exploitable_services">  
          <TabsContent value="company_exploitable_services" key="company_exploitable_services" asChild>  
            <div className="overflow-hidden rounded shadow-[0_4px_14px_2px_rgba(0,0,0,0.06)]">  
              <CompanyExploitableServicesAllTable  
                rows={paginatedData || []}  
              />  
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