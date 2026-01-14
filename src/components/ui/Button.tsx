import { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const universalStyle =
  "px-4 py-2 rounded-lg cursor-pointer font-semibold text-text active:scale-95 transition";

export const PrimaryButton = ({
  children,
  className = "",
  ...props
}: ButtonProps) => {
  return (
    <button className={`bg-primary ${universalStyle} ${className}`} {...props}>
      {children}
    </button>
  );
};

export const DestructiveButton = ({
  children,
  className = "",
  ...props
}: ButtonProps) => {
  return (
    <button className={`bg-error ${universalStyle} ${className}`} {...props}>
      {children}
    </button>
  );
};
