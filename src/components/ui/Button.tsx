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
  text?: string;
  primaryColor?: string;
  icon: ReactNode;
}

export function PrimaryButton({
  text = "Get Started",
  className = "",
  icon,
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      className={`cursor-pointer group relative rounded-full border border-white bg-zinc-300 p-2 text-xl font-semibold ${className}`}
      {...props}
    >
      <div className="absolute bg-primary left-0 top-0 flex h-full w-11 items-center pr-2.5 justify-end rounded-full transition-all duration-200 ease-in-out group-hover:w-full">
        <span className="text-white transition-all duration-200 ease-in-out">
          {icon}
        </span>
      </div>
      <span className="relative left-4 z-10 whitespace-nowrap px-8 font-semibold text-black transition-all duration-200 ease-in-out group-hover:-left-3 group-hover:text-white">
        {text}
      </span>
    </button>
  );
}
