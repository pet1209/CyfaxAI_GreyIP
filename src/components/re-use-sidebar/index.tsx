import { ReactNode } from "react";
import { FormattedMessage } from "react-intl";

const ReUseSideBar = ({
  children,
  text,
}: {
  children: ReactNode;
  text: string;
}) => {
  return (
    <div className="my-11 flex flex-col justify-center">
      {children}
      <p className="mt-3 text-center font-mulish text-sm font-semibold text-gray-300 lg:text-base">
        <FormattedMessage id={text} />
      </p>
    </div>
  );
};

export default ReUseSideBar;
