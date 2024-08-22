const routes = {
  home: "/",
  publicReportResults: (domain: string) => `/results/${domain}`,
  dashboard: "/dashboard",
  currentRisk: "/dashboard/current-risk",
  orgManagement: "/dashboard/org-management",
  alertManagement: "/dashboard/alert-management",
  alertType: "/dashboard/alert-management/alert-type",
  login: "/login",
  signup: "/signup",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password/[slug]/[token]",
  leakedCredentials: "/dashboard/current-risk/leaked-credentials",
  company_exposed_ports: "/dashboard/current-risk/company-exposed-ports",
  sub_domain_exploitable_services: "/dashboard/current-risk/sub-domain-exploitable-services",
  domain_name_variations: "/dashboard/current-risk/domain-name-variations",
  email_weaknesses: "/dashboard/current-risk/email-weaknesses",
  stealer_logs_for_sale: "/dashboard/current-risk/stealer-logs-for-sale",
  logs_infected_machine: "/dashboard/current-risk/logs-infected-machine",
  dark_web_mentions: "/dashboard/current-risk/dark-web-mentions",
  hacker_channel_mention: "/dashboard/current-risk/hacker-channel-mention",
  userManagement: "/dashboard/org-management/user-management",
};

export default routes;

export const authenticatedRoutes = [
  routes.dashboard,
  routes.currentRisk,
  routes.orgManagement,
  routes.alertManagement,
  routes.alertType,
  routes.company_exposed_ports,
  routes.sub_domain_exploitable_services,
  routes.domain_name_variations,
  routes.email_weaknesses,
  routes.stealer_logs_for_sale,
  routes.resetPassword,
  routes.leakedCredentials,
  routes.logs_infected_machine,
  routes.dark_web_mentions,
  routes.hacker_channel_mention,
  routes.userManagement,
];

export const unAuthenticatedRoutes = [
  routes.login,
  routes.signup,
  routes.forgotPassword,
];
export const publicRoutes = [routes.home, routes.publicReportResults("")];
