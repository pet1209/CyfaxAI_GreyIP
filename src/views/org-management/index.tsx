import IconChekboxChecked from "@/components/icons/icon-chekbox-checked";
import IconChekboxUnChecked from "@/components/icons/icon-chekbox-unchecked";
import Input, { FormikInput } from "@/components/ui/input";
import {
  FormikSelect,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getPermissionsQueryOptions } from "@/cyfax-api-client/queries";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ErrorMessage, Formik } from "formik";
import { useMemo, useState } from "react";
import { toFormikValidationSchema } from "zod-formik-adapter";

import cyfaxApiClient from "@/cyfax-api-client";
import { cn, getApiErrorMessage } from "@/lib/utils";
import { FormattedMessage, useIntl } from "react-intl";
import { toast } from "react-toastify";
import { z } from "zod";

const validationSchema = z.object({
  permissions: z.array(z.string()).min(1, "Permissions are required"),
  email: z
    .string({
      message: "Email is required",
    })
    .email("Invalid email address"),
  password: z.string({
    message: "Password is required",
  }),
  full_name: z.string({
    message: "Full name is required",
  }),
  name: z.string({
    message: "Name is required",
  }),
  domain_name: z.string({
    message: "Domain name is required",
  }),
  group_kind: z.string({ message: "Group kind is required" }),
});

const initialValues = {
  permissions: null,
  email: "",
  password: "",
  full_name: "",
  name: "",
  domain_name: "",
  group_kind: "",
};

const OrgManagement = () => {
  const [isOpenPermissionsSelect, setIsOpenPermissionsSelect] = useState(false);

  const intl = useIntl();

  const permissionsQuery = useQuery({
    ...getPermissionsQueryOptions(),
  });

  const createUserManagementMutation = useMutation({
    mutationKey: ["create-user-management"],
    mutationFn: (data: any) =>
      cyfaxApiClient.post<{
        id: string;
        is_admin: boolean;
        email: string;
        last_login: string;
        date_joined: string;
        full_name: string;
        phone: string;
        is_active: true;
        groups: any[];
        permissions: any[];
      }>("/user_management/", data),
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });

  const createGroupsMutation = useMutation({
    mutationKey: ["create-groups"],
    mutationFn: (data: any) =>
      cyfaxApiClient.post<{
        data: {
          id: string;
          name: string;
          domain_name: string;
          group_kind: string;
          admin_email: string;
          permissions: string[];
        };
      }>("/groups/", data),
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });

  const addGroupPermissionMutation = useMutation({
    mutationKey: ["add-group-permission"],
    mutationFn: (data: any) => cyfaxApiClient.post("/group_permission/", data),
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
  const permissionOptions = useMemo(
    () =>
      permissionsQuery.data?.data.map((permission) => ({
        label: permission.name,
        value: permission.id,
      })) || [],
    [permissionsQuery.data?.data],
  );

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, actions) => {
        try {
          await createUserManagementMutation.mutateAsync({
            email: values.email,
            password: values.password,
            full_name: values.full_name,
          });
          const res = await createGroupsMutation.mutateAsync({
            name: values.name,
            domain_name: values.domain_name,
            group_kind: values.group_kind,
            admin_email: values.email,
          });
          await addGroupPermissionMutation.mutateAsync({
            group: res.data.data.id,
            permissions: values.permissions,
          });
          toast.success("Organization created successfully");
          actions.setSubmitting(false);
          actions.resetForm();
        } catch (error) {
          actions.setSubmitting(false);
        }
      }}
      validationSchema={toFormikValidationSchema(validationSchema)}
    >
      {({
        submitForm,
        setFieldValue,
        values,
        errors,
        touched,
        setFieldTouched,
        isSubmitting,
      }) => {
        const selectedPermissions = values.permissions || [];
        return (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submitForm();
            }}
            className="p-4 font-inter md:p-6"
          >
            <h2 className="font-mulish text-base font-semibold md:text-xl lg:text-2xl/[120%]">
              <FormattedMessage id="organizationalManagement" />
            </h2>

            <div className="mt-5 grid grid-cols-1 gap-4 rounded-xl md:p-5 md:shadow-[0_0_12px_rgba(0,0,0,0.12)] lg:grid-cols-2 lg:gap-6">
              <FormikInput
                name="name"
                label="createAnOrganization"
                placeholder={intl.formatMessage({ id: "writeFullNameHere" })}
              />
              <FormikInput
                name="full_name"
                label="authorizedAdministrator"
                placeholder={intl.formatMessage({
                  id: "writeAdministratorFullNameHere",
                })}
              />
              <FormikInput
                name="email"
                label="authorizedAdministratorEmail"
                placeholder={intl.formatMessage({
                  id: "inputTheAuthorizedAdministratorEmailHere",
                })}
              />
              <FormikInput
                name="password"
                label="password"
                placeholder={intl.formatMessage({
                  id: "inputTemporaryPasswordHere",
                })}
              />
              <div className="lg:col-span-2">
                <FormikInput
                  name="domain_name"
                  label="authorizedOrganizationalDomain"
                  placeholder={intl.formatMessage({
                    id: "inputTheDomainNameOfTheOrganization",
                  })}
                />
              </div>

              <div>
                <FormikSelect
                  name="group_kind"
                  label="isThisOrganizationAClientOrPartner"
                  placeholder="Select"
                  options={[
                    {
                      label: "client",
                      value: "client",
                    },
                    {
                      label: "partner",
                      value: "partner",
                    },
                  ]}
                />
              </div>
              <div className="pointer-events-none opacity-50">
                <label className="mb-4 inline-block text-sm font-medium md:text-base lg:text-xl">
                  <FormattedMessage id="createAdditionalUser" />
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="option_1">Option 1</SelectItem>
                    <SelectItem value="option_2">Option 2</SelectItem>
                    <SelectItem value="option_3">Option 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Input
                wrapper={{ className: "pointer-events-none opacity-50" }}
                label="additionalUser"
                placeholder={intl.formatMessage({
                  id: "inputFullNameOfAdditionalUser",
                })}
              />
              <Input
                wrapper={{ className: "pointer-events-none opacity-50" }}
                label="emailAddress"
                placeholder={intl.formatMessage({
                  id: "inputAdditionalUserEmailHere",
                })}
              />
              <div className="relative lg:col-span-2">
                {/* <FormikSelect
                name="permissions"
                options={permissionOptions}
                label="Permissions"
                placeholder="Select"
              /> */}

                <label className="mb-4 inline-block text-sm font-medium md:text-base lg:text-xl">
                  <FormattedMessage id="permissions" />
                </label>

                <Select
                  open={isOpenPermissionsSelect}
                  onOpenChange={(value) => {
                    if (value === true) {
                      setIsOpenPermissionsSelect(true);
                    }
                  }}
                  // onValueChange={(value) => {
                  //   const isSelected = selectedPermissions.includes(value);
                  //   if (isSelected) {
                  //     setFieldValue(
                  //       "permissions",
                  //       selectedPermissions.filter((p) => p !== value),
                  //     );
                  //   } else {
                  //     setFieldValue("permissions", [
                  //       ...selectedPermissions,
                  //       value,
                  //     ]);
                  //   }
                  // }}
                >
                  <SelectTrigger
                    onFocus={() => {
                      setFieldTouched("permissions");
                    }}
                    className={cn(
                      errors["permissions"] &&
                        touched["permissions"] &&
                        "ring-1 ring-red-500",
                    )}
                  >
                    {selectedPermissions.length > 0
                      ? `${selectedPermissions.length} permissions selected`
                      : "Select"}
                  </SelectTrigger>
                  <SelectContent
                    onPointerDownOutside={() => {
                      setIsOpenPermissionsSelect(false);
                    }}
                  >
                    {permissionOptions.map((permission) => {
                      const isSelected = selectedPermissions.includes(
                        permission.value as never,
                      );
                      return (
                        <SelectItem
                          key={permission.value}
                          value={permission.value}
                          className="px-4"
                          onClick={(e) => {
                            if (isSelected) {
                              setFieldValue(
                                "permissions",
                                selectedPermissions.filter(
                                  (p) => p !== permission.value,
                                ),
                              );
                            } else {
                              setFieldValue("permissions", [
                                ...selectedPermissions,
                                permission.value,
                              ]);
                            }
                          }}
                        >
                          <span className="flex items-center gap-[14px]">
                            {isSelected ? (
                              <IconChekboxChecked className="w-10 shrink-0" />
                            ) : (
                              <IconChekboxUnChecked className="w-10 shrink-0" />
                            )}
                            {permission.label}
                          </span>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <ErrorMessage name={"permissions"}>
                  {(errorMessage) => (
                    <p className="mt-2 text-xs text-red-500">{errorMessage}</p>
                  )}
                </ErrorMessage>
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                className="h-14 rounded-lg bg-accent px-11 font-semibold text-white duration-300 hover:opacity-90 md:text-lg lg:text-xl/[120%]"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <FormattedMessage id="pleaseWait" />
                ) : (
                  <FormattedMessage id="submit" />
                )}
              </button>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default OrgManagement;
