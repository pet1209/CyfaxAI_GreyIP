import { ReactNode } from "react";
import { FormattedMessage } from "react-intl";

const BodyCard = ({
  children,
  heading,
  details,
}: {
  children: ReactNode;
  heading: string;
  details: string;
}) => {
  return (
    <div className="space-y-5 rounded-md border border-[#d6d6d6] p-5">
      {children}
      <h3 className="text-center font-mulish text-[15px] font-medium leading-[22px] text-[#000000] md:text-lg lg:text-2xl lg:leading-[36px]">
        <FormattedMessage id={heading} />
      </h3>
      <p className="text-center font-mulish text-[10px] font-normal leading-[15px] text-[#000000] md:text-xs lg:text-base lg:font-medium lg:leading-6">
        <FormattedMessage id={details} />
      </p>
    </div>
  );
};

export default BodyCard;
