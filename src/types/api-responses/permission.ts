type Permission = {
  id: string;
  name: string;
  code_name: string;
};

type Roles={
  id: string;
  role_name: string;
}

type Groups = {
  id: string;
  name: string;
  authorized_domains: string[];
  group_kind: string;
  permissions: string[];
  created_at: string;
  admin_user: string;
  created_by: string;
}

type Pagination = {
  page: number;
  per_page: number;
  num_pages: number;
  total: number;
};

type PermissionsAPIResponse = {
  data: Permission[];
  pagination: Pagination;
};

type RolesAPIResponse = {
  data: Roles[];
}

type GroupsAPIResponse = {
  data: Groups[];
  pagination: Pagination;
}