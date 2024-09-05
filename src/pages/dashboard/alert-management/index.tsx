import React, { useState, useEffect, useCallback } from 'react';  
import AlertManagementTable from "./alert-management-table";  
import { Tabs, TabsContent } from "@/components/ui/tabs";  
import { PaginationComponent } from '@/components/common/pagination';  
import Link from "next/link";
import routes from "@/constants/routes";
import { getGroupsQueryOptions, getAlertsQueryOptions } from "@/cyfax-api-client/queries";
import { Search } from "lucide-react";
import { getAuthTokenOnClient } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { FormattedMessage, useIntl } from "react-intl";

const AlartManagement = () => {  
  const [currentPage, setCurrentPage] = useState(1);  
  const [itemsPerPage, setItemsPerPage] = useState(10);  
  const [maxPage, setMaxPage] = useState(0);
  
  const [searchTerm, setSearchTerm] = useState('');  
  const [selectedOption, setSelectedOption] = useState('ORG name');  
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);  
  
  const gotoPage = (page: number) => {  
    setCurrentPage(page);  
  };  

  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {  
    setItemsPerPage(Number(event.target.value));  
    setCurrentPage(1); 
  };  

  const { data: groupsData = [] } = useQuery(getGroupsQueryOptions());  

  const [orgGroups, setOrgGroups] = useState(groupsData);  

  useEffect(() => {  
    setOrgGroups(groupsData);  
  }, [groupsData]); 

  const handleUpdateGroup = (updatedGroup: Group) => {  
    const updatedGroups = orgGroups.map((group) => (group.id === updatedGroup.id ? updatedGroup : group));  
    setOrgGroups(updatedGroups);  
  };
  const handleDeleteGroup = (groupId: string) => {  
    const updatedGroups = orgGroups.filter((group) => group.id !== groupId);  
    setOrgGroups(updatedGroups);  
  };

  const searchGroups = useCallback(async () => {  
    if (!searchTerm) {  
      setOrgGroups(groupsData);  
      return;  
    }  
    const baseUrl = 'https://cyfax.ai/backend/api/groups/';  
    let url = baseUrl;  
  
    switch (selectedOption) {  
      case 'ORG name':  
        url += `?query=${encodeURIComponent(searchTerm)}`;  
        break;  
      case 'Admin Email':  
        url += `?admin_email=${encodeURIComponent(searchTerm)}`;  
        break;  
      case 'Role':  
        url += `?group_kind=${encodeURIComponent(searchTerm)}`;  
        break;  
      default:  
        return;  
    }  
    const tokens = await getAuthTokenOnClient();
    try {  
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',  
          'Authorization': `Bearer ${tokens.accessToken}`,
        }
      });  
      if (!response.ok) {  
        throw new Error('Network response was not ok');  
      }  
      const data = await response.json();  
      console.log("print: ", data.data)
      setOrgGroups(data.data); // Populate orgGroups with the filtered data  
    } catch (error) {  
      console.error("Error fetching filtered groups", error);  
    }  
  }, [searchTerm, selectedOption, groupsData]);

  useEffect(() => {  
    if (debounceTimeout) {  
      clearTimeout(debounceTimeout);  
    }  
  
    setDebounceTimeout(  
      setTimeout(() => {  
        searchGroups();  
      }, 1000)  
    );  

    return () => {  
      if (debounceTimeout) {  
        clearTimeout(debounceTimeout);  
      }  
    };  
  }, [searchTerm, selectedOption, searchGroups, debounceTimeout]); 

  useEffect(() => {  
    const totalCount = orgGroups?.length || 0;  
    setMaxPage(Math.ceil(totalCount / itemsPerPage));  
  }, [orgGroups?.length, itemsPerPage]);


  const paginatedGroups = orgGroups?.slice(  
    (currentPage - 1) * itemsPerPage,  
    currentPage * itemsPerPage  
  ); 
  const intl = useIntl();


  const alertsData = useQuery(getAlertsQueryOptions()); 
  console.log(alertsData) 

  return (  
    <>  
      <div className="p-4 font-mulish xl:p-5">  
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-x-4 md:space-y-0">  
          <h2 className="self-stretch text-center text-sm font-semibold sm:text-2xl/[120%] md:self-auto md:text-left">  
            <FormattedMessage id="setupEmailForAlerts" />  
          </h2>  
          <div className="flex w-full flex-col items-center space-y-4 md:w-auto md:flex-row md:space-x-4 md:space-y-0">  
            <div className="flex w-full flex-col items-center space-y-4 md:w-auto md:flex-row md:space-x-4 md:space-y-0">  
              <div className="relative w-full md:w-auto">  
                <input  
                  type="text"  
                  // value={searchTerm}
                  // onChange={(e)=>setSearchTerm(e.target.value)}
                  placeholder={intl.formatMessage({ id: "search" })}  
                  className="h-10 w-full rounded-lg border-2 pl-3 pr-8 text-xs outline-none placeholder:text-xs md:w-64 md:pr-10 md:text-base md:placeholder:text-base lg:h-12 lg:pl-5 lg:pr-14"  
                  style={{ borderColor: '#720072' }}  
                />  
                <button className="pointer-events-auto absolute right-3 top-1/2 -translate-y-1/2 md:right-5">  
                  <Search className="w-4 text-accent md:w-5 lg:w-6" />  
                </button>  
              </div>  

              <div className="flex w-full items-center justify-between space-x-4 md:w-auto md:space-x-2">  
                <p style={{ color: '#720072' }} className="text-sm font-normal sm:text-xl/[120%]">  
                  <FormattedMessage id="searchBy" />  
                </p>  

                <select  
                  // value={selectedOption}
                  // onChange={(e)=>setSelectedOption(e.target.value)}
                  style={{ color: '#720072' }}
                  id="role"  
                  className="h-11 w-full rounded-lg border px-3 text-sm outline-none md:w-auto md:text-base lg:h-12 lg:px-4"  
                >  
                  <option style={{ color: '#720072' }} value="ORG name">ORG name</option>  
                  <option style={{ color: '#720072' }} value="Admin Email">Domain</option>  
                  <option style={{ color: '#720072' }} value="Role">Owner email</option>  
                </select>  
              </div>  
            </div>  
            <Link href={routes.createOrgManagement} className="order-1 w-full md:order-none md:w-auto">  
              <button className="h-12 w-full rounded-lg bg-accent px-6 text-sm font-semibold text-white duration-300 hover:opacity-90 md:w-auto md:text-base lg:text-base">  
                <FormattedMessage id="createNewAlertButton" />  
              </button>  
            </Link>
          </div>  
        </div>  
      </div>
      <div className="p-3 sm:rounded-xl sm:p-5">  
        <Tabs defaultValue="sub_domain_exploitable_services">  
          <TabsContent value="sub_domain_exploitable_services" key="sub_domain_exploitable_services" asChild>  
            <div className="overflow-hidden rounded shadow-[0_4px_14px_2px_rgba(0,0,0,0.06)]">  
              <AlertManagementTable 
                orgGroups={paginatedGroups || []} 
                onUpdateGroup={handleUpdateGroup} 
                onDeleteGroup={handleDeleteGroup}  
              />

              
              <div className="flex w-full justify-center py-4">  
                        <div className="flex items-center justify-center space-x-8">  
                            <div className="flex w-full justify-center py-4">  
                                <div className="flex w-full flex-col items-center justify-center space-y-4 md:flex-row md:space-x-8 md:space-y-0">  
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
                                    <div className="flex w-full justify-center md:justify-start">  
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

export default AlartManagement;