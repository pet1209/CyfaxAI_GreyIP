import routes from "@/constants/routes";
import { isValidDomainOrEmail } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FormattedMessage, useIntl } from "react-intl";
import svg2 from "../../../public/activity.svg";
import svg1 from "../../../public/finger-cricle.svg";
import BodyCard from "./components/BodyCard";

const Home = () => {
  const intl = useIntl();
  const [errorMessage, setErrorMessage] = useState<null | string>(null);

  const router = useRouter();

  return (
    <div className="h-[calc(100vh-43px)] space-y-5 overflow-y-auto bg-white md:grow md:space-y-8 lg:h-[calc(100vh-80px)] lg:space-y-10">
      <div className="mx-auto px-5 lg:px-10 xl:w-[1021px] xl:px-0">
        <h1 className="my-5 text-center font-mulish text-base font-semibold text-[#000000] md:text-2xl lg:my-9 lg:text-[40px] lg:font-bold lg:leading-[60px]">
          <span className="max-md:hidden">
            <FormattedMessage id="homeHeroTitle" />
          </span>
          <span className="md:hidden">
            <FormattedMessage id="homeHeroTitleMobile" />
          </span>
        </h1>
        <p className="my-5 text-center font-mulish text-xs font-normal text-[#000000] md:text-base lg:text-2xl lg:font-medium lg:leading-[36px]">
          <FormattedMessage id="homeHeroDescription" />
        </p>

        <form
          className="my-8 lg:my-16"
          onSubmit={(e) => {
            e.preventDefault();
            setErrorMessage(null);

            const formData = new FormData(e.currentTarget);
            const domainOrEmail = formData.get("domainOrEmail") as string;
            if (!domainOrEmail) {
              setErrorMessage("Please enter a domain or email address");
              return;
            }

            if (!isValidDomainOrEmail(domainOrEmail)) {
              setErrorMessage("Invalid domain or email address");
              return;
            }
            router.push(routes.publicReportResults(domainOrEmail));
          }}
        >
          <div className="mx-auto flex h-12 w-full overflow-hidden rounded-xl border border-[#93328E] bg-white md:h-16 md:rounded-lg md:border-[#93328E] lg:h-full lg:rounded-l-xl">
            <input
              className="grow border-none bg-transparent px-5 font-mulish text-[10px] font-normal text-[#000000] outline-none placeholder:font-mulish placeholder:text-gray-700 focus:outline-none md:text-lg lg:h-[94px] lg:w-[763px] lg:text-2xl lg:font-medium"
              type="search"
              name="domainOrEmail"
              placeholder={intl.formatMessage({ id: "inputPlaceholder" })}
            />
            <button
              type="submit"
              className="flex flex-none flex-row items-center justify-center gap-x-2 rounded-r-xl bg-transparent md:rounded-r-[7px] md:text-white lg:h-[94px] lg:w-[258px] lg:bg-[#93328E]"
            >
              <CiSearch className="mr-4 size-6 text-gray-800 lg:pr-0 lg:text-white" />
              <p className="hidden font-mulish text-sm font-medium lg:block lg:text-2xl">
                <FormattedMessage id="search" />
              </p>
            </button>
          </div>
          {errorMessage && <p className="mt-2 text-red-500">{errorMessage}</p>}
        </form>

        <div className="my-9 grid grid-cols-1 gap-y-5 md:grid-cols-2 md:gap-x-4 lg:gap-x-8 lg:gap-y-0">
          <BodyCard heading="homeCard1Title" details="homeCard1Description">
            <Image
              src={svg1}
              className="mx-auto size-6 md:size-10 lg:size-20"
              alt="What Does Cyfax's  Comprehensive Security Scan Cover?"
            ></Image>
          </BodyCard>

          <BodyCard heading="homeCard2Title" details="homeCard2Description">
            <Image
              src={svg2}
              className="mx-auto size-6 md:size-10 lg:size-20"
              alt="Mitigate Risks Across All Fronts"
            ></Image>
          </BodyCard>
        </div>
      </div>
    </div>
  );
};

export default Home;
