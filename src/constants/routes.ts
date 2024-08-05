const routes = {
  home: "/",
  publicReportResults: (domain: string) => `/results/${domain}`,
  dashboard: "/dashboard",
  currentRisk: "/dashboard/current-risk",
  orgManagement: "/dashboard/org-management",
  alertManagement: "/dashboard/alert-management",
  login: "/login",
  signup: "/signup",
  resetPassword: "/reset-password",
};

export default routes;

export const authenticatedRoutes = [
  routes.dashboard,
  routes.currentRisk,
  routes.orgManagement,
  routes.alertManagement,
];

export const unAuthenticatedRoutes = [
  routes.login,
  routes.signup,
  routes.resetPassword,
];
export const publicRoutes = [routes.home, routes.publicReportResults("")];
