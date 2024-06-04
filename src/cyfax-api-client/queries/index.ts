import cyfaxApiClient from "@/cyfax-api-client";
import { DomainPublicReportApiResponse } from "@/types/api-responses/domain-public-report";

export const getPublicReportQueryOptions = ({ domain }: { domain: string }) => {
  return {
    queryKey: ["get-public-report", domain],
    queryFn: () =>
      cyfaxApiClient
        .post<DomainPublicReportApiResponse>("/public_report/", {
          domain,
        })
        .then((res) => res.data),
    enabled: !!domain,
  };
};
