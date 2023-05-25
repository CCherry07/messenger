"use client";

import clsx from "clsx";
import { FieldValues, FieldErrors, UseFormRegister } from "react-hook-form";

type InputProps = {
  label: string;
  id: string;
  name: string;
  type?: string;
  register?: UseFormRegister<FieldValues>;
  errors?: FieldErrors<FieldValues>;
  className?: string;
  required?: boolean;
  disabled?: boolean;
};

const Input = ({
  label,
  id,
  name,
  type = "text",
  register,
  errors,
  className,
  required = false,
  disabled = false,
}: InputProps) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="
      block
      text-sm
      font-medium
      text-gray-700
      leading-6
    "
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          type={type}
          id={id}
          disabled={disabled}
          {...register?.(id, { required })}
          className={clsx(
            `
              form-input
              block
              w-full
              rounded-md
              shadow-sm
              border-0
              py-1.5
              text-gary-900
              ring-1
              ring-inset
              ring-gray-300
              placeholder-gray-400
              focus:ring-2
              focus:ring-sky-500
              focus:ring-inset
              sm:text-sm
              sm:leading-6
              ${className},
              `,
            errors?.[id] && `ring-2 ring-red-500`,
            disabled &&
              `bg-gray-100 text-gray-500 opacity-50 cursor-not-allowed`
          )}
        ></input>
      </div>
    </div>
  );
};

export default Input;
