import LanguageDropDown from "@/components/language-dropdown";
import Sidebar from "@/components/mobile-sidebar";
import routes from "@/constants/routes";
import Link from "next/link";
import { IoMdHome } from "react-icons/io";

const Header = () => {
  return (
    <div className="flex items-center justify-between bg-white px-4 lg:bg-[#13101c] lg:px-0">
      <div className="flex h-[43px] items-center justify-center lg:h-20 lg:w-[240px]">
        <Link href={routes.home}>
          {/* <Image
            className="h-[43px] w-[35px] md:h-12 md:w-10 lg:h-[59px] lg:w-[47px]"
            src={logo}
            height={200}
            width={200}
            alt="logo"
            placeholder="blur"
          /> */}
          <IoMdHome className="size-6 text-[#93328e] lg:size-9" />
        </Link>
      </div>

      <div className="flex grow items-center justify-end space-x-3 rounded-lg md:space-x-5 lg:mr-5">
        <div className="hidden lg:block">
          <LanguageDropDown />
        </div>
        {/* <div className="flex flex-row items-center gap-x-3">
          <Image
            className="hidden size-8 rounded-full object-cover lg:block"
            src={avater}
            alt="Avatar"
          ></Image>
          <h3 className="hidden font-mulish text-base font-normal leading-5 text-gray-200 lg:block">
            Ayan
          </h3>
        </div> */}
        <div className="lg:hidden">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default Header;