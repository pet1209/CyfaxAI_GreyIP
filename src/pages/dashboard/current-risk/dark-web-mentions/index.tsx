import EmailProtectionResultsAllTable from "./table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import useDetailReport from "@/views/current-risk/hooks/useDetailReport";
import { FormattedMessage } from "react-intl";
import React, { useState, useEffect } from 'react';  
import { PaginationComponent } from '@/components/common/pagination'; 

const LeakedCredentials = () => {
  const { data } = useDetailReport();
  const [currentPage, setCurrentPage] = useState(1);  
  const [itemsPerPage, setItemsPerPage] = useState(10);  
  const [maxPage, setMaxPage] = useState(0);  

  useEffect(() => {  
    const totalItems = data?.combolist_result?.hacker_dark_web_mentions?.dark_web_mentions_items?.length || 0;  
    setMaxPage(Math.ceil(totalItems / itemsPerPage));  
  }, [data, itemsPerPage]);

  const paginatedData = data?.combolist_result?.hacker_dark_web_mentions?.dark_web_mentions_items?.slice(  
    (currentPage - 1) * itemsPerPage,  
    currentPage * itemsPerPage  
  );

  const gotoPage = (page: number) => {  
    setCurrentPage(page);  
  };  
  
  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {  
    setItemsPerPage(Number(event.target.value));  
    setCurrentPage(1); // Go back to the first page with new items per page  
  };
  
  const tab = {  
    value: "leaked_credentials",  
    content: (  
        <>  
          {paginatedData && paginatedData.length > 0 && (  
            <EmailProtectionResultsAllTable  
              data={paginatedData}  
            />  
          )}  
        </>  
      ),  
    title: "leaked_credentials",  
    seeAllLink: "#",  
  } 

  return (
    <>
    <div className="p-4 font-mulish xl:p-5">  
        <h2 className="text-sm font-semibold sm:text-2xl/[120%]">
            <FormattedMessage id="darkWebMentions" /> 
        </h2>  
    </div>
      <div className="p-3 sm:rounded-xl sm:p-5">

        <Tabs defaultValue={tab.value}>
            <TabsContent value={tab.value} key={tab.value} asChild>
              <div className="overflow-hidden rounded shadow-[0_4px_14px_2px_rgba(0,0,0,0.06)]">
                    {tab.content}
                
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

export default LeakedCredentials;