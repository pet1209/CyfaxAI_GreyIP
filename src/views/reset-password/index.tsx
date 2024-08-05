import IconArrowLeft from "@/components/icons/icon-arrow-left";
import IconSms from "@/components/icons/icon-sms";
import { FormattedMessage, useIntl } from "react-intl";

const ResetPassword = () => {
  const intl = useIntl();
  return (
    <div className="p-5 font-inter md:py-10 lg:py-[233px]">
      <div className="mx-auto max-w-[642px]">
        <div className="flex items-center gap-x-4">
          <IconArrowLeft className="max-w-6" />
          <p className="font-semibold md:text-xl md:font-medium">
            <FormattedMessage id="goBack" />
          </p>
        </div>
        <h2 className="mb-9 mt-6 text-[28px]/[150%] font-medium">
          <FormattedMessage id="resetPasswordTitle" />
        </h2>
        <div className="relative">
          <input
            type="email"
            className="h-12 w-full rounded-[10px] bg-black/10 px-5 outline-none backdrop-blur-xl placeholder:font-medium placeholder:text-black/80 placeholder:opacity-100 max-md:text-sm max-md:placeholder:text-sm md:h-[66px] md:rounded-xl md:pl-[60px]"
            placeholder={intl.formatMessage({ id: "email" })}
          />
          <IconSms className="absolute left-6 top-1/2 max-w-6 -translate-y-1/2 text-black/60 max-md:hidden" />
        </div>
        <button className="mt-8 h-[56px] w-full rounded-[10px] bg-accent text-center font-semibold text-white duration-300 hover:opacity-90 md:mt-9 md:h-[75px] md:rounded-[15px] md:text-xl">
          <FormattedMessage id="sendALink" />
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
