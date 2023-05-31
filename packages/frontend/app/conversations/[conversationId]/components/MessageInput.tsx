"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface MessageInputProps {
  id: string;
  name: string;
  type: string;
  placeholder: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  required: boolean;
}
const MessageInput = ({
  id,
  type,
  placeholder,
  register,
  errors,
  required,
}: MessageInputProps) => {
  return (
    <div className="relative w-full">
      <input
        type={type}
        id={id}
        autoComplete={id}
        {...register(id, { required })}
        placeholder={placeholder}
        className="w-full px-4 py-2 border font-light border-gray-100 rounded-full focus:outline-none"
      />
    </div>
  );
};

export default MessageInput;
