export type AuthUserAccount = {
  id: string;
  is_admin: boolean;
  email: string;
  last_login: string;
  date_joined: string;
  full_name: string;
  phone: string;
  is_active: boolean;
  groups: [];
  permissions: [];
};
