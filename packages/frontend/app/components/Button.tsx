"use client";
import clsx from "clsx";
interface InputProps {
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  className?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  variant?: "primary" | "secondary" | "danger";
  secondary?: boolean;
}
const Button = ({
  children,
  onClick,
  className,
  fullWidth = false,
  disabled = false,
  variant = "primary",
  type = "button",
}: InputProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(
        `
      flex
      justify-center
      py-2
      px-3
      text-sm
      rounded-md
      font-semibold
      focus:outline-none
      focus:outline-2
      focus:ring-2
      focus:ring-offset-2
      ${className}
      `,
        disabled
          ? "bg-gray-300 opacity-50 text-gray-500 cursor-not-allowed"
          : "text-white",
        fullWidth ? "w-full" : "w-auto",
        variant === "secondary" ? "text-gray-900" : "text-white",
        variant === "danger" &&
          "bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600",
        variant === "primary" &&
          "bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600"
      )}
    >
      {" "}
      {children}
    </button>
  );
};

export default Button;
