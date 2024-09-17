import { Formik } from "formik";  
import { FormattedMessage, useIntl } from "react-intl";  
import { useFormikContext, useField } from "formik";  
import { useState, KeyboardEvent } from "react";  
import { XCircle } from 'lucide-react';  
import useAuthUserAccount from "@/hooks/useAuthUserAccount";
import routes from "@/constants/routes";
import Link from "next/link";

const initialValues = {  
  usernames: [],  
  corporateEmails: [],  
  personalEmails: [],  
};  

const OrgManagement = () => {  
  const intl = useIntl();  
  const { data } = useAuthUserAccount();  
  const roleName = data?.role_name;  

  const groupKindValue = (roleName === 'super_admin' || roleName === 'partner_admin' || roleName === 'partner_user') ? 'partner' : 'client';  
  
  return (  
    <Formik  
      initialValues={initialValues}  
      onSubmit={(values) => {  
        console.log(values);  
      }}  
    >  
      {({    
        handleSubmit,  
        setFieldValue,  
      }) => (  
        <form  
          onSubmit={(e) => {  
            e.preventDefault();  
            handleSubmit();  
          }}  
          className="p-4 font-inter md:p-6"  
        >  
          <h2 className="font-mulish text-base font-semibold md:text-xl lg:text-2xl/[120%]">  
            <FormattedMessage id="vipManagement" />  
          </h2>  
          <div className="mt-5 grid grid-cols-1 gap-4 rounded-xl md:p-5 md:shadow-[0_0_12px_rgba(0,0,0,0.12)]">  
            <FormikDomainInput  
              name="usernames"  
              label="executiveSuiteUsernames"  
              placeholder={intl.formatMessage({ id: "inputExecutiveSuiteUsernames" })}  
              onChange={(domains) => setFieldValue("usernames", domains)}  
              groupKind={groupKindValue}  
            />  

            <FormikDomainInput  
              name="corporateEmails"  
              label="executiveSuiteCorporateEmails"  
              placeholder={intl.formatMessage({ id: "inputExecutiveSuiteCorporateEmails" })}  
              onChange={(domains) => setFieldValue("corporateEmails", domains)}  
              groupKind={groupKindValue}  
            />  

            <FormikDomainInput  
              name="personalEmails"  
              label="executiveSuitePersonalEmails"  
              placeholder={intl.formatMessage({ id: "inputExecutiveSuitePersonalEmails" })}  
              onChange={(domains) => setFieldValue("personalEmails", domains)}  
              groupKind={groupKindValue}  
            />  
          </div>  
          <div className="mt-8 flex justify-end">  
            <button  
              type="submit"  
              className="h-14 w-40 rounded-lg bg-accent px-8 text-base font-semibold text-white duration-300 hover:opacity-90 sm:w-48 md:text-lg lg:text-xl"  
            >  
              <FormattedMessage id="send" />   
            </button>  
          </div>  
        </form>  
      )}  
    </Formik>  
  );  
}; 

export default OrgManagement;  

interface FormikDomainInputProps {  
  name: string;  
  groupKind: string;  
  label?: string;  
  placeholder?: string;  
  onChange?:(domains: string[]) => void;  
}  

const FormikDomainInput: React.FC<FormikDomainInputProps> = ({ name, groupKind, label, placeholder, onChange }) => {  
  const { setFieldValue } = useFormikContext();  
  const [field, meta] = useField(name);  
  const [inputValue, setInputValue] = useState("");  

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {  
    if (e.key === 'Enter' && inputValue.trim() !== '') {  
      e.preventDefault();  
      const newDomains = groupKind === 'client' ? [inputValue.trim()] : [...field.value, inputValue.trim()];  
      setFieldValue(name, newDomains, true);   
      onChange && onChange(newDomains);  
      setInputValue("");   
    }  
  };  

  const removeDomain = (domainToRemove: string) => {  
    const newDomains = field.value.filter((domain: string) => domain !== domainToRemove);  
    setFieldValue(name, newDomains, true);  
  };  

  return (  
    <div>  
      <div className="mb-4 flex items-center justify-between">  
        {label && <label className="inline-block text-sm font-medium md:text-base lg:text-xl"><FormattedMessage id={label} /></label>}   
        <Link href={routes.executive_suite_usernames} passHref>  
          <button className="text-sm font-medium text-accent duration-300 hover:opacity-90 lg:text-xl lg:font-semibold">  
            <FormattedMessage id="seeAll" />  
          </button>  
        </Link>
      </div>  
      <div className="relative flex flex-wrap items-center gap-2 rounded-[10px] border bg-black/10 px-3 py-2 outline-none backdrop-blur-xl md:h-[66px] lg:h-[70px]">  
        {field.value.map((domain: string, index: number) => (  
          <div key={index} className="flex items-center gap-2 rounded bg-blue-100 px-2 py-1">  
            {domain}  
            <XCircle className="size-4 cursor-pointer text-blue-500" onClick={() => removeDomain(domain)} />  
          </div>  
        ))}  
        <input  
          type="text"  
          value={inputValue}  
          onChange={(e) => setInputValue(e.target.value)}  
          onKeyDown={handleKeyDown}  
          placeholder={placeholder}  
          className="flex-1 border-none bg-transparent outline-none placeholder:font-medium placeholder:text-black/80 placeholder:opacity-100 max-md:text-sm"  
        />  
      </div>  
      {meta.touched && meta.error && <div className="text-sm text-red-500">{meta.error}</div>}  
    </div>  
  );  
};