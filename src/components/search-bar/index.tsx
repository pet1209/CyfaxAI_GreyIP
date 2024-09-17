import { useIntl } from "react-intl";
import useAuthUserAccount from "@/hooks/useAuthUserAccount";
import useDetailReport from "@/views/current-risk/hooks/useDetailReport";
import { useDebouncedCallback, useInputState } from "@mantine/hooks";
import { Search } from "lucide-react";
import { useEffect } from "react";

const SearchBar = () => {
    const { data } = useAuthUserAccount();
    const [domainValue, setDomainValue] = useInputState("");
    const roleName = data?.role_name;
    const { setDomain, domain } = useDetailReport();
    const intl = useIntl();

    const handleChange = useDebouncedCallback((value: string) => {
        setDomain(value);
    }, 500);

    const handleFilterClick = () => {
        setDomain("")
    }
    useEffect(() => {
        setDomainValue(domain);
    }, [domain, setDomainValue]);

    return (
        <>
            { (roleName === 'super_admin' || roleName === 'partner_admin' || roleName === 'partner_user') && (
                <div className="relative w-full md:w-auto">
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
                        className="h-10 w-full rounded-lg border-2 border-[#720072] pl-3 pr-8 text-xs outline-none placeholder:text-xs max-lg:border md:pr-10 md:text-base md:placeholder:text-base lg:h-12 lg:w-[517px] lg:pl-5 lg:pr-14"
                    />
                    <button
                        onClick={handleFilterClick}
                        className="pointer-events-auto absolute right-3 top-1/2 -translate-y-1/2 md:right-5"
                    >
                        <Search style={{color: '#720072'}} className="w-4 md:w-5 lg:w-6" />  
                    </button>
                </div>
            )}
        </>
    )
}

export default SearchBar;
