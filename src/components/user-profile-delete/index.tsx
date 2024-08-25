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
import DeleteSuccess from "@/components/delete-success-dialog";

interface UpdateProfileProps {  
    onClose: () => void;
}  

const DeleteProfile = ({ onClose }: UpdateProfileProps) => {  
    const [isDialogOpen, setIsDialogOpen] = useState(true);
    const [isPasswordVisible, setPasswordVisible] = useState(false);   
    const [isConfirmDeletionVisible, setIsConfirmDeletionVisible] = useState(false); 

    const togglePasswordVisibility = () => {  
        setPasswordVisible(!isPasswordVisible);  
    }; 

    const confirmDeletionClick = () => {
        setIsConfirmDeletionVisible(true); // Show the DeleteSuccess component  
        setIsDialogOpen(false);
    }

    const handleConfirmClose = () => {  
        onClose()
    }; 

    return (  
        <>
        {isDialogOpen && (
            <Dialog open>  
                <DialogContent className="w-full max-w-[550px] p-4 max-sm:max-w-[95vw] md:p-5">  
                    <DialogHeader>  
                    <DialogTitle>  
                    <div className="flex justify-between items-center w-full">  
                        <div className="flex justify-center flex-1">  
                            <h2 className="text-xl font-semibold text-[#ab00ab]">  
                                <FormattedMessage id="deleteProfileTitle" />  
                            </h2>  
                        </div>  
                        <button onClick={onClose} className="close-btn text-[#ab00ab] ml-auto">X</button>  
                    </div>
                    </DialogTitle>  
                    </DialogHeader>  
                    <div className="mt-7">  
                    <form  
                        onSubmit={(e) => {  
                        e.preventDefault();  
                        confirmDeletionClick();
                        // Handle form submission here.  
                        }}  
                    >  
                        <label htmlFor="password" style={{ fontSize: '15px' }} className="block mb-2 font-semibold text-gray-900">  
                            <FormattedMessage id="enterPasswordLabel"/>  
                        </label>
                        <div className="relative">  
                            <input  
                                id="password"  
                                type={isPasswordVisible ? "text" : "password"}  
                                className="h-11 w-full rounded-lg mb-2 border px-3 text-sm outline-none placeholder:text-sm md:text-base md:placeholder:text-base lg:h-12 lg:px-4"  
                                placeholder="enter password"  
                            />  
                            <span className="absolute inset-y-0 right-4 flex items-center">  
                                {isPasswordVisible ? (  
                                <EyeOff className="cursor-pointer" onClick={togglePasswordVisibility} />  
                                ) : (  
                                <Eye className="cursor-pointer" onClick={togglePasswordVisibility} />  
                                )}  
                            </span>  
                        </div>
                        <div className="mt-3.5 flex justify-end">  
                            <button  
                            className="h-11 rounded-md bg-accent px-8 font-medium text-white duration-300 enabled:hover:opacity-80 disabled:opacity-50"  
                            type="submit"  
                            >  
                            <FormattedMessage id="confirmDeletion" />  
                            </button>  
                        </div>  
                    </form>  
                    </div>  
                </DialogContent>  
            </Dialog> 
        )} 
            {isConfirmDeletionVisible && <DeleteSuccess onCloseConfirm={handleConfirmClose} />} 
        </>
    );  
};  

export default DeleteProfile;