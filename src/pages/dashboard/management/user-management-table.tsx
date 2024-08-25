import { FormattedMessage } from "react-intl";  
import Image from "next/image";
import UpdateProfile from "@/components/user-profile-update";
import ChangePassword from "@/components/user-password-change";
import DeleteProfile from "@/components/user-profile-delete";
import {useState} from "react";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import EditIcon from '@mui/icons-material/Edit';

const UserManagementTable = () => {  

  const [isUpdateProfileVisible, setIsUpdateProfileVisible] = useState(false);  
  const [isChangePasswordVisible, setIsChangePasswordVisible] = useState(false);  
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);  

  const handleEditClick = () => {  
    setIsUpdateProfileVisible(true);  
  };  
  const handleChangeClick = () => {
    setIsChangePasswordVisible(true);
  }
  const handleDeleteClick = () => {
    setIsDeleteVisible(true);
  }

  const handleUpdateClose = () => {  
    setIsUpdateProfileVisible(false);  
  }; 
  const handleChangeClose = () => {  
    setIsChangePasswordVisible(false);  
  }; 
  const handleDeleteClose = () => {  
    setIsDeleteVisible(false);  
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
                className="border-b py-4 pl-6 font-mulish text-sm h-20"  
            >  
                <td className="text-center">1</td>  
                <td className="text-center">  
                  <div className="flex items-center justify-center">  
                    <div   
                      style={{backgroundColor: "RGB(236, 229, 253)", color: "RGB(133, 91, 243)"}}   
                      className="font-extrabold bold-text py-2 px-2 rounded-md"  
                    >  
                      A  
                    </div>  
                    <div className="flex flex-col text-left ml-2"> 
                      <span style={{fontWeight: "bold"}}>AA</span>  
                      <span>danish.hex+1@gmail.com</span>  
                    </div>  
                  </div> 
                </td>
                <td className="text-center">Apple</td>  
                <td className="text-center">Jun 7,2022</td>  
                <td className="text-center">Apple</td>  
                <td className="text-center rounded-lg">  
                  <div style={{backgroundColor: "RGB(248, 228, 229)", color: "RGB(220, 111, 144)"}} className="font-bold mx-auto py-2 rounded-md">  
                    PARTNER  
                  </div>  
                </td>
                <td className="text-center">  
                  <div className="p-2 bg-blue-50 rounded-lg inline-block mr-2">  
                    <EditIcon className="text-sky-600 h-5 w-5" onClick={handleEditClick}/>  
                  </div> 
                  <div className="p-2 bg-blue-50 rounded-lg inline-block mr-2">  
                    <RefreshIcon className="text-orange-400 h-5 w-5" onClick={handleChangeClick}/>  
                  </div> 
                  <div className="p-2 bg-blue-50 rounded-lg inline-block">  
                    <DeleteIcon className="text-orange-700 h-5 w-5" onClick={handleDeleteClick}/>  
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
                <div className="flex items-center justify-center">  
                    <div   
                      style={{backgroundColor: "RGB(236, 229, 253)", color: "RGB(133, 91, 243)"}}   
                      className="py-1 px-2 rounded-md"  
                    >  
                      A  
                    </div>  
                    <div className="text-xs flex flex-col text-left ml-2"> 
                      <span>AA</span>  
                      <span>danish.hex+1@gmail.com</span>  
                    </div>  
                  </div> 
              </div>  
              <div>  
                <p className="text-[11px] font-semibold tracking-[-0.2px]">  
                  <FormattedMessage id="userName" />  
                </p>  
                <span className="mt-2.5 text-xs">Apple</span>  
              </div>  
              <div>  
                <p className="text-[11px] font-semibold tracking-[-0.2px]">  
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
                <div style={{fontSize: "14px", width: "100px", backgroundColor: "RGB(248, 228, 229)", color: "RGB(220, 111, 144)"}} className="text-center font-bold mx-auto py-2 rounded-md">  
                  PARTNER  
                </div>  
              </div>
            </div>

            <hr className="my-2.5 border-t border-black/20" />

            <div className="flex items-center justify-between">  
              <p className="text-[13px] font-semibold tracking-[-0.2px]">  
                <FormattedMessage id="actions" />  
              </p>  
              <div className="flex items-center">  
                <div className="p-2 bg-blue-50 rounded-lg inline-block mr-2">  
                  <EditIcon className="text-sky-600 h-5 w-5" onClick={handleEditClick}/>  
                </div> 
                <div className="p-2 bg-blue-50 rounded-lg inline-block mr-2">  
                  <RefreshIcon className="text-orange-400 h-5 w-5" onClick={handleChangeClick}/>  
                </div> 
                <div className="p-2 bg-blue-50 rounded-lg inline-block">  
                  <DeleteIcon className="text-orange-700 h-5 w-5" onClick={handleDeleteClick}/>  
                </div> 
              </div>  
            </div>
          </div>
        </div>
      </div>
      {isUpdateProfileVisible && <UpdateProfile onClose={handleUpdateClose} />} 
      {isChangePasswordVisible && <ChangePassword onClose={handleChangeClose} />} 
      {isDeleteVisible && <DeleteProfile onClose={handleDeleteClose} />} 
    </>
  );
};

export default UserManagementTable;
