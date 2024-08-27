// user-profile-update.tsx  
import {  
    Dialog,  
    DialogContent,  
    DialogHeader,  
    DialogTitle,  
  } from "@/components/ui/dialog";  
import { FormattedMessage } from "react-intl";  
import Image from "next/image";  
import { Eye, EyeOff } from 'lucide-react';
import { useState } from "react";

interface UpdateProfileProps {  
onClose: () => void;
}  

const ChangePassword = ({ onClose }: UpdateProfileProps) => {  
    const [isPasswordVisible, setPasswordVisible] = useState(false);  
    const [isVerifyPasswordVisible, setVerifyPasswordVisible] = useState(false);  

    const togglePasswordVisibility = () => {  
        setPasswordVisible(!isPasswordVisible);  
    }; 

    const toggleVerifyPasswordVisibility = () => {  
        setVerifyPasswordVisible(!isVerifyPasswordVisible);  
    }; 

    return (  
        <Dialog open>  
        <DialogContent className="w-full max-w-[550px] p-4 max-sm:max-w-[95vw] md:p-5">  
            <DialogHeader>  
            <DialogTitle>  
            <div className="flex w-full items-center justify-between">  
                <div className="flex items-center space-x-2 border-b border-[#ab00ab] pb-2">  
                    <Image src="/profile.svg" width="24" height="24" alt="Profile" />  
                    <h2 className="text-xl font-semibold text-[#ab00ab]">  
                    <FormattedMessage id="changePasswordTitle" />  
                    </h2>  
                </div>  
                <button onClick={onClose} className="text-[#ab00ab]">X</button>  
            </div>  
            </DialogTitle>  
            </DialogHeader>  
            <div className="mt-7">  
            <form  
                onSubmit={(e) => {  
                e.preventDefault();    
                }}  
            >  
                <label htmlFor="userName" style={{ fontSize: '15px' }} className="mb-2 block font-semibold text-gray-900">  
                    <FormattedMessage id="userName"/>  
                </label>
                <input  
                    id="userName"  
                    type="text"  
                    className="mb-2 h-11 w-full rounded-lg border px-3 text-sm outline-none placeholder:text-sm md:text-base md:placeholder:text-base lg:h-12 lg:px-4"  
                    placeholder="user name"  
                    disabled={true}
                />  
                <label htmlFor="email" style={{ fontSize: '15px' }} className="mb-2 block font-semibold text-gray-900">  
                    <FormattedMessage id="email"/>  
                </label>
                <input  
                    id="email"  
                    type="text"  
                    className="mb-2 h-11 w-full rounded-lg border px-3 text-sm outline-none placeholder:text-sm md:text-base md:placeholder:text-base lg:h-12 lg:px-4"  
                    placeholder="email"  
                    disabled={true}
                />  
                <label htmlFor="newPassword" style={{ fontSize: '15px' }} className="mb-2 block font-semibold text-gray-900">  
                    <FormattedMessage id="newPasswordLabel"/>  
                </label>
                <div className="relative">  
                    <input  
                        id="newPassword"  
                        type={isPasswordVisible ? "text" : "password"}  
                        className="mb-2 h-11 w-full rounded-lg border px-3 text-sm outline-none placeholder:text-sm md:text-base md:placeholder:text-base lg:h-12 lg:px-4"  
                        placeholder="new password"  
                    />  
                    <span className="absolute inset-y-0 right-4 flex items-center">  
                        {isPasswordVisible ? (  
                        <EyeOff className="cursor-pointer" onClick={togglePasswordVisibility} />  
                        ) : (  
                        <Eye className="cursor-pointer" onClick={togglePasswordVisibility} />  
                        )}  
                    </span>  
                </div>
                <label htmlFor="verifyPassword" style={{ fontSize: '15px' }} className="mb-2 block font-semibold text-gray-900">  
                    <FormattedMessage id="verifyPasswordLabel"/>  
                </label>
                <div className="relative">  
                    <input  
                        id="verifyPassword"  
                        type={isVerifyPasswordVisible ? "text" : "password"}  
                        className="mb-2 h-11 w-full rounded-lg border px-3 text-sm outline-none placeholder:text-sm md:text-base md:placeholder:text-base lg:h-12 lg:px-4"  
                        placeholder="verify new password"  
                    />  
                    <span className="absolute inset-y-0 right-4 flex items-center">  
                        {isVerifyPasswordVisible ? (  
                        <EyeOff className="cursor-pointer" onClick={toggleVerifyPasswordVisibility} />  
                        ) : (  
                        <Eye className="cursor-pointer" onClick={toggleVerifyPasswordVisibility} />  
                        )}  
                    </span>  
                </div> 
                <div className="mt-3.5 flex justify-end">  
                    <button  
                    className="h-11 rounded-md bg-accent px-8 font-medium text-white duration-300 enabled:hover:opacity-80 disabled:opacity-50"  
                    type="submit"  
                    >  
                    <FormattedMessage id="changePasswordTitle" />  
                    </button>  
                </div>  
            </form>  
            </div>  
        </DialogContent>  
        </Dialog>  
    );  
};  

export default ChangePassword;