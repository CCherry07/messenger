"use client";
import BaseSelect from "react-select";
interface SelectProps<T = any> {
  label: string;
  id: string;
  name: string;
  options: { label: string; value: T }[];
  onChange: any;
  value: SelectProps["options"][0]["value"][];
  disabled: boolean;
}
const Select = ({
  label,
  id,
  name,
  options,
  onChange,
  value,
  disabled,
}: SelectProps) => {
  return (
    <div className="z-[100]">
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-5 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2 relative">
        <BaseSelect
          id={id}
          name={name}
          isDisabled={disabled}
          isMulti
          options={options}
          onChange={onChange}
          value={value}
          menuPortalTarget={document.body}
          styles={{
            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
          }}
          classNames={{
            control: () => "text-sm",
          }}
        />
      </div>
    </div>
  );
};

export default Select;
