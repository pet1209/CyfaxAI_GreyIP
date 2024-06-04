import cyfaxApiClient from "@/cyfax-api-client";

export const getRequestReportMutationOptions = () => {
  return {
    mutationKey: ["request-report"],
    mutationFn: (data: { email: string }) =>
      cyfaxApiClient.post<{ data: string }>("/request_report/", data),
  };
};
