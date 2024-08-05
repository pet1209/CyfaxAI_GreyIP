import IconAlert from "@/components/icons/icon-alert";
import IconDanger from "@/components/icons/icon-danger";
import IconDashboard from "@/components/icons/icon-dashboard";
import IconLogout from "@/components/icons/icon-logout";
import IconProfile from "@/components/icons/icon-profile";
import routes from "@/constants/routes";
import useAuthUserAccount from "@/hooks/useAuthUserAccount";
import { cn, isPathEqual } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Fragment,
  MouseEventHandler,
  useEffect,
  useMemo,
  useState,
} from "react";
import { FormattedMessage } from "react-intl";

export type SidebarNavigationMenuItem = {
  icon?: JSX.Element;
  label: string;
  url: string;
  // eslint-disable-next-line no-unused-vars
  onClick?: MouseEventHandler<HTMLAnchorElement> | undefined;
  disabled?: boolean;
  isAdmin?: boolean;
  submenuItems?: SidebarNavigationMenuItem[];
};

const defaultNavLinks: SidebarNavigationMenuItem[] = [
  {
    icon: <IconDashboard className="w-6 shrink-0 text-white" />,
    label: "dashboard",
    url: routes.dashboard,
  },
  {
    icon: <IconDanger className="w-6 shrink-0 text-white" />,
    label: "currentRisk",
    url: routes.currentRisk,
    submenuItems: [
      {
        label: "leakedCredentials",
        url: `${routes.currentRisk}/leaked-credentials`,
        disabled: true,
      },
      {
        label: "companyExposedPortsServices",
        url: `${routes.currentRisk}/company-exposed-ports-services`,
        disabled: true,
      },
      {
        label: "exploitableServices",
        url: `${routes.currentRisk}/exploitable-services`,
        disabled: true,
      },
      {
        label: "subDomainAnalysis",
        url: `${routes.currentRisk}/sub-domain-analysis`,
        disabled: true,
      },
      {
        label: "domainVariations",
        url: `${routes.currentRisk}/domain-variations`,
        disabled: true,
      },
      {
        label: "emailProtection",
        url: `${routes.currentRisk}/email-protection`,
        disabled: true,
      },
      {
        label: "stealerLogsForSale",
        url: `${routes.currentRisk}/stealer-logs-for-sale`,
        disabled: true,
      },
      {
        label: "logsInfectedMachine",
        url: `${routes.currentRisk}/logs-infected-machine`,
        disabled: true,
      },
      {
        label: "darkWebMentions",
        url: `${routes.currentRisk}/dark-web-mentions`,
        disabled: true,
      },
      {
        label: "hackerChannelMention",
        url: `${routes.currentRisk}/hacker-channel-mention`,
        disabled: true,
      },
    ],
  },
  {
    icon: <IconProfile className="w-6 shrink-0 text-white" />,
    label: "orgManagement",
    url: routes.orgManagement,
    isAdmin: true,
  },
  {
    icon: <IconAlert className="w-6 shrink-0 text-white" />,
    label: "alertManagement",
    url: routes.alertManagement,
    isAdmin: true,
  },
];

const AuthenticatedSidebarLinks = () => {
  const { isAdmin, logout, logoutMutation } = useAuthUserAccount();

  const navLinks = useMemo(() => {
    return [
      ...defaultNavLinks,
      {
        icon: <IconLogout className="w-6 shrink-0 text-white" />,
        label: logoutMutation.isPending ? "loggingOut" : "logOut",
        url: "#",
        onClick(e) {
          e.preventDefault();
          logout();
        },
      },
    ];
  }, [logout, logoutMutation.isPending]);

  return (
    <div className="space-y-5">
      {navLinks.map((item) => {
        if (!isAdmin && item.isAdmin) {
          return <Fragment key={item.url} />;
        }
        return <MenuItem menuItem={item} key={item.url} />;
      })}
    </div>
  );
};

export default AuthenticatedSidebarLinks;

const MenuItem = ({ menuItem }: { menuItem: SidebarNavigationMenuItem }) => {
  const router = useRouter();

  const hasSubMenu = menuItem.submenuItems && menuItem.submenuItems?.length > 0;

  const isActiveMenu = isPathEqual(router.asPath, menuItem.url);

  const [isSubmenuOpen, setIsSubmenuOpen] = useState(isActiveMenu);

  useEffect(() => {
    setIsSubmenuOpen(isActiveMenu);
  }, [isActiveMenu]);

  return (
    <div>
      <Link
        onClick={menuItem.onClick}
        href={menuItem.url}
        className={cn(
          "py-3 w-full items-center rounded-md px-3 hover:bg-accent font-mulish gap-4 duration-300 flex text-white relative",
          isActiveMenu && "bg-accent",
          hasSubMenu && "pr-12",
        )}
      >
        {menuItem.icon}
        <span className="inline-block truncate">
          <FormattedMessage id={menuItem.label} />
        </span>

        {hasSubMenu && (
          <div className="absolute right-0 top-0 z-10 aspect-square h-full p-0.5">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsSubmenuOpen((prev) => !prev);
              }}
              className={cn(
                "size-full duration-200 max-lg:bg-foreground/5 flex justify-center items-center",
                isSubmenuOpen && "rotate-180",
              )}
            >
              <ChevronDown className="size-5" />
            </button>
          </div>
        )}
      </Link>

      {hasSubMenu && isSubmenuOpen && (
        <div className="my-2 ml-[18px] space-y-1 border-l-2 border-white/35 pl-5">
          {menuItem.submenuItems?.map((submenuItem) => {
            const isActiveSubMenu =
              (submenuItem.url === "/" &&
                isPathEqual(router.asPath, submenuItem.url)) ||
              (submenuItem.url !== "/" &&
                router.asPath.startsWith(submenuItem.url));

            return (
              <Link
                title={submenuItem.label}
                onClick={submenuItem.onClick}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-3 py-1.5 text-white/80 [&>svg]:size-[18px] [&>svg]:shrink-0 md:[&>svg]:size-3.5 relative",
                  isActiveSubMenu && "bg-white/10 text-white",
                  submenuItem.disabled
                    ? "opacity-40 pointer-events-none"
                    : "hover:text-white hover:bg-white/5 transition-all hover:text-primary",
                )}
                key={submenuItem.url}
                href={submenuItem.url}
              >
                <span className="pointer-events-none absolute right-[calc(100%+8px)] top-1/2 block h-0.5 w-3 -translate-y-1/2 bg-white/35" />
                {submenuItem.icon}

                <span className="inline-block">
                  <FormattedMessage id={submenuItem.label} />
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};
