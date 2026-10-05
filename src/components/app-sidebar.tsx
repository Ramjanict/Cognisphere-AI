"use client";

import { MoreVertical, PlusCircle, Search } from "lucide-react";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/lib/useDebounce";
import { shouldShowUpgradePopup } from "@/lib/utils";
import { useGetAllSessionQuery } from "@/store/api/AIApi";
import { logout } from "@/store/api/AuthState";
import { newQuery, setSelectedSessionId } from "@/store/api/chatSlice";
import { useGetProfileQuery } from "@/store/api/profileApi";
import { GetProfileRequest } from "@/store/api/types/profile";
import { AppDispatch, RootState } from "@/store/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import darkLogo from "../../public/images/cogni-logo-new-nobg.png";
import textGray from "../../public/images/grayText.svg";
import text from "../../public/images/text.svg";
import CommonButton from "./common/button/CommonButton";
import CommonBorder from "./common/custom/CommonBorder";
import CommonHeader from "./common/header/CommonHeader";
import DeleteDialog from "./delete-dialog";
import RenameDialog from "./rename-dialog";
import SubscriptionDropdownItem from "./subscription-dialog";

export function AppSidebar() {
  const [mounted, setMounted] = React.useState(false);
  const { data: allSessions } = useGetAllSessionQuery();
  const recentItems = allSessions?.data?.sessions ?? [];
  const [expanded, setExpanded] = React.useState(false);

  const [searchQuery, setSearchQuery] = React.useState("");
  const debouncedSearch = useDebounce(searchQuery, 400);

  const filteredItems = recentItems.filter((item) =>
    item.title.toLowerCase().includes(debouncedSearch.toLowerCase()),
  );

  const visibleItems = expanded ? filteredItems : filteredItems.slice(0, 3);
  const handleToggle = () => setExpanded(!expanded);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(setSelectedSessionId(""));
    router.push("/login");
  };

  const [open, setOpen] = React.useState(false);
  const [dismissed, setDismissed] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
    setDismissed(true);
  };

  const { data: profile } = useGetProfileQuery();
  const newChat: AppDispatch = useDispatch();

  const subscriptionNeed = shouldShowUpgradePopup(
    profile?.data as GetProfileRequest,
  );

  React.useEffect(() => {
    if (subscriptionNeed && !dismissed) {
      setOpen(true);
    }
  }, [subscriptionNeed, dismissed]);

  const handleNewQuery = () => {
    newChat(newQuery());
  };

  const handleSingleSession = (sessionId: string) => {
    dispatch(setSelectedSessionId(sessionId));
  };

  const { selectedSessionId } = useSelector((state: RootState) => state.chat);

  return (
    <div className="">
      <Sidebar
        collapsible="offcanvas"
        className="!bg-[#161C24] shadow-[0_12px_24px_-4px_rgba(53,59,65,0.16)]  "
      >
        <SidebarHeader className="p-3">
          <SidebarGroup>
            <SidebarGroupContent>
              <div className="flex flex-col gap-5 !bg-[#161C24]  ">
                <div className="flex items-center justify-between">
                  <div className=" border border-[#212B36]  rounded-2xl p-2">
                    <div className="relative w-8 h-8">
                      {mounted ? (
                        <Image
                          src={darkLogo}
                          alt="ChatGPT Logo"
                          fill
                          className="object-contain"
                          priority
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gray-700 animate-pulse rounded" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarHeader>

        <SidebarContent className="flex flex-col gap-4 p-3">
          <SidebarGroup>
            <SidebarGroupContent>
              <div className="flex flex-col gap-6">
                <CommonButton
                  onClick={handleNewQuery}
                  size="lg"
                  className="w-full flex items-center justify-center gap-2"
                >
                  New Query
                  <PlusCircle className="h-4 w-4" />
                </CommonButton>

                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search"
                    className="pl-8 bg-background border-border"
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="pt-6">
                <CommonHeader size="sm" className="mb-2 text-[#DFE3E8]">
                  Recent
                </CommonHeader>

                <hr className="border-[#454F5B] my-3" />

                <div
                  className={`space-y-1 pb-5 ${
                    !expanded ? "max-h-44 overflow-y-hidden" : ""
                  }`}
                >
                  {visibleItems.length > 0 && (
                    <div className="flex items-center gap-2">
                      <Image
                        src={
                          selectedSessionId === visibleItems[0].sessionId
                            ? text
                            : textGray
                        }
                        alt="Logo"
                        className="w-auto object-contain"
                      />
                      <CommonHeader
                        onClick={() =>
                          handleSingleSession(visibleItems[0].sessionId)
                        }
                        className={` w-full line-clamp-1 cursor-pointer ${
                          selectedSessionId === visibleItems[0].sessionId
                            ? "!text-[#fff]"
                            : "!text-[#637381]"
                        }`}
                      >
                        {visibleItems[0].title}
                      </CommonHeader>
                    </div>
                  )}

                  {visibleItems.slice(1).map((item) => (
                    <div
                      key={item.sessionId}
                      className="pl-2 flex items-center justify-between w-full transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Image
                          src={
                            selectedSessionId === item.sessionId
                              ? text
                              : textGray
                          }
                          alt="Logo"
                          className="w-auto object-contain"
                        />
                        <CommonHeader
                          onClick={() => handleSingleSession(item.sessionId)}
                          className={` w-full line-clamp-1 cursor-pointer ${
                            selectedSessionId === item.sessionId
                              ? "!text-[#fff]"
                              : "!text-[#637381]"
                          }`}
                        >
                          {item.title}
                        </CommonHeader>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-2 text-muted-foreground hover:text-foreground shrink-0 cursor-pointer">
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent
                          align="end"
                          className="w-40 bg-black border border-[#212B36] "
                        >
                          <RenameDialog sessionId={item.sessionId} />
                          <DeleteDialog sessionId={item.sessionId} />
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))}
                </div>

                {recentItems.length > 3 && (
                  <CommonButton
                    variant="secondary"
                    size="md"
                    className="mt-5 w-full font-bold !py-3 !bg-[linear-gradient(0deg,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.2)_100%),linear-gradient(0deg,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.2)_100%),linear-gradient(0deg,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.2)_100%),#212B36]"
                    onClick={handleToggle}
                  >
                    {expanded ? "See Less" : "See More"}
                  </CommonButton>
                )}
              </div>
              {recentItems.length === 0 && (
                <div className="text-sm text-[#DFE3E8]">
                  No recent history yet
                </div>
              )}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="p-3">
          <CommonBorder size="sm" className="!rounded-2xl">
            <div className="flex justify-end">
              <CommonButton
                onClick={() => setOpen(true)}
                variant="secondary"
                size="md"
                className="!px-6 mb-3"
              >
                Upgrade
              </CommonButton>
            </div>
            <div className="mb-6">
              <CommonHeader size="lg">
                {profile?.data.fullName || " "}
              </CommonHeader>
              <CommonHeader>{profile?.data.email || " "}</CommonHeader>
            </div>
            <CommonButton
              onClick={handleLogout}
              variant="secondary"
              className="w-full !py-3 !bg-white !text-[#161C24] !font-bold"
            >
              Logout
            </CommonButton>
          </CommonBorder>
        </SidebarFooter>

        <SidebarRail />
      </Sidebar>
      {open && (
        <SubscriptionDropdownItem
          handleClose={handleClose}
          subscriptionNeed={subscriptionNeed}
        />
      )}
    </div>
  );
}
