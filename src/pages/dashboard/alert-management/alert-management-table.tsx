import { FormattedMessage } from "react-intl";  
import EditOrg from "@/components/edit-organization";
import DeleteGroup from "@/components/group-delete";
import {useState} from "react";
import Router from 'next/router';  
import routes from "@/constants/routes";

interface OrgManagementTableProps {  
  orgGroups: any[];  
  onUpdateGroup: (updateGroup: any)=>void;
  onDeleteGroup: (groupId: string) => void;
}

interface Group {  
  id: string;
  name: string;  
  authorized_domains: string[];  
  admin_user: string;  
  group_kind: 'client' | 'partner';
  permissions: string[];
  
} 

const AlertManagementTable: React.FC<OrgManagementTableProps> = ({orgGroups, onUpdateGroup, onDeleteGroup}) => {  
  
  const formatDate = (dateString: string) => {  
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };  
    return new Date(dateString).toLocaleDateString(undefined, options);  
  }; 

  const [isEditOrgVisible, setIsEditOrgVisible] = useState(false);  
  const [isDeleteVisible, setIsDeleteVisible] = useState(false);  
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);  

  const handleEditClick = (group: Group) => (event: React.MouseEvent<HTMLButtonElement>) => {  
    event.preventDefault();  
    setSelectedGroup(group);  
    setIsEditOrgVisible(true);  
  };

  const handleEditClose = () => {  
    setIsEditOrgVisible(false);  
  };  
  const groupDeleteClick = (groupId: string) => {  
    setSelectedGroup(orgGroups.find(group => group.id === groupId) || null);
    setIsDeleteVisible(true);  
  }; 
  const groupDeleteClose = () => {  
    setIsDeleteVisible(false);  
  }; 
  const handleFieldClick = () => {
    Router.push(routes.userManagement)
  }

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
                <FormattedMessage id="companyName" />  
              </th>  
              <th>  
                <FormattedMessage id="domain" />  
              </th>  
              <th>  
                <FormattedMessage id="ownerEmail" />  
              </th>  
              <th style={{textAlign: 'center'}}>  
                <FormattedMessage id="notification" />  
              </th>  
            </tr>  
          </thead>  
          <tbody>  
          {orgGroups && orgGroups.map((group, index) => (  
              <tr className="h-20 border-b py-4 pl-6 font-mulish text-sm" key={group.id}>  
                <td className="text-center">  
                  <button onClick={handleFieldClick} className="size-full">{index + 1}</button>  
                </td>  
                <td className="text-center">  
                  <button onClick={handleFieldClick} className="size-full">{group.name}</button>  
                </td>  
                <td className="text-center">  
                  <button onClick={handleFieldClick} className="size-full">{group.authorized_domains.join(' | ')}</button>  
                </td>  
                <td className="text-center">  
                  <button onClick={handleFieldClick} className="size-full">{group.admin_user}</button>  
                </td> 
                <td className="justify-center text-center">  
                    <button   
                        style={{fontSize: '14px', width: '100px', height: '2rem'}}   
                        className="rounded-lg bg-accent text-white duration-300 hover:opacity-90"   
                        onClick={handleEditClick(group)}
                    >   
                        <FormattedMessage id="alertType" />   
                    </button>  
                </td>
            </tr>  
          ))}
          </tbody>
        </table>  
        <div className="grid grid-cols-1 gap-3 font-mulish md:grid-cols-2 lg:hidden">
          {orgGroups && orgGroups.map((group, index) => ( 
          <div
              className="rounded-lg p-3 shadow-[0_0_12px_rgba(0,0,0,0.12)]"
              key={group.id}
          >
            <div className="grid grid-cols-[repeat(2,auto)] items-center gap-5">  
              <div>  
                <p className="text-[11px] font-semibold tracking-[-0.2px]">  
                  <FormattedMessage id="#" />  
                </p>  
                <span className="mt-2.5 text-xs">  
                  <button onClick={handleFieldClick}>{index + 1}</button>  
                </span>  
              </div>   
              <div>  
                <p className="text-[11px] font-semibold tracking-[-0.2px]">  
                  <FormattedMessage id="companyName" />  
                </p>  
                <span className="mt-2.5 text-xs">  
                  <button onClick={handleFieldClick}>{group.name}</button>  
                </span>  
              </div>    
            </div>  

            <hr className="my-2.5 border-t border-black/20" />  

            <div className="grid grid-cols-2 items-center gap-5">  
              <div>  
                <p className="text-[11px] font-semibold tracking-[-0.2px]">  
                  <FormattedMessage id="authorizedDomains" />  
                </p>  
                <span className="mt-2.5 text-xs">  
                  <button onClick={handleFieldClick}>{group.authorized_domains.join(' | ')}</button>  
                </span>  
              </div>  
              <div className="col-span-1 grid">  
                <p className="text-center  text-[11px] tracking-[-0.2px]">  
                    <FormattedMessage id="adminEmail" />  
                </p>  
                <span className="mt-2.5 text-center text-xs">  
                  <button onClick={handleFieldClick}>{group.admin_user}</button>  
                </span>  
              </div>  
            </div>  
            <hr className="my-2.5 border-t border-black/20" />  
            <div className="flex w-full items-center justify-between gap-5">  
              <p className="text-center text-[11px] tracking-[-0.2px]">  
                  <FormattedMessage id="actions" />  
              </p>  

              <div className="flex items-center">  
                <button   
                    style={{fontSize: '12px', width: '100px', height: '1.8rem'}}   
                    className="rounded-lg bg-accent text-white duration-300 hover:opacity-90"   
                    onClick={handleEditClick(group)}
                >   
                    <FormattedMessage id="alertType" />   
                </button>  
              </div>  
            </div>  
            
          </div>
          ))}
        </div>
      </div>
      {isEditOrgVisible && selectedGroup && <EditOrg 
        onClose={handleEditClose} 
        group={selectedGroup} 
        role={selectedGroup.group_kind.toUpperCase() as 'CLIENT' | 'PARTNER'} 
        groupId={selectedGroup.id}
        onUpdate={onUpdateGroup}
      />} 
      {isDeleteVisible && selectedGroup && (  
        <DeleteGroup 
          onClose={groupDeleteClose} 
          groupId={selectedGroup.id} 
          onDelete={onDeleteGroup}
        />  
      )} 
    </>
  );
};

export default AlertManagementTable;
