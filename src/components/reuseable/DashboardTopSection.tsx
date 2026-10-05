import { FaPlus } from "react-icons/fa6";
import ButtonWithIcon from "../common/button/ButtonWithIcon";
import CommonHeader from "../common/header/CommonHeader";

interface ManagementHeaderProps {
  title: string;
  description?: string;
  className?: string;
  buttonText?: string;
  action?: () => void;
}

const DashboardTopSection = ({
  title,
  description,
  className,
  buttonText,
  action,
}: ManagementHeaderProps) => {
  return (
    <div
      className={`flex flex-col md:flex-row items-start md:items-end justify-between gap-6  ${className} `}
    >
      <div className="">
        {title && (
          <CommonHeader size="xl" className="!text-lg">
            {title}
          </CommonHeader>
        )}
        {description && (
          <div className="w-full ">
            <CommonHeader size="sm" className=" !text-[#717182]">
              {description}
            </CommonHeader>
          </div>
        )}
      </div>

      {buttonText && (
        <ButtonWithIcon
          icon={FaPlus}
          className="w-full md:w-auto flex justify-center  flex-shrink-0 !bg-[#030213] !text-white"
          iconClassName="!text-white"
        >
          <p onClick={action}>{buttonText}</p>
        </ButtonWithIcon>
      )}
    </div>
  );
};
export default DashboardTopSection;
