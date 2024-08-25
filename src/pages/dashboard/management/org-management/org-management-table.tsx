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

const OrgManagementTable = () => {  

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
                <FormattedMessage id="org" />  
              </th>  
              <th>  
                <FormattedMessage id="companyName" />  
              </th>  
              <th>  
                <FormattedMessage id="createdAt" />  
              </th>  
              <th>  
                <FormattedMessage id="adminEmail" />  
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
                <td className="text-center">Apple</td>  
                <td className="text-center">Jun 7,2022</td>  
                <td className="text-center">Apple</td>  
                <td className="text-center rounded-lg">  
                  <div style={{backgroundColor: "RGB(248, 228, 229)", height:"2.2rem", color: "RGB(220, 111, 144)"}} className="font-bold mx-auto py-2 rounded-md">  
                    PARTNER  
                  </div>  
                </td>
                <td className="text-center">  
                    <button   
                        style={{fontSize: '12px', width: '55px', height: '2rem', paddingLeft: '4px', paddingRight: '4px'}}   
                        className="rounded-lg bg-accent text-white duration-300 hover:opacity-90"   
                    >   
                        <FormattedMessage id="edit" />   
                    </button>  
                    <button   
                        style={{fontSize: '12px', width: '55px', height: '2rem', paddingLeft: '4px', paddingRight: '4px'}}   
                        className="ml-2 rounded-lg bg-accent text-white duration-300 hover:opacity-90"   
                    >   
                        <FormattedMessage id="delete" />   
                    </button>  
                </td>
            </tr>  
          </tbody>
        </table>  
        <div className="grid grid-cols-1 gap-3 font-mulish md:grid-cols-2 lg:hidden">
          <div
              className="rounded-lg p-3 shadow-[0_0_12px_rgba(0,0,0,0.12)]"
          >
            <div className="grid grid-cols-[repeat(3,auto)] items-center gap-5">  
              <div>  
                <p className="text-[11px] font-semibold tracking-[-0.2px]">  
                  <FormattedMessage id="org" />  
                </p>  
                <span className="mt-2.5 text-xs">1</span>  
              </div>   
              <div>  
                <p className="text-[11px] font-semibold tracking-[-0.2px]">  
                  <FormattedMessage id="companyName" />  
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

            <div className="grid grid-cols-3 items-center gap-5">
              <div className="grid col-span-1">
                <p className="text-center  text-[11px] tracking-[-0.2px]">
                    <FormattedMessage id="adminEmail" />
                </p>
                <span className="text-center mt-2.5 text-xs">
                    Apple
                </span>
              </div>
              <div className="grid col-span-1">
                <p className="text-center text-[11px] tracking-[-0.2px]">
                    <FormattedMessage id="role" />
                </p>
                <div style={{fontSize: "12px", width: "80px", height: '1.5rem', backgroundColor: "RGB(248, 228, 229)", color: "RGB(220, 111, 144)"}} className="text-center font-bold mx-auto py-1 rounded-md">  
                  PARTNER  
                </div>  
              </div>
              <div className="grid col-span-1">  
                <p className="text-center text-[11px] tracking-[-0.2px]">  
                    <FormattedMessage id="actions" />  
                </p>  
                
                <div className="flex items-center">  
                    <button   
                        style={{fontSize: '8px', width: '45px', height: '1.5rem', paddingLeft: '4px', paddingRight: '4px'}}   
                        className="rounded-lg bg-accent text-white duration-300 hover:opacity-90"   
                    >   
                        <FormattedMessage id="edit" />   
                    </button>  
                    <button   
                        style={{fontSize: '8px', width: '45px', height: '1.5rem', paddingLeft: '4px', paddingRight: '4px'}}   
                        className="ml-2 rounded-lg bg-accent text-white duration-300 hover:opacity-90"   
                    >   
                        <FormattedMessage id="delete" />   
                    </button>  
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

export default OrgManagementTable;
