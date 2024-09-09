import {  
  Dialog,  
  DialogContent,  
  DialogHeader,  
  DialogTitle,  
} from "@/components/ui/dialog";  
import Spinner from "@/components/ui/spinner";  
import { getApiErrorMessage } from "@/lib/utils";  
import AssessmentReport from "@/views/current-risk/components/assessment-report";  
import AttackSurface from "@/views/current-risk/components/attack-surface";  
import RiskAndAchievement from "@/views/current-risk/components/risk-and-achievement";  
import SecurityFindings from "@/views/current-risk/components/security-findings";  
import LeakedPasswords from "@/views/current-risk/components/leaked-passwords";  
import VulnerabilitiesServices from "@/views/current-risk/components/vulnerabilities-services";  
import useDetailReport from "@/views/current-risk/hooks/useDetailReport";  
import { useInputState } from "@mantine/hooks";  
import useAuthUserAccount from "@/hooks/useAuthUserAccount";  
import { FormattedMessage, useIntl } from "react-intl";  

const CurrentRisk = () => {  
  const { getDetailReportQuery, isOpenDomainModal, setDomain, data } =  
    useDetailReport();  

  const { data: account } = useAuthUserAccount();  

  const [domainValue, setDomainValue] = useInputState("");  

  const intl = useIntl();  

  const roleName = account?.role_name || "";  

  const canViewDialog = !["client_admin", "client_user"].includes(roleName);  

  getDetailReportQuery.refetch(); 
  return (  
    <div className="p-4 sm:p-6">  
      {isOpenDomainModal && canViewDialog ? (  
        <Dialog open>  
          <DialogContent className="w-full max-w-[550px] p-4 max-sm:max-w-[95vw] md:p-5">  
            <DialogHeader>  
              <DialogTitle>  
                <h2 className="text-left text-xl font-semibold">  
                  <FormattedMessage id="dialogTitle" />  
                </h2>  
              </DialogTitle>  
            </DialogHeader>  
            <div className="mt-7">  
              <form  
                onSubmit={(e) => {  
                  e.preventDefault();  
                  if (!domainValue.trim()) return;  
                  setDomain(domainValue);  
                  setDomainValue("");  
                }}  
              >  
                <input  
                  type="text"  
                  className="h-11 w-full rounded-lg border px-3 text-sm outline-none placeholder:text-sm md:text-base md:placeholder:text-base lg:h-12 lg:px-4"  
                  placeholder={intl.formatMessage({ id: "enterDomain" })}  
                  value={domainValue}  
                  onChange={setDomainValue}  
                />  

                <div className="mt-3.5 flex justify-end">  
                  <button  
                    disabled={!domainValue.trim()}  
                    style={{backgroundColor: '#720072'}}
                    className="h-11 rounded-md px-8 font-medium text-white duration-300 enabled:hover:opacity-80 disabled:opacity-50"  
                    type="submit"  
                  >  
                    <FormattedMessage id="submit" />  
                  </button>  
                </div>  
              </form>  
            </div>  
          </DialogContent>  
        </Dialog>  
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
