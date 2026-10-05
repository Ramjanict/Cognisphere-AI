interface CommonTabsProps<T extends string> {
  tabs: T[];
  activeTab: T;
  onTabChange: (tab: T) => void;
  className?: string;
}

const CommonTabs = <T extends string>({
  tabs,
  activeTab,
  onTabChange,
  className = "",
}: CommonTabsProps<T>) => {
  const gridColsClass =
    (
      {
        1: "grid-cols-1",
        2: "grid-cols-2",
        3: "grid-cols-3",
        4: "grid-cols-4",
        5: "grid-cols-5",
      } as Record<number, string>
    )[tabs.length] || "grid-cols-3";

  return (
    <div
      className={`w-full bg-dark rounded-full mb-2  mt-4 grid ${gridColsClass} ${className}`}
    >
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`${
            activeTab === tab ? "bg-white rounded-full" : ""
          } text-primary text-sm font-normal leading-[20px] m-1 py-1.5 cursor-pointer`}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default CommonTabs;
