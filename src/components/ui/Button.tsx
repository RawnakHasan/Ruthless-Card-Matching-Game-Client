import { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const universalStyle =
  "px-4 py-2 rounded-lg cursor-pointer font-semibold text-text active:scale-95 transition";

// export const PrimaryButton = ({
//   children,
//   className = "",
//   ...props
// }: ButtonProps) => {
//   return (
//     <button className={`bg-primary ${className} ${universalStyle}`} {...props}>
//       {children}
//     </button>
//   );
// };

export const DestructiveButton = ({
  children,
  className = "",
  ...props
}: ButtonProps) => {
  return (
    <button className={`bg-error ${className} ${universalStyle}`} {...props}>
      {children}
    </button>
  );
};

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  primaryColor?: string;
  icon?: ReactNode;
}

export function PrimaryButton({
  children,
  className = "",
  icon,
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      className={`primary-button items-center gap-4 ${className}`}
      {...props}
    >
      <p className="flex gap-2 items-center justify-ceter">
        {icon && <span className="sm:hidden">{icon}</span>}
        {children}
      </p>
    </button>
  );
}
