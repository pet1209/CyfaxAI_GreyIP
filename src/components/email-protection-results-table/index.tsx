import { MXToolboxCategory } from "@/types/api-responses/detail-report";
import { useMemo } from "react";
import { FormattedMessage } from "react-intl";

function convertSecurityReport(report: MXToolboxCategory) {
  const resultArray: {
    securityAspect: string;
    host: string;
    result: string;
  }[] = [];

  for (const aspect in report) {
    if (report.hasOwnProperty(aspect)) {
      report[aspect].forEach((item: any) => {
        resultArray.push({
          securityAspect: aspect,
          host: item.host,
          result: item.result,
        });
      });
    }
  }

  return resultArray;
}

const EmailProtectionResultsTable = ({ data }: { data: MXToolboxCategory }) => {
  const rows = useMemo(() => convertSecurityReport(data), [data]);
  return (
    <>
      <table className="w-full">
        <thead>
          <tr className="bg-[#60605B]/[.07] [&>th]:py-3.5 [&>th]:pl-6 [&>th]:text-left [&>th]:font-mulish [&>th]:font-semibold">
            <th>
              <FormattedMessage id="securityAspect" />
            </th>
            <th>
              <FormattedMessage id="host" />
            </th>
            <th>
              <FormattedMessage id="explanation" />
            </th>
          </tr>
        </thead>
        <tbody>
          {rows?.map((row, i) => {
            return (
              <tr
                key={i}
                className="[&>td]:border-b [&>td]:py-4 [&>td]:pl-6 [&>td]:font-mulish [&>td]:text-sm"
              >
                <td>{row.securityAspect}</td>
                <td>{row.host}</td>
                <td>{row.result}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default EmailProtectionResultsTable;
