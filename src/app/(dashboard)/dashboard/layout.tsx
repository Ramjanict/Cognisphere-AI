import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import ContentPage from "@/components/ContentPage";
import Dropdown from "@/components/Dropdown";
import ProtectedDashboard from "@/components/ProtectedDashboard";

export default function Layout() {
  return (
    <ProtectedDashboard>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header
            className="flex  border-b border-[#212B36] bg-[#161C24] shadow-[0_12px_24px_-4px_rgba(53,59,65,0.16)]
            h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear 
        group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 sticky top-0 z-40"
          >
            <div className="flex w-full justify-between items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1 cursor-pointer" />
              <Dropdown />
            </div>
          </header>

          <div className="flex flex-1 flex-col gap-4 bg-black p-4  ">
            <ContentPage />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ProtectedDashboard>
  );
}
