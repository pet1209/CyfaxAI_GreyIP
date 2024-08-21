import { FormattedMessage } from "react-intl";  
import useAuthUserAccount from "@/hooks/useAuthUserAccount";  
import Image from "next/image";

const AlertManagement = () => {  
    const { data } = useAuthUserAccount();  
    const array = ["alertOption1", "alertOption2", "alertOption3", "alertOption4", "alertOption5"];  
    return (  
        <div className="p-4 font-mulish xl:p-5">  
            <h2 className="text-sm font-semibold sm:text-2xl/[120%]">
                <FormattedMessage id="alertTypeTitle" />{data?.full_name || data?.email}  
            </h2>  
            <div className="mt-5"></div>  
            <div className="rounded-lg pb-[132px] sm:rounded-xl xl:p-6 xl:shadow-[0_0_12px_rgba(0,0,0,0.12)]">  
                <h2 className="text-sm font-semibold sm:text-2xl/[120%]">
                    <FormattedMessage id="notificationPreferences" />  
                </h2>  
                <h2 className="mt-3 text-sm font-extralight sm:text-sm/[120%]">  
                    <FormattedMessage id="alertTypeSmallTitle" /><span className="text-accent">Cyfax</span>  
                </h2>  

                <div className="mt-11">  
                    <div className="xl:gap-x-[189px]">  
                        <div>  
                            <div className="!mt-4 space-y-3 xl:space-y-4">  
                                <div className="items-center xl:gap-x-[189px]">  
                                        <div className="flex h-[76px] items-center justify-center px-3 xl:max-w-[800px] xl:pl-4 xl:pr-5">  
                                            <div className="grid w-full grid-cols-7 items-center gap-x-6 lg:gap-x-[76px]">  
                                                <div className="col-span-4 flex items-center font-inter font-medium max-md:text-xs"></div>  

                                                <div className="col-span-3 grid grid-cols-3 items-center gap-x-6">  
                                                    <div className="flex flex-col items-center">  
                                                        <Image src="/email.svg" width="24" height="24" alt="Microsoft Teams Icon"/>  
                                                        <label htmlFor="checkbox1" className="font-bold">Email</label>  
                                                    </div>
                                                    <div className="flex flex-col items-center">  
                                                        <Image src="/slack-icon.png" width="24" height="24" alt="Microsoft Teams Icon"/>  
                                                        <label htmlFor="checkbox2" className="font-bold">Slack</label>  
                                                    </div>  
                                                    <div className="flex flex-col items-center">  
                                                        <Image src="/microsoft-teams-icon.png" width="24" height="24" alt="Microsoft Teams Icon"/>  
                                                        <label htmlFor="checkbox3" className="font-bold">Teams</label>  
                                                    </div>  
                                                </div>
                                            </div>  
                                        </div>
                                    </div>  
                                {array.map((item, index) => (  
                                    <div className="items-center xl:gap-x-[189px]" key={index}>  
                                        <div className="flex h-[76px] items-center justify-center rounded-lg border border-[#EAEAEA] px-3 xl:max-w-[800px] xl:pl-4 xl:pr-5">  
                                            <div className="grid w-full grid-cols-7 items-center gap-x-6 lg:gap-x-[76px]">  
                                                <div className="col-span-4 flex items-center font-inter font-medium max-md:text-xs">  
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
                    </div>  
                </div>  
            </div>  
        </div>  
    );  
};  

export default AlertManagement;