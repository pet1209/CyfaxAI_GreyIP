// user-profile-update.tsx  
import {  
    Dialog,  
    DialogContent,  
    DialogHeader,  
    DialogTitle,  
  } from "@/components/ui/dialog";  
  import { FormattedMessage } from "react-intl";  
  import Image from "next/image";  
  
  interface UpdateProfileProps {  
    onClose: () => void; // Ensure this prop is correctly typed.  
  }  
  
  const UpdateProfile = ({ onClose }: UpdateProfileProps) => {  
    return (  
      <Dialog open>  
        <DialogContent className="w-full max-w-[550px] p-4 max-sm:max-w-[95vw] md:p-5">  
          <DialogHeader>  
            <DialogTitle>  
            <div className="flex justify-between items-center w-full">  
                <div className="flex items-center space-x-2 border-b border-[#ab00ab] pb-2">  
                  <Image src="/profile.svg" width="24" height="24" alt="Profile" />  
                  <h2 className="text-xl font-semibold text-[#ab00ab]">  
                    <FormattedMessage id="profileTitle" />  
                  </h2>  
                </div>  
                <button onClick={onClose} className="close-btn text-[#ab00ab]">X</button>  
            </div>  
            </DialogTitle>  
          </DialogHeader>  
          <div className="mt-7">  
            <form  
              onSubmit={(e) => {  
                e.preventDefault();  
                // Handle form submission here.  
              }}  
            >  
                <label htmlFor="firstName" style={{ fontSize: '15px' }} className="block mb-2 font-semibold text-gray-900">  
                    <FormattedMessage id="firstName"/>  
                </label>
                <input  
                    id="firstName"  
                    type="text"  
                    className="h-11 w-full rounded-lg mb-2 border px-3 text-sm outline-none placeholder:text-sm md:text-base md:placeholder:text-base lg:h-12 lg:px-4"  
                    placeholder="first name"  
                />  
                <label htmlFor="lastName" style={{ fontSize: '15px' }} className="block mb-2 font-semibold text-gray-900">  
                    <FormattedMessage id="lastName"/>  
                </label>
                <input  
                    id="lastName"  
                    type="text"  
                    className="h-11 w-full rounded-lg mb-2 border px-3 text-sm outline-none placeholder:text-sm md:text-base md:placeholder:text-base lg:h-12 lg:px-4"  
                    placeholder="last name"  
                />  
                <label htmlFor="companyName" style={{ fontSize: '15px' }} className="block mb-2 font-semibold text-gray-900">  
                    <FormattedMessage id="companyName"/>  
                </label>
                <input  
                    id="companyName"  
                    type="text"  
                    className="h-11 w-full rounded-lg mb-2 border px-3 text-sm outline-none placeholder:text-sm md:text-base md:placeholder:text-base lg:h-12 lg:px-4"  
                    placeholder="company name"  
                />  
                <label htmlFor="email" style={{ fontSize: '15px' }} className="block mb-2 font-semibold text-gray-900">  
                    <FormattedMessage id="email"/>  
                </label>
                <input  
                    id="email"  
                    type="text"  
                    className="h-11 w-full rounded-lg mb-2 border px-3 text-sm outline-none placeholder:text-sm md:text-base md:placeholder:text-base lg:h-12 lg:px-4"  
                    placeholder="email"  
                />  
                <label htmlFor="userName" style={{ fontSize: '15px' }} className="block mb-2 font-semibold text-gray-900">  
                    <FormattedMessage id="userName"/>  
                </label>
                <input  
                    id="userName"  
                    type="text"  
                    className="h-11 w-full rounded-lg mb-2 border px-3 text-sm outline-none placeholder:text-sm md:text-base md:placeholder:text-base lg:h-12 lg:px-4"  
                    placeholder="user name"  
                />  
                <label htmlFor="role" style={{ fontSize: '15px' }} className="block mb-2 font-semibold text-gray-900">  
                    <FormattedMessage id="role"/>  
                </label>
                <input  
                    id="role"  
                    type="text"  
                    className="h-11 w-full rounded-lg mb-2 border px-3 text-sm outline-none placeholder:text-sm md:text-base md:placeholder:text-base lg:h-12 lg:px-4"  
                    placeholder="role"  
                />  
                <div className="mt-3.5 flex justify-end">  
                    <button  
                    className="h-11 rounded-md bg-accent px-8 font-medium text-white duration-300 enabled:hover:opacity-80 disabled:opacity-50"  
                    type="submit"  
                    >  
                    <FormattedMessage id="updateProfile" />  
                    </button>  
                </div>  
            </form>  
          </div>  
        </DialogContent>  
      </Dialog>  
    );  
  };  
  
  export default UpdateProfile;