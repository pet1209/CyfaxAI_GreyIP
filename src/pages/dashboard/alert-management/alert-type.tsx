import { FormattedMessage } from "react-intl";  
import Image from "next/image";
import { useAlertContext } from '@/context/alertContext'; 

const AlertType = () => {   
    const { selectedAlert } = useAlertContext();
    const array = ["resultPageCardTitle4", "companyExploitableServicesTableTitle", "subDomainExploitableServicesTableTitle", "domainVariation", "emailProtection", "stealerLog", "hackerAndDarkweb"];  
    return (  
        <div className="p-4 xl:p-5">  
            <table className="w-full max-lg:hidden">  
                <thead>  
                    <tr className="bg-[#60605B]/[.07] [&>th]:py-3.5 [&>th]:text-center [&>th]:font-semibold">  
                        <th className="text-center">  
                            <FormattedMessage id="ownerEmail" />  
                        </th>  
                        <th className="text-center">  
                            <FormattedMessage id="domainName" />  
                        </th>  
                        <th className="text-center">  
                            <FormattedMessage id="receivedEmail" />  
                        </th>  
                        <th className="text-center">  
                            <FormattedMessage id="teamsWebhook" />  
                        </th>  
                        <th className="text-center">  
                            <FormattedMessage id="slackWebhook" />  
                        </th>  
                    </tr>  
                </thead>
                <tbody>  
                    <tr 
                        className="h-20 border-b py-4 pl-6 text-sm"
                    >  
                        <td className="text-center">  
                            {selectedAlert?.owner_email || 'N/A'} 
                        </td>  
                        <td className="text-center">  
                            {selectedAlert?.domain_name || 'N/A'}  
                        </td>  
                        <td className="text-center">  
                            <input  
                                type="text"  
                                value={selectedAlert?.received_email || ''}  
                                // onChange={(e) => {  
                                // }}  
                                placeholder="N/A"  
                                className="mt-1.5 rounded border px-1 py-0.5 text-sm"  
                            />  
                        </td>  
                        <td className="text-center">  
                        <input  
                                type="text"  
                                value={selectedAlert?.teams_webhook || ''}  
                                // onChange={(e) => {  
                                // }}  
                                placeholder="N/A"  
                                className="mt-1.5 rounded border px-1 py-0.5 text-sm"  
                            />  
                        </td> 
                        <td className="text-center">  
                        <input  
                                type="text"  
                                value={selectedAlert?.slack_webhook || ''}  
                                // onChange={(e) => {  
                                // }}  
                                placeholder="N/A"  
                                className="mt-1.5 rounded border px-1 py-0.5 text-sm"  
                            />  
                        </td>
                    </tr>
                </tbody>
            </table>  
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:hidden">
                <div
                    className="rounded-lg p-3 shadow-[0_0_12px_rgba(0,0,0,0.12)]"
                >
                    <div className="grid grid-cols-[repeat(3,auto)] items-center gap-5">  
                        <div>  
                            <p className="text-[11px] font-semibold tracking-[-0.2px]">  
                                <FormattedMessage id="ownerEmail" />  
                            </p>  
                            <span className="mt-2.5 text-xs">  
                                {selectedAlert?.owner_email || 'N/A'} 
                            </span>  
                        </div>   
                        <div>  
                            <p className="text-[11px] font-semibold tracking-[-0.2px]">  
                                <FormattedMessage id="domainName" />  
                            </p>  
                            <span className="mt-2.5 text-xs">  
                                {selectedAlert?.domain_name || 'N/A'} 
                            </span>  
                        </div>    
                    </div>  

                    <hr className="my-2.5 border-t border-black/20" />  
                    <div className="col-span-1 grid">  
                        <p className="text-center  text-[11px] tracking-[-0.2px]">  
                            <FormattedMessage id="receivedEmail" />  
                        </p>  
                        <input  
                            type="text"  
                            value={selectedAlert?.received_email || ''}  
                            // onChange={(e) => {  
                            // }}  
                            placeholder="N/A"  
                            className="mt-2.5 rounded border px-1 py-0.5 text-xs"  
                        />  
                    </div>  
                    <hr className="my-2.5 border-t border-black/20" />  
                    <div className="grid grid-cols-2 items-center gap-5">  
                        <div className="col-span-1 grid">  
                            <p className="text-center text-[11px] font-semibold tracking-[-0.2px]">  
                                <FormattedMessage id="teamsWebhook" />  
                            </p>  
                            <input  
                                type="text"  
                                value={selectedAlert?.teams_webhook || ''}  
                                // onChange={(e) => {  
                                // }}  
                                placeholder="N/A"  
                                className="mt-2.5 rounded border px-1 py-0.5 text-xs"  
                            />  
                        </div>
                        <div className="col-span-1 grid">  
                            <p className="text-center  text-[11px] tracking-[-0.2px]">  
                                <FormattedMessage id="slackWebhook" />  
                            </p>  
                            <input  
                                type="text"  
                                value={selectedAlert?.slack_webhook || ''}  
                                // onChange={(e) => {  
                                // }}  
                                placeholder="N/A"  
                                className="mt-2.5 rounded border px-1 py-0.5 text-xs"  
                            />  
                        </div>  
                    </div>  
                    
                </div>
            </div>
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
