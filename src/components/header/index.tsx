import LanguageDropDown from "@/components/language-dropdown";
import Sidebar from "@/components/mobile-sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import routes from "@/constants/routes";
import { FormattedMessage, useIntl } from "react-intl";
import useAuthUserAccount from "@/hooks/useAuthUserAccount";
import { isAuthenticatedRoute } from "@/lib/utils";
import useDetailReport from "@/views/current-risk/hooks/useDetailReport";
import { useDebouncedCallback, useInputState } from "@mantine/hooks";
import { ChevronDown, LogOut, Search, ListRestart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import { getAuthTokenOnClient } from "@/lib/utils";
const Header = () => {
  const router = useRouter();
  const [domainValue, setDomainValue] = useInputState("");

  const { data, logout, isAdmin } = useAuthUserAccount();
  const { setDomain, domain } = useDetailReport();
  const intl = useIntl();

  const [loading, setLoading] = useState(false); 


  const resetPassword = async () => {  
    setLoading(true);  
    try {  
      const tokens = await getAuthTokenOnClient();
      const response = await fetch(`${process.env.NEXT_PUBLIC_CYFAX_API_BASE_URL}/reset_password/`, {  
        method: 'POST',  
        headers: {  
          'Content-Type': 'application/json',  
          'Authorization': `Bearer ${tokens.accessToken}`,
        }
      });  
      console.log(response)
      
      if (response.ok) {  
        toast.success('Please check your email to reset your password.'); // Success notification  
      } else {  
        throw new Error('Failed to send reset password email.');  
      }  
    } catch (error) {  
      console.error('Reset password error:', error);  
      toast.error('Failed to reset password. Please try again.'); // Error notification  
    } finally {  
      setLoading(false);  
    }  
  };

  const handleChange = useDebouncedCallback((value: string) => {
    setDomain(value);
  }, 500);

  const handleFilterClick = () => {
    setDomain("")
  }

  useEffect(() => {
    setDomainValue(domain);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [domain]);

  const is_authneticatedRoute = isAuthenticatedRoute(router.asPath);

  return (
    <div className="flex items-center justify-between bg-white px-4 max-lg:py-1.5 lg:bg-[#13101c] lg:px-0">
      <div className="flex h-[43px] items-center justify-center lg:h-20 lg:w-[280px]">
        <Link href={routes.home}>
          <Image src="/site-logo.png" width="50" height="50" alt="Microsoft Teams Icon"/>  
        </Link>
      </div>

      <div className="flex grow items-center justify-end space-x-3 rounded-lg md:space-x-5 lg:mr-5">
        {isAdmin && is_authneticatedRoute && (
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
            <button
              onClick={handleFilterClick}
              className="pointer-events-auto absolute right-3 top-1/2 -translate-y-1/2 md:right-5"
            >
              <Search className="w-4 text-accent md:w-5 lg:w-6" />
            </button>
            
          </div>
          
        )}
        <div className="hidden lg:block">
          <LanguageDropDown />
        </div>
        {data && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex cursor-pointer flex-row items-center gap-x-2">
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
              <DropdownMenuItem onClick={() => !loading && resetPassword()}>
                <ListRestart className="size-4" /> <FormattedMessage id="resetPassword" />
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => logout()}>
                <LogOut className="size-4" /> <FormattedMessage id="logOut" /> 
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
