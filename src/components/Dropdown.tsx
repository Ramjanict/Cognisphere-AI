"use client";
import { useGetProfileQuery } from "@/store/api/profileApi";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { RiLockPasswordLine } from "react-icons/ri";
import logout from "../../public/logout.svg";
import setting from "../../public/setting.svg";
import subscriber from "../../public/subscriber.svg";
import userProfile from "../../public/userLogo.png";
import ChangePasswordDialog from "./ChangePasswordDialog";
import CommonBorder from "./common/custom/CommonBorder";
import CommonHeader from "./common/header/CommonHeader";
import LogoutDialog from "./logout-dialog";
import SettingsDialog from "./settings-dialog";
import SubscriptionDropdownItem from "./subscription-dialog";

const menuItems = [
  { icon: subscriber, title: "Current Plan" },
  { icon: setting, title: "Settings" },
  { icon: RiLockPasswordLine, title: "Change Password", isReactIcon: true },
  { icon: logout, title: "Logout" },
];

const Dropdown = () => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMenuClick = (title: string) => {
    setActiveMenu(title);
    setOpenDropdown(false);
  };

  const handleClose = () => {
    setActiveMenu(null);
    setOpenDropdown(false);
  };
  const { data: profile } = useGetProfileQuery();
  const subscriptionNeed = profile?.data.subscriptionStatus === "trialing";
  return (
    <div>
      <div className="" ref={dropdownRef}>
        <div
          onClick={() => setOpenDropdown((prev) => !prev)}
          className="cursor-pointer rounded-full bg-[#F4F6F8] w-10 h-10 flex items-center justify-center"
        >
          <Image
            src={profile?.data?.profileImage || userProfile?.src}
            alt="User"
            width={28}
            height={28}
            className="w-full h-full object-cover rounded-full p-2"
          />
        </div>

        {openDropdown && (
          <CommonBorder size="xs" className="absolute top-14 right-0 w-48 z-50">
            <div className="flex flex-col">
              {menuItems.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleMenuClick(item.title)}
                  className="flex items-center gap-2 cursor-pointer transition hover:bg-[#212B36] p-2 rounded-md"
                >
                  {item.title === "Change Password" ? (
                    <RiLockPasswordLine size={20} className="text-white" />
                  ) : (
                    <Image
                      src={item.icon}
                      alt={item.title}
                      width={20}
                      height={20}
                    />
                  )}
                  <CommonHeader size="sm">{item.title}</CommonHeader>
                </div>
              ))}
            </div>
          </CommonBorder>
        )}
      </div>

      {activeMenu === "Current Plan" && (
        <SubscriptionDropdownItem
          handleClose={handleClose}
          subscriptionNeed={subscriptionNeed}
        />
      )}

      {activeMenu === "Settings" && (
        <SettingsDialog handleClose={handleClose} />
      )}
      {activeMenu === "Change Password" && (
        <ChangePasswordDialog handleClose={handleClose} />
      )}
      {activeMenu === "Logout" && <LogoutDialog handleClose={handleClose} />}
    </div>
  );
};

export default Dropdown;
