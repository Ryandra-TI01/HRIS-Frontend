import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/private/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function MainLayout() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">

        {/* SIDEBAR */}
        <AppSidebar />

        {/* CONTENT AREA */}
        <div
          className="
            flex-1 
            bg-white/5 dark:bg-neutral-900/30 
            p-4 sm:p-6 
            overflow-x-hidden
          "
        >
          {/* HEADER + SIDEBAR TRIGGER */}
          <header className="flex items-center mb-4 sticky top-0 bg-transparent z-20">
            <SidebarTrigger  />
          </header>

          {/* MAIN CONTENT */}
          <main
            className="
              mx-auto 
              w-full
              px-2 sm:px-6 lg:px-12 
              pb-12
            "
          >
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
