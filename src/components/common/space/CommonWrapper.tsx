import { type ReactNode } from "react";

// Define the props interface
interface CommonWrapperProps {
  children: ReactNode; // Type for children (can be any valid React node)
  className?: string; // Optional className prop
}

// Define the component
const CommonWrapper: React.FC<CommonWrapperProps> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={` w-full fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 ${className}`}
    >
      {children}
    </div>
  );
};

export default CommonWrapper;
