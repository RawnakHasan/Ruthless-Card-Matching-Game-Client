import { InputHTMLAttributes } from "react";

export const Input = ({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className={`px-4 py-2 outline-none border-text border-2 rounded-lg ${className}`}
      {...props}
    />
  );
};
