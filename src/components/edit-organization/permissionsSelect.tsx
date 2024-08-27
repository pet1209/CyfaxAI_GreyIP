// PermissionsSelect.tsx  
import React from 'react';  
import { useField } from "formik";  
import {  
  Select,  
  SelectTrigger,  
  SelectItem,  
  SelectContent,  
  SelectScrollUpButton,  
  SelectScrollDownButton,  
} from "@/components/ui/select";  
import IconChekboxChecked from "@/components/icons/icon-chekbox-checked";
import IconChekboxUnChecked from "@/components/icons/icon-chekbox-unchecked";

interface PermissionsSelectProps {  
  name: string;  
  options: { label: string; value: string }[];  
}  

export const PermissionsSelect: React.FC<PermissionsSelectProps> = ({ name, options }) => {  
  const [field, , helpers] = useField(name);  

  return (  
    <Select  
      value={field.value || []}  
      onValueChange={(selectedValue) => {  
        const newValue = field.value.includes(selectedValue)  
          ? field.value.filter((v: string) => v !== selectedValue)  
          : [...field.value, selectedValue];  
        helpers.setValue(newValue);  
      }}  
    >  
      <SelectTrigger>{`Selected ${field.value.length} permissions`}</SelectTrigger>  
      <SelectContent>  
        <SelectScrollUpButton />  
        {options.map((option) => (  
          <SelectItem key={option.value} value={option.value}>  
            {field.value.includes(option.value) ? (  
              <IconChekboxChecked />  
            ) : (  
              <IconChekboxUnChecked />  
            )}  
            <span>{option.label}</span>  
          </SelectItem>  
        ))}  
        <SelectScrollDownButton />  
      </SelectContent>  
    </Select>  
  );  
};