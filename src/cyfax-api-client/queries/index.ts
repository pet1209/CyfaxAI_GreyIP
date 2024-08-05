import cyfaxApiClient from "@/cyfax-api-client";
import { DetailReportAPIResponse } from "@/types/api-responses/detail-report";
import { DomainPublicReportApiResponse } from "@/types/api-responses/domain-public-report";
import { AuthUserAccount } from "@/types/api-responses/user-account";
import axios from "axios";

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

export const getAuthUserAccountQueryOptions = () => {
  return {
    queryKey: ["get-auth-user-account"],
    queryFn: () =>
      cyfaxApiClient
        .get<{ data: AuthUserAccount }>("/account/")
        .then((res) => res.data),
  };
};

export const getAuthTokensQueryOptions = () => {
  return {
    queryKey: ["get-auth-tokens"],
    queryFn: () =>
      axios
        .get<{ access_token: string; refresh_token: string }>("/api/get-tokens")
        .then((res) => res.data),
  };
};

export const getPermissionsQueryOptions = () => {
  return {
    queryKey: ["get-permissions"],
    queryFn: () =>
      cyfaxApiClient
        .get<PermissionsAPIResponse>("/permissions/")
        .then((res) => res.data),
  };
};

export const getDetailReportQueryOptions = ({
  domain,
}: { domain?: string } = {}) => {
  return {
    queryKey: ["get-detail-report", domain],
    queryFn: () =>
      cyfaxApiClient
        .post<DetailReportAPIResponse>("/detail_report/", {
          domain,
        })
        .then((res) => res.data),
  };
};

export const getPDFReportsQueryOptions = () => {
  return {
    queryKey: ["get-pdf-report"],
    queryFn: () =>
      cyfaxApiClient
        .get<{
          data: {
            file_path: string;
            domain_name: string;
            email: string;
            timestamp: number;
          }[];
        }>("/pdf_report/")
        .then((res) => res.data),
  };
};
