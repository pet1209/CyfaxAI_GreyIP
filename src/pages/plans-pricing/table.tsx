import { PriceData } from "@/types/api-responses/detail-report";  
import React from "react";  
import { FormattedMessage } from "react-intl";  

const PlansPricingAllTable = ({  
  data,  
  selectedPlan  
}: {  
  data: PriceData;  
  selectedPlan: string;  
}) => {  
  const tableBody = data ? (  
    data.map((row, i) => (  
      <tr  
        key={i}  
        className="bg-[#09171B] leading-[28px] text-white [&>td]:border-b [&>td]:py-4 [&>td]:pl-6 [&>td]:font-mulish [&>td]:text-xs [&>td]:first:pl-[16px] sm:[&>td]:text-sm sm:[&>td]:first:pl-6"  
      >  
        <td className="text-start">{row.feature}</td>  
        <td  
          className={`text-start ${  
            selectedPlan !== "essentials" ? "hidden md:table-cell" : ""  
          }`}  
        >  
          {row.essentials}  
        </td>  
        <td  
          className={`text-start ${  
            selectedPlan !== "professional" ? "hidden md:table-cell" : ""  
          }`}  
        >  
          {row.professional}  
        </td>  
        <td  
          className={`text-start ${  
            selectedPlan !== "enterprise" ? "hidden md:table-cell" : ""  
          }`}  
        >  
          {row.enterprise}  
        </td>  
      </tr>  
    ))  
  ) : (  
    <tr>  
      <td colSpan={3}>No data available</td>  
    </tr>  
  );  

  return (  
    <div className="overflow-hidden rounded-3xl">  
      <table className="w-full min-w-full">  
        <thead>  
          <tr className="bg-[#720072] leading-[18.75px] text-white [&>th]:py-3.5 [&>th]:pl-6 [&>th]:text-left [&>th]:font-mulish [&>th]:font-semibold [&>th]:first:pl-[16px] sm:[&>th]:first:pl-6"
          >  
            <th>  
              <FormattedMessage id="feature" />  
            </th>  
            <th className={`${selectedPlan !== "essentials" ? "hidden md:table-cell" : ""}`}>  
              <FormattedMessage id="essentials" />  
            </th>  
            <th className={`${selectedPlan !== "professional" ? "hidden md:table-cell" : ""}`}>  
              <FormattedMessage id="professional" />  
            </th>  
            <th className={`${selectedPlan !== "enterprise" ? "hidden md:table-cell" : ""}`}>  
              <FormattedMessage id="enterprise" />  
            </th>  
          </tr>  
        </thead>  
        <tbody>{tableBody}</tbody>  
      </table>  
    </div>  
  );  
};  

export default PlansPricingAllTable;