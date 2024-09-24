import React from "react";  
import Spinner from "@/components/ui/spinner";  
import { getApiErrorMessage } from "@/lib/utils";  
import AssessmentReport from "@/views/current-risk/components/assessment-report";  
import AttackSurface from "@/views/current-risk/components/attack-surface";  
import RiskAndAchievement from "@/views/current-risk/components/risk-and-achievement";  
import SecurityFindings from "@/views/current-risk/components/security-findings";  
import LeakedPasswords from "@/views/current-risk/components/leaked-passwords";  
import VulnerabilitiesServices from "@/views/current-risk/components/vulnerabilities-services";  
import useDetailReport from "@/views/current-risk/hooks/useDetailReport";  
import useAuthUserAccount from "@/hooks/useAuthUserAccount";  
import SearchBar from "@/components/search-bar";  
import SearchDialog from "@/components/search-dialog"; 

const CurrentRisk = () => {  
  const { getDetailReportQuery, isOpenDomainModal, data } = useDetailReport();  

  const { data: account } = useAuthUserAccount();  

  const roleName = account?.role_name || "";  

  const canViewDialog = !["client_admin", "client_user"].includes(roleName);  

  return (  
    <div className="p-4 sm:p-6">  
      {isOpenDomainModal ? (  
        <SearchDialog />  
      ) : getDetailReportQuery.isError ? (  
        <div className="flex justify-center py-40 text-red-500">  
          <p>{getApiErrorMessage(getDetailReportQuery.error)}</p>  
        </div>  
      ) : getDetailReportQuery.isLoading || !data ? (  
        <div className="flex justify-center py-40">  
          <Spinner />  
        </div>  
      ) : (  
        <>  
          <div className="mb-6 flex grow items-center justify-start space-x-3 rounded-lg md:space-x-5 lg:mr-5">  
            <SearchBar />  
          </div>  
          <div className="grid grid-cols-1 gap-x-10 gap-y-4 xl:grid-cols-2">  
            <RiskAndAchievement />  
            <SecurityFindings />  
          </div>  
          <div className="mt-6"></div>  
          <div className="grid grid-cols-1 gap-x-10 gap-y-4 xl:grid-cols-[60fr_40fr]">  
            <VulnerabilitiesServices />  
            <LeakedPasswords />  
          </div>  
          <div className="mt-6"></div>  
          <AttackSurface />  
          <AssessmentReport />  
        </>  
      )}  
    </div>  
  );  
};  

export default CurrentRisk;