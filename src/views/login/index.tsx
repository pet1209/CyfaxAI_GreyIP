import IconKey from "@/components/icons/icon-key";
import IconSms from "@/components/icons/icon-sms";
import routes from "@/constants/routes";
import { getLoginMutationOptions } from "@/cyfax-api-client/mutations";
import { cn, getApiErrorMessage } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Formik, useField, useFormikContext } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { ComponentProps, forwardRef, ReactNode } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { toast } from "react-toastify";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

const validationSchema = z.object({
  email: z
    .string({ message: "Email is required" })
    .email("Invalid email address"),
  password: z.string({ message: "Password is required" }),
});

const Login = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const intl = useIntl();

  const loginMutation = useMutation({
    ...getLoginMutationOptions(),
    onError(error) {
      toast.error(getApiErrorMessage(error));
    },
    onSuccess() {
      router.replace(routes.dashboard).then(async () => {
        try {
          await queryClient.cancelQueries();
          await queryClient.invalidateQueries();
        } catch (error) {}
      });
      toast.success(intl.formatMessage({ id: "logInSuccessMessage" }));
    },
  });

  return (
    <div className="flex flex-col items-center px-5 pb-20 lg:pb-[148px]">
      <h1 className="mt-4 max-w-[862px] text-center font-poppins font-medium max-sm:max-w-[244px] sm:mt-11 sm:text-[34px]/[46px] lg:text-[50px]/[70px]">
        <FormattedMessage id="logInTitle" />
      </h1>
      <div className="mt-6 w-full max-w-[643px] font-inter sm:mt-20 lg:mt-[104px]">
        <h2 className="text-center text-2xl font-bold sm:text-[36px]">
          <FormattedMessage id="login" />
        </h2>

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={async (values, actions) => {
            try {
              await loginMutation.mutateAsync(values);
            } catch (error) {
              actions.setSubmitting(false);
            }
          }}
          validationSchema={toFormikValidationSchema(validationSchema)}
        >
          {({ submitForm, isSubmitting }) => (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitForm();
              }}
              className="mt-6 sm:mt-8 lg:mt-10"
            >
              <div className="space-y-4 md:space-y-[34px]">
                <FormikInput
                  name="email"
                  placeholder={intl.formatMessage({ id: "email" })}
                  icon={
                    <IconSms className="absolute left-6 top-1/2 max-w-6 -translate-y-1/2 text-black/60 max-md:hidden" />
                  }
                  autoComplete="email"
                />
                <FormikInput
                  name="password"
                  type="password"
                  placeholder={intl.formatMessage({ id: "password" })}
                  autoComplete="current-password"
                  icon={
                    <IconKey className="absolute left-6 top-1/2 max-w-6 -translate-y-1/2 text-black/60 max-md:hidden" />
                  }
                />
              </div>
              <Link
                href={routes.resetPassword}
                className="mb-8 mt-4 flex justify-end text-sm text-accent underline-offset-4 duration-300 hover:opacity-90 max-md:font-medium md:underline"
              >
                <FormattedMessage id="forgotPassword" />
              </Link>
              <button
                type="submit"
                className="h-[56px] w-full rounded-[10px] bg-accent text-center font-semibold text-white duration-300 hover:opacity-90 md:h-[75px] md:rounded-[15px] md:text-xl"
                disabled={isSubmitting}
              >
                <FormattedMessage id={isSubmitting ? "pleaseWait" : "login"} />
              </button>
              <div className="mt-[50px] flex justify-center">
                <p className="text-sm">
                  <span className="inline-block opacity-60">
                    <FormattedMessage id="dontHaveAnAccount" />
                  </span>{" "}
                  <Link href={"#"} className="underline underline-offset-[3px]">
                    <FormattedMessage id="signUp" />
                  </Link>
                </p>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;

type FormikInputProps = Omit<ComponentProps<"input">, "name"> & {
  icon: ReactNode;
  name: string;
  showError?: boolean;
};

const FormikInput = forwardRef<HTMLInputElement, FormikInputProps>(
  ({ icon, name, showError = true, ...props }, ref) => {
    const { getFieldProps } = useFormikContext();
    const [, meta] = useField(name);

    const hasError = meta.error && meta.touched;

    return (
      <div>
        <div className="relative">
          <input
            ref={ref}
            {...props}
            {...getFieldProps(name)}
            className={cn(
              "h-12 w-full rounded-[10px] bg-black/10 px-5 outline-none backdrop-blur-xl placeholder:font-medium placeholder:text-black/80 placeholder:opacity-100 max-md:text-sm max-md:placeholder:text-sm md:h-[66px] md:rounded-xl md:pl-[60px]",
              hasError && "ring-1 ring-red-500",
              props.className,
            )}
          />
          {icon}
        </div>
        {showError && hasError && (
          <p className="mt-2 text-xs text-red-500">{meta.error}</p>
        )}
      </div>
    );
  },
);
FormikInput.displayName = "FormikInput";
