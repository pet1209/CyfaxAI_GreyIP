import { FormattedMessage } from "react-intl";  
import EditOrg from "@/components/edit-organization";
import ChangePassword from "@/components/user-password-change";
import DeleteGroup from "@/components/group-delete";
import {useState} from "react";

interface OrgManagementTableProps {  
  orgGroups: any[];  // Using any for simplicity, consider defining a more precise type  
}

interface Group {  
  id: string;
  name: string;  
  authorized_domains: string[];  
  admin_user: string;  
  group_kind: 'client' | 'partner';
} 

const OrgManagementTable: React.FC<OrgManagementTableProps> = ({orgGroups}) => {  
  
  const formatDate = (dateString: string) => {  
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };  
    return new Date(dateString).toLocaleDateString(undefined, options);  
  }; 

  const [isEditOrgVisible, setIsEditOrgVisible] = useState(false);  
  const [isChangePasswordVisible, setIsChangePasswordVisible] = useState(false);  
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
  const handleChangeClose = () => {  
    setIsChangePasswordVisible(false);  
  }; 
  const groupDeleteClick = (groupId: string) => {  
    setSelectedGroup(orgGroups.find(group => group.id === groupId) || null);
    setIsDeleteVisible(true);  
  }; 
  const groupDeleteClose = () => {  
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
                <FormattedMessage id="companyName" />  
              </th>  
              <th>  
                <FormattedMessage id="authorizedDomains" />  
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
          {orgGroups && orgGroups.map((group, index) => (  
              <tr className="h-20 border-b py-4 pl-6 font-mulish text-sm" key={group.id}>  
                <td className="text-center">{index + 1}</td>  
                <td className="text-center">{group.name}</td>  
                <td className="text-center">{group.authorized_domains.join(' | ')}</td>  
                <td className="text-center">{formatDate(group.created_at)}</td>  
                <td className="text-center">{group.admin_user}</td>  
                <td className="rounded-lg text-center">  
                  <div   
                    style={{ fontSize: '12px', backgroundColor: "RGB(248, 228, 229)", height:"2rem", color: "RGB(220, 111, 144)" }}   
                    className="mx-auto rounded-md py-1.5 font-bold"  
                  >  
                    {group.group_kind.toUpperCase()}  
                  </div>  
                </td>  
                <td className="text-center">  
                    <button   
                        style={{fontSize: '12px', width: '55px', height: '2rem', paddingLeft: '4px', paddingRight: '4px'}}   
                        className="rounded-lg bg-accent text-white duration-300 hover:opacity-90"   
                        onClick={handleEditClick(group)}
                    >   
                        <FormattedMessage id="edit" />   
                    </button>  
                    <button   
                        style={{fontSize: '12px', width: '55px', height: '2rem', paddingLeft: '4px', paddingRight: '4px'}}   
                        className="ml-2 rounded-lg bg-accent text-white duration-300 hover:opacity-90"   
                        onClick={() => groupDeleteClick(group.id)}
                    >   
                        <FormattedMessage id="delete" />   
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
            <div className="grid grid-cols-[repeat(3,auto)] items-center gap-5">  
              <div>  
                <p className="text-[11px] font-semibold tracking-[-0.2px]">  
                  <FormattedMessage id="#" />  
                </p>  
                <span className="mt-2.5 text-xs">{index + 1}</span>  
              </div>   
              <div>  
                <p className="text-[11px] font-semibold tracking-[-0.2px]">  
                  <FormattedMessage id="companyName" />  
                </p>  
                <span className="mt-2.5 text-xs">{group.name}</span>  
              </div>  
              <div>  
                <p className="text-[11px] font-semibold tracking-[-0.2px]">  
                  <FormattedMessage id="authorizedDomains" />  
                </p>  
                <span className="mt-2.5 text-xs">{group.authorized_domains.join(' | ')}</span>  
              </div> 
            </div>

            <hr className="my-2.5 border-t border-black/20" />

            <div className="grid grid-cols-3 items-center gap-5">
              <div>  
                <p className="text-[11px] font-semibold tracking-[-0.2px]">  
                  <FormattedMessage id="createdAt" />  
                </p>  
                <span className="mt-2.5 text-xs">{formatDate(group.created_at)}</span>  
              </div> 
              <div className="col-span-1 grid">
                <p className="text-center  text-[11px] tracking-[-0.2px]">
                    <FormattedMessage id="adminEmail" />
                </p>
                <span className="mt-2.5 text-center text-xs">
                  {group.admin_user}
                </span>
              </div>
              <div className="col-span-1 grid">
                <p className="text-center text-[11px] tracking-[-0.2px]">
                    <FormattedMessage id="role" />
                </p>
                <div style={{fontSize: "8px", width: "45px", height: '1.5rem', backgroundColor: "RGB(248, 228, 229)", color: "RGB(220, 111, 144)"}} className="mx-auto rounded-md py-1.5 text-center font-bold">  
                  {group.group_kind.toUpperCase()}  
                </div>  
              </div>
            </div>
            <hr className="my-2.5 border-t border-black/20" />
            <div className="flex w-full items-center justify-between gap-5">  
              <p className="text-center text-[11px] tracking-[-0.2px]">  
                  <FormattedMessage id="actions" />  
              </p>  

              <div className="flex items-center">  
                  <button   
                      style={{fontSize: '8px', width: '45px', height: '1.5rem', paddingLeft: '4px', paddingRight: '4px'}}   
                      className="rounded-lg bg-accent text-white duration-300 hover:opacity-90"   
                      onClick={handleEditClick(group)}
                  >   
                      <FormattedMessage id="edit" />   
                  </button>  
                  <button   
                      style={{fontSize: '8px', width: '45px', height: '1.5rem', paddingLeft: '4px', paddingRight: '4px'}}   
                      className="ml-2 rounded-lg bg-accent text-white duration-300 hover:opacity-90"   
                      onClick={()=>groupDeleteClick(group.id)}
                  >   
                      <FormattedMessage id="delete" />   
                  </button>  
              </div>  
            </div>
            
          </div>
          ))}
        </div>
      </div>
      {isEditOrgVisible && selectedGroup && <EditOrg onClose={handleEditClose} group={selectedGroup} role={selectedGroup.group_kind.toUpperCase() as 'CLIENT' | 'PARTNER'} groupId={selectedGroup.id}/>} 
      {isChangePasswordVisible && <ChangePassword onClose={handleChangeClose} />} 
      {isDeleteVisible && selectedGroup && (  
        <DeleteGroup onClose={groupDeleteClose} groupId={selectedGroup.id} />  
      )} 
    </>
  );
};

export default OrgManagementTable;
