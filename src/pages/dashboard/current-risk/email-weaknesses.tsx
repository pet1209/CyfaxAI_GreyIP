import EmailProtectionResultsAllTable from "@/components/email-protection-results-all-table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import useDetailReport from "@/views/current-risk/hooks/useDetailReport";
import { FormattedMessage } from "react-intl";

const AttackSurface = () => {
  const { data } = useDetailReport();
  
  const tab = 
    {
        value: "email_weaknesses",
        content: (
            <>
              {data?.mxtoolbox_result.mxtoolbox_category && (
                <EmailProtectionResultsAllTable
                  data={data?.mxtoolbox_result.mxtoolbox_category}
                />
              )}
            </>
          ),
        title: "emailWeaknesses",
        seeAllLink: "#",
    }

  return (
    <>
    <div className="p-4 font-mulish xl:p-5">  
        <h2 className="text-sm font-semibold sm:text-2xl/[120%]">
            <FormattedMessage id="emailWeaknessesTableTitle" /> 
        </h2>  
    </div>
      <div className="p-3 sm:rounded-xl sm:p-5">

        <Tabs defaultValue={tab.value}>
            <TabsContent value={tab.value} key={tab.value} asChild>
                <div className="overflow-hidden rounded shadow-[0_4px_14px_2px_rgba(0,0,0,0.06)]">
                    {tab.content}
                </div>
            </TabsContent>
 
        </Tabs>
      </div>
    </>
  );
};

export default AttackSurface;