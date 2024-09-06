import { FormattedMessage } from "react-intl";  

const AlertManagementTable = () => {  

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
              <tr className="h-20 border-b py-4 pl-6 font-mulish text-sm">  
                <td className="text-center">  
                  <button className="size-full">asdfa</button>  
                </td>  
                <td className="text-center">  
                  <button className="size-full">asfsdf</button>  
                </td>  
                <td className="text-center">  
                  <button className="size-full">gadasfd</button>  
                </td>  
                <td className="text-center">  
                  <button className="size-full">asdf</button>  
                </td> 
                <td className="justify-center text-center">  
                    <button   
                        style={{fontSize: '14px', width: '100px', height: '2rem'}}   
                        className="rounded-lg bg-accent text-white duration-300 hover:opacity-90"  
                    >   
                        <FormattedMessage id="alertType" />   
                    </button>  
                </td>
            </tr>  
          </tbody>
        </table>  
        <div className="grid grid-cols-1 gap-3 font-mulish md:grid-cols-2 lg:hidden">
          <div
              className="rounded-lg p-3 shadow-[0_0_12px_rgba(0,0,0,0.12)]"
          >
            <div className="grid grid-cols-[repeat(2,auto)] items-center gap-5">  
              <div>  
                <p className="text-[11px] font-semibold tracking-[-0.2px]">  
                  <FormattedMessage id="#" />  
                </p>  
                <span className="mt-2.5 text-xs">  
                  <button>sfa</button>  
                </span>  
              </div>   
              <div>  
                <p className="text-[11px] font-semibold tracking-[-0.2px]">  
                  <FormattedMessage id="companyName" />  
                </p>  
                <span className="mt-2.5 text-xs">  
                  <button>asdf</button>  
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
                  <button>gdfg</button>  
                </span>  
              </div>  
              <div className="col-span-1 grid">  
                <p className="text-center  text-[11px] tracking-[-0.2px]">  
                    <FormattedMessage id="adminEmail" />  
                </p>  
                <span className="mt-2.5 text-center text-xs">  
                  <button>asdf</button>  
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
                >   
                    <FormattedMessage id="alertType" />   
                </button>  
              </div>  
            </div>  
            
          </div>
        </div>
      </div>
    </>
  );
};

export default AlertManagementTable;
