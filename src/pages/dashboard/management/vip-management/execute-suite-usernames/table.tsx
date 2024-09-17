import { TableData } from "@/types/api-responses/detail-report";  
import React from "react";  
import { FormattedMessage } from "react-intl";  

const EmailProtectionResultsAllTable = ({ data }: { data: TableData }) => {  
    const tableBody = data ?   
    data.map((row, i) => (  
      <tr key={i} className="[&>td]:border-b [&>td]:py-4 [&>td]:pl-6 [&>td]:font-mulish [&>td]:text-xs [&>td]:first:pl-[16px] sm:[&>td]:text-sm sm:[&>td]:first:pl-6">  
        <td>{row.time}</td>  
        <td>{row.credential_data}</td>  
        <td>{row.source}</td>  
      </tr>  
    )) :   
    // Render a message or an empty set if data is undefined  
    (<tr><td colSpan={3}>No data available</td></tr>); 
  return (  
    // <div className="w-full overflow-x-auto"> {/* Ensure the container takes full width */}  
      <table className="w-full min-w-full sm:min-w-[600px]"> {/* Adjusted for mobile and provided a minimum width for larger screens */}  
        <thead>  
          <tr className="bg-[#60605B]/[.07] [&>th]:py-3.5 [&>th]:pl-6 [&>th]:text-left [&>th]:font-mulish [&>th]:font-semibold [&>th]:first:pl-[16px] sm:[&>th]:first:pl-6">  
            <th>  
              <FormattedMessage id="breachTime" />  
            </th>  
            <th>  
              <FormattedMessage id="credentialsData" />  
            </th>  
            <th>  
              <FormattedMessage id="source" />  
            </th>  
          </tr>  
        </thead>  
        <tbody>  
          {tableBody}
        </tbody>  
      </table>  
    // </div>  
  );  
};  

export default EmailProtectionResultsAllTable;