import { FormattedMessage } from "react-intl";  
import Image from "next/image";
import UpdateProfile from "@/components/user-profile-update"
import {useState} from "react";

const UserManagementTable = () => {  

  const [isUpdateProfileVisible, setIsUpdateProfileVisible] = useState(false);  

  const handleEditClick = () => {  
    setIsUpdateProfileVisible(true);  
  };  
   
  // Function to close UpdateProfile dialog  
  const handleClose = () => {  
    setIsUpdateProfileVisible(false);  
  }; 

  return (  
    <>
      <div>  
        <table className="w-full max-lg:hidden">  
          <thead>  
            <tr className="bg-[#60605B]/[.07] [&>th]:py-3.5 [&>th]:pl-6 [&>th]:text-center [&>th]:font-mulish [&>th]:font-semibold">  
              <th>  
                <FormattedMessage id="#" />  
              </th>  
              <th>  
                <FormattedMessage id="user" />  
              </th>  
              <th>  
                <FormattedMessage id="userName" />  
              </th>  
              <th>  
                <FormattedMessage id="createdAt" />  
              </th>  
              <th>  
                <FormattedMessage id="companyName" />  
              </th>  
              <th>  
                <FormattedMessage id="role" />  
              </th>  
              <th>  
                <FormattedMessage id="actions" />  
              </th>  
            </tr>  
          </thead>  
          <tbody>  
            <tr  
                className="border-b py-4 pl-6 font-mulish text-sm"  
            >  
                <td className="text-center">1</td>  
                <td className="text-center">  
                  <div className="flex items-center justify-center space-x-2">  
                    <img src="/A.svg" width="24" height="24" alt="Edit" className="inline-block"/>  
                    <div className="flex flex-col">
                      <span>AA</span>  
                      <span>danish.hex+1@gmail.com</span>
                    </div>
                  </div>  
                </td>
                <td className="text-center">Apple</td>  
                <td className="text-center">Jun 7,2022</td>  
                <td className="text-center">Apple</td>  
                <td className="text-center">Partner</td>  
                <td className="text-center">  
                  <div className="flex items-center justify-center space-x-2">  
                    <Image src="/edit.svg" width="24" height="24" alt="Edit" onClick={handleEditClick}/>  
                    <Image src="/change.svg" width="24" height="24" alt="Change"/>  
                    <Image src="/delete.svg" width="24" height="24" alt="Delete"/>  
                  </div>  
                </td>
            </tr>  
          </tbody>
        </table>  
        <div className="grid grid-cols-1 gap-3 font-mulish md:grid-cols-2 lg:hidden">
          <div
              className="rounded-lg p-3 shadow-[0_0_12px_rgba(0,0,0,0.12)]"
          >
            <div className="grid grid-cols-[repeat(4,auto)] items-center gap-5">  
              <div>  
                <p className="text-[13px] font-semibold tracking-[-0.2px]">  
                  <FormattedMessage id="#" />  
                </p>  
                <span className="mt-2.5 text-xs">1</span>  
              </div>  
              <div>  
                <p className="text-[13px] font-semibold tracking-[-0.2px]">  
                  <FormattedMessage id="user" />  
                </p>  
                <span className="mt-2.5 text-xs">User</span>  
              </div>  
              <div>  
                <p className="text-[13px] font-semibold tracking-[-0.2px]">  
                  <FormattedMessage id="userName" />  
                </p>  
                <span className="mt-2.5 text-xs">Apple</span>  
              </div>  
              <div>  
                <p className="text-[13px] font-semibold tracking-[-0.2px]">  
                  <FormattedMessage id="createdAt" />  
                </p>  
                <span className="mt-2.5 text-xs">Jun 7, 2022</span>  
              </div>  
            </div>

            <hr className="my-2.5 border-t border-black/20" />

            <div className="grid grid-cols-[50%,1px,auto] items-center gap-5">
              <div>
              <p className="text-center text-[13px] font-semibold tracking-[-0.2px]">
                  <FormattedMessage id="companyName" />
              </p>
              <span className="text-center mt-2.5 block max-w-[150px] truncate text-xs">
                  Apple
              </span>
              </div>
              <span className="h-3.5 border-r border-black/20"></span>
              <div>
              <p className="text-center text-[13px] font-semibold tracking-[-0.2px]">
                  <FormattedMessage id="role" />
              </p>
              <span className="text-center mt-2.5 block max-w-[150px] truncate text-xs">Partner</span>
              </div>
          </div>

          <hr className="my-2.5 border-t border-black/20" />

          <div className="grid grid-cols-[50%,1px,auto] items-center gap-5">
            <div className="flex items-center justify-between">  
              <p className="text-[13px] font-semibold tracking-[-0.2px]">  
                <FormattedMessage id="actions" />  
              </p>  
              <div className="flex items-center space-x-2">  
                <Image src="/edit.svg" width="24" height="24" alt="Edit"  onClick={handleEditClick}/>  
                <Image src="/change.svg" width="24" height="24" alt="Change"/>  
                <Image src="/delete.svg" width="24" height="24" alt="Delete"/>  
              </div>  
            </div>
          </div>
          </div>
        </div>
      </div>
      {isUpdateProfileVisible && <UpdateProfile onClose={handleClose} />} 
    </>
  );
};

export default UserManagementTable;
