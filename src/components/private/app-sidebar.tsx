import * as React from "react";

import { NavMain } from "@/components/private/nav-main";
import { NavUser } from "@/components/private/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavPersonal } from "@/components/private/nav-personal";
import { sidebarMenu } from "@/config/sidebar-menu";

//@ts-ignore
import Logo from "@/components/Logo";
// @ts-ignore
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth();

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link to="/">
                <div className="w-full flex flex-col items-center justify-center pt-10 pb-6">
                  <Logo size={300} />
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={
            user?.role === "admin_hr"
              ? sidebarMenu.navMain.admin_hr
              : user?.role === "manager"
              ? sidebarMenu.navMain.manager
              : []
          }
        />
        <NavPersonal
          items={
            user?.role !== "manager"
              ? sidebarMenu.personalEmployee
              : sidebarMenu.personalManager
          }
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
