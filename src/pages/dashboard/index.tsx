import CurrentRisk from "@/views/current-risk";

const DashboardPage = () => {
  return (
    <>
      <CurrentRisk />
    </>
  );
  // return (
  //   <div className="flex flex-col items-center gap-5 px-5 py-40 text-center">
  //     <FormattedMessage id="dashboardPageUnderDevelopment" />
  //     <Link
  //       href={routes.currentRisk}
  //       className="rounded-md bg-accent px-5 py-2.5 text-white"
  //     >
  //       <FormattedMessage id="viewCurrentRisk" />
  //     </Link>
  //   </div>
  // );
};

export default DashboardPage;