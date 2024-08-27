import { FormattedMessage } from "react-intl";  
import UpdateProfile from "@/components/user-profile-update";
import ChangePassword from "@/components/user-password-change";
import DeleteProfile from "@/components/user-profile-delete";
import {useState} from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import EditIcon from '@mui/icons-material/Edit';

interface User {  
  id: string;  
  email: string;  
  last_login: string;  
  created_at: string;  
  full_name: string;  
  phone: string;  
  is_active: boolean;  
  role_name: string;  
  group_name: string | null;  
}

interface UserManagementTableProps{
  users: any[];
}

const capitalizeWords = (s: string) => s.replace(/_/g, ' ')  
  .split(' ')  
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))  
  .join(' ');

const UserManagementTable: React.FC<UserManagementTableProps> = ({users}) => {  

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

  const displayFullNameOrEmailPart = (user: User) => user.full_name || user.email.split('@')[0];  
  const displayRoleName = (roleName: string) => capitalizeWords(roleName);  
  const displayGroupName = (groupName: string | null) => groupName ? capitalizeWords(groupName) : 'N/A';  


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
                <FormattedMessage id="phoneNumber" />  
              </th>  
              <th>  
                <FormattedMessage id="createdAt" />  
              </th>  
              <th>  
                <FormattedMessage id="orgName" />  
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
          {users && users.map((user, index) => (
            <tr 
              key={user.id} 
                className="h-20 border-b py-4 pl-6 font-mulish text-sm"  
            >  
                <td className="text-center">{index+1}</td>  
                <td className="text-center">  
                  <div className="flex items-start justify-start">  
                    <div   
                      style={{backgroundColor: "RGB(236, 229, 253)", color: "RGB(133, 91, 243)"}}   
                      className="rounded-md p-2 font-extrabold"  
                    >  
                      {user.full_name ? user.full_name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}  
                    </div>  
                    <div className="ml-2 flex flex-col text-left"> 
                      <span style={{fontWeight: "bold"}}>{displayFullNameOrEmailPart(user)}</span>  
                      <span>{user.email}</span>  
                    </div>  
                  </div> 
                </td>
                <td className="text-center">{user.phone}</td>  
                <td className="text-center">{new Date(user.created_at).toLocaleDateString()}</td>  
                <td className="text-center">{displayGroupName(user.group_name)}</td>  
                <td className="rounded-lg text-center">  
                  <div style={{backgroundColor: "RGB(248, 228, 229)", color: "RGB(220, 111, 144)"}} className="mx-auto rounded-md py-2 font-bold">  
                    {displayRoleName(user.role_name)}  
                  </div>  
                </td>
                <td className="text-center">  
                  <div className="mr-2 inline-block rounded-lg bg-blue-50 p-2">  
                    <EditIcon className="size-5 text-sky-600" onClick={handleEditClick}/>  
                  </div> 
                  <div className="mr-2 inline-block rounded-lg bg-blue-50 p-2">  
                    <RefreshIcon className="size-5 text-orange-400" onClick={handleChangeClick}/>  
                  </div> 
                  <div className="inline-block rounded-lg bg-blue-50 p-2">  
                    <DeleteIcon className="size-5 text-orange-700" onClick={handleDeleteClick}/>  
                  </div>  
                </td>
            </tr>  
          ))}
          </tbody>
        </table>  
        <div className="grid grid-cols-1 gap-3 font-mulish md:grid-cols-2 lg:hidden">
          {users && users.map((user, index) => (
          <div
            key={user.id} 
              className="rounded-lg p-3 shadow-[0_0_12px_rgba(0,0,0,0.12)]"
          >
            <div className="grid grid-cols-[repeat(4,auto)] items-center gap-5">  
              <div>  
                <p className="text-[13px] font-semibold tracking-[-0.2px]">  
                  <FormattedMessage id="#" />  
                </p>  
                <span className="mt-2.5 text-xs">{index+1}</span>  
              </div>  
              <div>  
                <p className="text-[13px] font-semibold tracking-[-0.2px]">  
                  <FormattedMessage id="user" />  
                </p>  
                <div className="flex items-center justify-center">  
                    <div   
                      style={{backgroundColor: "RGB(236, 229, 253)", color: "RGB(133, 91, 243)"}}   
                      className="rounded-md px-2 py-1"  
                    >  
                      {user.full_name ? user.full_name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}   
                    </div>  
                    <div className="ml-2 flex flex-col text-left text-xs"> 
                      <span>{displayFullNameOrEmailPart(user)}</span>  
                      <span>{user.email}</span>  
                    </div>  
                  </div> 
              </div>  
              <div>  
                <p className="text-[11px] font-semibold tracking-[-0.2px]">  
                  <FormattedMessage id="userName" />  
                </p>  
                <span className="mt-2.5 text-xs">{user.phone}</span>  
              </div>  
              <div>  
                <p className="text-[11px] font-semibold tracking-[-0.2px]">  
                  <FormattedMessage id="createdAt" />  
                </p>  
                <span className="mt-2.5 text-xs">{new Date(user.created_at).toLocaleDateString()}</span>  
              </div>  
            </div>

            <hr className="my-2.5 border-t border-black/20" />

            <div className="grid grid-cols-[50%,1px,auto] items-center gap-5">
              <div>
                <p className="text-center text-[13px] font-semibold tracking-[-0.2px]">
                    <FormattedMessage id="companyName" />
                </p>
                <span className="mt-2.5 block max-w-[150px] truncate text-center text-xs">
                  {displayGroupName(user.group_name)}
                </span>
              </div>
              <span className="h-3.5 border-r border-black/20"></span>
              <div>
                <p className="text-center text-[13px] font-semibold tracking-[-0.2px]">
                    <FormattedMessage id="role" />
                </p>
                <div style={{fontSize: "14px", width: "100px", backgroundColor: "RGB(248, 228, 229)", color: "RGB(220, 111, 144)"}} className="mx-auto rounded-md py-2 text-center font-bold">  
                  {displayRoleName(user.role_name)}  
                </div>  
              </div>
            </div>

            <hr className="my-2.5 border-t border-black/20" />

            <div className="flex items-center justify-between">  
              <p className="text-[13px] font-semibold tracking-[-0.2px]">  
                <FormattedMessage id="actions" />  
              </p>  
              <div className="flex items-center">  
                <div className="mr-2 inline-block rounded-lg bg-blue-50 p-2">  
                  <EditIcon className="size-5 text-sky-600" onClick={handleEditClick}/>  
                </div> 
                <div className="mr-2 inline-block rounded-lg bg-blue-50 p-2">  
                  <RefreshIcon className="size-5 text-orange-400" onClick={handleChangeClick}/>  
                </div> 
                <div className="inline-block rounded-lg bg-blue-50 p-2">  
                  <DeleteIcon className="size-5 text-orange-700" onClick={handleDeleteClick}/>  
                </div> 
              </div>  
            </div>
          </div>
          ))}
        </div>
      </div>
      {isUpdateProfileVisible && <UpdateProfile onClose={handleUpdateClose} />} 
      {isChangePasswordVisible && <ChangePassword onClose={handleChangeClose} />} 
      {isDeleteVisible && <DeleteProfile onClose={handleDeleteClose} />} 
    </>
  );
};

export default UserManagementTable;
