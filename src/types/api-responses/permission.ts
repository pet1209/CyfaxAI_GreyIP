type Permission = {
  id: string;
  name: string;
  code_name: string;
};

type Roles={
  id: string;
  role_name: string;
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
