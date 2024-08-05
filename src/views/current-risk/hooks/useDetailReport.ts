import { getDetailReportQueryOptions } from "@/cyfax-api-client/queries";
import useAuthUserAccount from "@/hooks/useAuthUserAccount";
import { useQuery } from "@tanstack/react-query";
import { atom, useAtom } from "jotai";
import { useEffect } from "react";

const domainAtom = atom<null | string>();
// diazyourman.com

const useDetailReport = () => {
  const [domain, setDomain] = useAtom(domainAtom);
  const { data, isAdmin } = useAuthUserAccount();

  const getDetailReportQuery = useQuery({
    ...getDetailReportQueryOptions({
      domain: domain || undefined,
    }),
    enabled: !!data && !!domain,
  });

  const isOpenDomainModal = isAdmin && !domain;

  const queryData = getDetailReportQuery.data?.data;

  const chartData = queryData?.chart || [];

  const totalSecurityIssuesFound =
    (queryData?.combolist_result.employee_credential_leak.count ?? 0) +
    (queryData?.combolist_result.stealer_logs_for_sale.count ?? 0) +
    (queryData?.combolist_result.stealer_logs.count ?? 0) +
    (queryData?.combolist_result.hacker_dark_web_mentions.count ?? 0) +
    (queryData?.dnstwist_result.count ?? 0) +
    (queryData?.mxtoolbox_result.count ?? 0) +
    (queryData?.vulnscan_result.count ?? 0);

  useEffect(() => {
    if (!data) {
      setDomain(null);
      return;
    }

    if (!isAdmin) {
      setDomain(data?.email.split("@")[1]);
    }
  }, [data, isAdmin, setDomain]);

  return {
    getDetailReportQuery,
    data: queryData,
    isOpenDomainModal,
    setDomain,
    domain,
    chartData,
    totalSecurityIssuesFound,
  };
};

export default useDetailReport;
