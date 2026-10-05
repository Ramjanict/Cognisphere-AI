import { TrendingDown, TrendingUp } from "lucide-react";
import { type FC, type ReactNode } from "react";
import CommonBorder from "../common/custom/CommonBorder";
import CommonHeader from "../common/header/CommonHeader";

interface Trend {
  percentage: number | string;
  isPositive: boolean | string;
}

interface CardData {
  title: string;
  value: string | number;
  valueColor?: string;
  icon?: ReactNode;
  trend?: Trend;
  isGray?: boolean;
}

interface CardProps {
  data: CardData;
}

const DashboardCard: FC<CardProps> = ({ data }) => {
  const { title, value, icon, trend, isGray = false, valueColor } = data;

  return (
    <CommonBorder className=" ">
      <div className="">
        <div className="flex justify-between items-center gap-4 ">
          <CommonHeader size="sm" className="">
            {title}
          </CommonHeader>
          {icon && <div className={`text-[#717182] !text-base `}>{icon}</div>}
        </div>

        <CommonHeader
          size="xl"
          className={`${valueColor}  text-start pt-6 pb-1`}
        >
          {value}
        </CommonHeader>
        {trend && (
          <div className="flex  gap-1">
            {trend.isPositive ? (
              <TrendingUp
                className={`w-4 h-4 text-[#08AD36] ${isGray && "!text-[#717182]"}`}
              />
            ) : (
              <TrendingDown
                className={`w-4 h-4 text-red-500 ${isGray && "!text-[#717182]"}`}
              />
            )}
            <CommonHeader
              className={`text-sm font-medium ${isGray && "!text-[#717182]"} ${
                trend.isPositive ? "text-[#08AD36]" : "text-red-500"
              }`}
            >
              {trend.isPositive ? "+" : "-"}
              {trend.percentage}
            </CommonHeader>
            <CommonHeader size="xs">from last month</CommonHeader>
          </div>
        )}
      </div>
    </CommonBorder>
  );
};

export default DashboardCard;
