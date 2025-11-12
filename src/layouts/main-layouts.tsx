import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/private/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function MainLayout() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 bg-muted/40 p-6">
          <SidebarTrigger className="mb-4" />
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
