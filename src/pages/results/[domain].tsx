import { getPublicReportQueryOptions } from "@/cyfax-api-client/queries";
import Results from "@/views/results";
import {
  DehydratedState,
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { GetServerSideProps } from "next";

const ResultsPage = ({
  dehydratedState,
}: {
  dehydratedState: DehydratedState;
}) => {
  return (
    <HydrationBoundary state={dehydratedState}>
      <Results />
    </HydrationBoundary>
  );
};

export default ResultsPage;

// export const getServerSideProps = (async (context) => {
//   const queryClient = new QueryClient();

//   await queryClient.prefetchQuery(
//     getPublicReportQueryOptions({
//       domain: context.query.domain as string,
//     }),
//   );

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   };
// }) satisfies GetServerSideProps;
