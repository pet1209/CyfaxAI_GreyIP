import { FormattedMessage } from "react-intl";  
import Image from "next/image";
import { useAlertContext } from '@/context/alertContext'; 

const AlertType = () => {   
    const { selectedAlert } = useAlertContext();
    const array = ["resultPageCardTitle4", "companyExploitableServicesTableTitle", "subDomainExploitableServicesTableTitle", "domainVariation", "emailProtection", "stealerLog", "hackerAndDarkweb"];  
    return (  
        <div className="p-4 xl:p-5">  
            <p style={{color: "#720072"}} className="text-sm font-medium sm:text-xl/[120%]">
                <FormattedMessage id="ownerEmail" /> : {selectedAlert?.owner_email || ''}  
            </p>  
            <p style={{color: "#720072"}} className="text-sm font-medium sm:text-xl/[120%]">
                <FormattedMessage id="receivedEmail" /> : {selectedAlert?.received_email || ''}  
            </p> 
            <p style={{color: "#720072"}} className="text-sm font-medium sm:text-xl/[120%]">
                <FormattedMessage id="teamsWebhook" /> : {selectedAlert?.teams_webhook || ''}  
            </p> 
            <p style={{color: "#720072"}} className="text-sm font-medium sm:text-xl/[120%]">
                <FormattedMessage id="slackWebhook" /> : {selectedAlert?.slack_webhook || ''}  
            </p> 
            <div className="mt-5"></div>  
            <div className="rounded-lg pb-[132px] sm:rounded-xl xl:p-6 xl:shadow-[0_0_12px_rgba(0,0,0,0.12)]">  
                <h2 className="text-sm font-semibold sm:text-2xl/[120%]">
                    <FormattedMessage id="notificationPreferences" />  
                </h2>  
                <h2 className="mt-3 text-sm font-extralight sm:text-sm/[120%]">  
                    <FormattedMessage id="alertTypeSmallTitle" /><span style={{color: '#720072', }}>Cyfax</span>  
                </h2>  

                <div className="mt-11 w-full">  
                    <div className="w-full">  
                        <div className="!mt-4 space-y-3 xl:space-y-4">  
                        <div className="w-full">  
                            <div className="flex h-[76px] w-full items-center justify-center px-3">  
                            <div className="grid w-full grid-cols-7 items-center gap-x-6">  
                                <div className="col-span-4 flex w-full items-center font-medium max-md:text-xs"></div>  

                                <div className="col-span-3 grid grid-cols-3 items-center gap-x-6">  
                                <div className="flex flex-col items-center">  
                                    <Image src="/email.svg" width="24" height="24" alt="Email Icon" />  
                                    <label htmlFor="checkbox1" className="font-bold">Email</label>  
                                </div>  
                                <div className="flex flex-col items-center">  
                                    <Image src="/slack-icon.png" width="24" height="24" alt="Slack Icon" />  
                                    <label htmlFor="checkbox2" className="font-bold">Slack</label>  
                                </div>  
                                <div className="flex flex-col items-center">  
                                    <Image src="/microsoft-teams-icon.png" width="24" height="24" alt="Teams Icon" />  
                                    <label htmlFor="checkbox3" className="font-bold">Teams</label>  
                                </div>  
                                </div>  
                            </div>  
                            </div>  
                        </div>  
                        {array.map((item, index) => (  
                            <div className="mt-4 w-full" key={index}>  
                            <div className="flex h-[76px] w-full items-center justify-center rounded-lg border border-[#EAEAEA] px-3">  
                                <div className="grid w-full grid-cols-7 items-center gap-x-6">  
                                <div className="col-span-4 flex w-full items-center font-medium max-md:text-xs">  
                                    <FormattedMessage id={item} />  
                                </div>  

                                <div className="col-span-3 grid grid-cols-3 items-center gap-x-6">  
                                    <input type="checkbox" />  
                                    <input type="checkbox" />  
                                    <input type="checkbox" />  
                                </div>  
                                </div>  
                            </div>  
                            </div>  
                        ))}  
                        </div>  
                    </div>  
                    <div className="mt-7"></div>  
                    <div className="flex justify-end">  
                        <button style={{backgroundColor: '#720072'}} className="h-12 w-full rounded-lg px-6 text-sm font-semibold text-white duration-300 hover:opacity-90 md:w-auto md:text-base lg:text-base">  
                            <FormattedMessage id="save" />  
                        </button>  
                    </div>
                </div>
            </div>  
        </div>  
    );  
};  

export default AlertType;
