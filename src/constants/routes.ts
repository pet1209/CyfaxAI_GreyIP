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
  company_exploitable_services: "/dashboard/current-risk/company-exploitable-services",
  sub_domain_exploitable_services: "/dashboard/current-risk/sub-domain-exploitable-services",
  domain_name_variations: "/dashboard/current-risk/domain-name-variations",
  email_weaknesses: "/dashboard/current-risk/email-weaknesses",
};

export default routes;

export const authenticatedRoutes = [
  routes.dashboard,
  routes.currentRisk,
  routes.orgManagement,
  routes.alertManagement,
  routes.alertType,
  routes.company_exploitable_services,
  routes.sub_domain_exploitable_services,
  routes.domain_name_variations,
  routes.email_weaknesses,
  routes.resetPassword
];

export const unAuthenticatedRoutes = [
  routes.login,
  routes.signup,
  routes.forgotPassword,
];
export const publicRoutes = [routes.home, routes.publicReportResults("")];
