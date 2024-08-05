import IconArrowCircleDown from "@/components/icons/icon-arrow-circle-down";
import IconTrash from "@/components/icons/icon-trash";
import { FormattedMessage } from "react-intl";

const AlertManagement = () => {
  return (
    <div className="p-4 font-mulish xl:p-5">
      <div className="rounded-lg pb-[132px] sm:rounded-xl xl:p-6 xl:shadow-[0_0_12px_rgba(0,0,0,0.12)]">
        <h2 className="text-2xl/[120%] font-semibold">
          <FormattedMessage id="setupEmailForAlerts" />
        </h2>

        <div className="mt-11">
          <div className="flex xl:gap-x-[189px]">
            <div>
              <div className="lg:flex lg:gap-x-[339px]">
                <div className="flex gap-x-12 sm:gap-x-[100px] lg:gap-x-[151px]">
                  <p className="text-xl font-semibold max-md:text-xs">
                    <FormattedMessage id="organizationName" />
                  </p>
                  <p className="text-xl font-semibold max-md:text-xs">
                    <FormattedMessage id="emailAddress" />
                  </p>
                </div>
                <p className="text-center text-xl font-semibold max-xl:hidden">
                  <FormattedMessage id="notification" />
                </p>
              </div>

              <div className="!mt-4 space-y-3 xl:space-y-4">
                {/* Single Row Start */}
                <div className="items-center xl:flex xl:gap-x-[189px]">
                  <div className="flex h-[76px] items-center rounded-lg border border-[#EAEAEA] px-3 max-xl:w-full xl:max-w-[634px] xl:pl-4 xl:pr-5">
                    <div className="flex items-center gap-x-6 lg:gap-x-[76px]">
                      <p className="font-inter font-medium max-md:text-xs">
                        Astound Commerce Corporation
                      </p>

                      <div className="flex items-center gap-x-7 lg:gap-x-10">
                        <p className="font-inter font-medium max-md:text-xs">
                          rob@greyip.com
                        </p>
                        <div className="flex items-center gap-x-2.5 lg:gap-x-8">
                          <button>
                            <IconTrash className="w-5 text-[#FF0000] lg:w-6" />
                          </button>
                          <button>
                            <IconArrowCircleDown className="w-5 text-accent lg:w-6" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="flex h-11 items-center rounded-lg bg-accent px-4 font-mulish font-semibold text-white max-xl:mt-4 xl:h-[53px] xl:text-xl">
                    <FormattedMessage id="alertType" />
                  </button>
                </div>
                {/* Single Row End */}

                {/* Single Row Start */}
                <div className="items-center xl:flex xl:gap-x-[189px]">
                  <div className="flex h-[76px] items-center rounded-lg border border-[#EAEAEA] px-3 max-xl:w-full xl:max-w-[634px] xl:pl-4 xl:pr-5">
                    <div className="flex items-center gap-x-6 lg:gap-x-[76px]">
                      <p className="font-inter font-medium max-md:text-xs">
                        Astound Commerce Corporation
                      </p>

                      <div className="flex items-center gap-x-7 lg:gap-x-10">
                        <p className="font-inter font-medium max-md:text-xs">
                          rob@greyip.com
                        </p>
                        <div className="flex items-center gap-x-2.5 lg:gap-x-8">
                          <button>
                            <IconTrash className="w-5 text-[#FF0000] lg:w-6" />
                          </button>
                          <button>
                            <IconArrowCircleDown className="w-5 text-accent lg:w-6" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="flex h-11 items-center rounded-lg bg-accent px-4 font-mulish font-semibold text-white max-xl:mt-4 xl:h-[53px] xl:text-xl">
                    <FormattedMessage id="alertType" />
                  </button>
                </div>
                {/* Single Row End */}

                <div className="mt-9 flex justify-end xl:hidden">
                  <button className="flex h-11 items-center rounded-lg bg-accent px-4 font-mulish font-semibold text-white max-xl:mt-4 xl:h-[53px] xl:text-xl">
                    <FormattedMessage id="submit" />
                  </button>
                </div>
              </div>
            </div>

            <div>
              <div className="mt-7"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertManagement;
