import LanguageDropDown from "@/components/language-dropdown";
import Sidebar from "@/components/mobile-sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import routes from "@/constants/routes";
import { FormattedMessage } from "react-intl";
import useAuthUserAccount from "@/hooks/useAuthUserAccount";
import { ChevronDown, LogOut, ListRestart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import { getAuthTokenOnClient } from "@/lib/utils";
const Header = () => {

  const { data, logout } = useAuthUserAccount();

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
      
      if (response.ok) {  
        toast.success('Please check your email to reset your password.');
      } else {  
        throw new Error('Failed to send reset password email.');  
      }  
    } catch (error) {  
      console.error('Reset password error:', error);  
      toast.error('Failed to reset password. Please try again.');
    } finally {  
      setLoading(false);  
    }  
  };

  return (
    <div className="flex items-center justify-between bg-white px-4 max-lg:py-1.5 lg:bg-[#13101c] lg:px-0">
      <div className="flex h-[43px] items-center justify-center lg:h-20 lg:w-[280px]">
        <Link href={routes.home}>
          <Image src="/site-logo.png" width="50" height="50" alt="Microsoft Teams Icon"/>  
        </Link>
      </div>

      <div className="flex grow items-center justify-end space-x-3 rounded-lg md:space-x-5 lg:mr-5">
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
