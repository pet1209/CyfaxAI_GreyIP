import IconSearch from "@/components/icons/icon-search";
import LanguageDropDown from "@/components/language-dropdown";
import Sidebar from "@/components/mobile-sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ACCESS_TOKEN } from "@/constants/cookies";
import routes from "@/constants/routes";
import useAuthUserAccount from "@/hooks/useAuthUserAccount";
import { appCache } from "@/node-cache";
import useDetailReport from "@/views/current-risk/hooks/useDetailReport";
import { useDebouncedCallback, useInputState } from "@mantine/hooks";
import { ChevronDown, LogOut } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { IoMdHome } from "react-icons/io";
import { useIntl } from "react-intl";
const Header = () => {
  const [domainValue, setDomainValue] = useInputState("");

  const { data, logout, isAdmin } = useAuthUserAccount();
  const { setDomain, domain } = useDetailReport();
  const intl = useIntl();

  const handleChange = useDebouncedCallback((value: string) => {
    setDomain(value);
  }, 500);

  useEffect(() => {
    setDomainValue(domain);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [domain]);

  return (
    <div className="flex items-center justify-between bg-white px-4 max-lg:py-1.5 lg:bg-[#13101c] lg:px-0">
      <div className="flex h-[43px] items-center justify-center lg:h-20 lg:w-[280px]">
        <Link href={routes.home}>
          {/* <Image
            className="h-[43px] w-[35px] md:h-12 md:w-10 lg:h-[59px] lg:w-[47px]"
            src={logo}
            height={200}
            width={200}
            alt="logo"
            placeholder="blur"
          /> */}
          <IoMdHome className="size-6 text-accent lg:size-9" />
        </Link>
      </div>

      <div className="flex grow items-center justify-end space-x-3 rounded-lg md:space-x-5 lg:mr-5">
        {isAdmin && (
          <div className="relative mr-auto pl-[30px] max-lg:mx-auto max-lg:w-3/4">
            <input
              value={domainValue}
              onChange={(e) => {
                setDomainValue(e);
                handleChange(e.target.value);
              }}
              type="text"
              placeholder={intl.formatMessage({
                id: "searchForAnOrganization",
              })}
              className="h-10 w-full rounded-lg pl-3 pr-8 text-xs outline-none placeholder:text-xs max-lg:border md:pr-10 md:text-base md:placeholder:text-base lg:h-12 lg:w-[517px] lg:pl-5 lg:pr-14"
            />
            <IconSearch className="pointer-events-none absolute right-3 top-1/2 w-4 -translate-y-1/2 text-accent md:w-5 lg:right-5 lg:w-6" />
          </div>
        )}
        <div className="hidden lg:block">
          <LanguageDropDown />
        </div>
        {data && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div
                className="flex cursor-pointer flex-row items-center gap-x-2"
                onClick={() => {
                  console.log("sdsd", appCache.get(ACCESS_TOKEN.name));
                }}
              >
                {/* <Image
                  className="hidden size-8 rounded-full object-cover lg:block"
                  src={"/avatar.png"}
                  alt="Avatar"
                  width={100}
                  height={100}
                /> */}
                <h3 className="hidden font-mulish text-base font-normal leading-5 text-gray-200 lg:block">
                  {data?.full_name || data?.email}
                </h3>
                <ChevronDown className="size-5 text-white" />
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              collisionPadding={10}
              sideOffset={10}
              className="min-w-[200px]"
            >
              <DropdownMenuItem onClick={() => logout()}>
                <LogOut className="size-4" /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <div className="lg:hidden">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default Header;
