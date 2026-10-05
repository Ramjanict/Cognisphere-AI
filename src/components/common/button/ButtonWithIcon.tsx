import type { ComponentPropsWithoutRef, ComponentType, ReactNode } from "react";

interface ButtonWithIconProps extends ComponentPropsWithoutRef<"button"> {
  children: ReactNode;
  icon?: ComponentType<{ className?: string }>;
  iconClassName?: string;
}

const ButtonWithIcon: React.FC<ButtonWithIconProps> = ({
  children,
  icon: Icon,
  className = "",
  iconClassName,
  ...props
}) => (
  <button
    {...props}
    className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm bg-white border-[1.73px] border-border  text-[#0A0A0A] !flex-shrink-0   cursor-pointer ${className}`}
  >
    {Icon && (
      <Icon className={`${iconClassName} min-w-4 min-h-4 text-[#0A0A0A]`} />
    )}
    {children}
  </button>
);

export default ButtonWithIcon;
