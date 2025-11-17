import * as React from "react"

import { NavMain } from "@/components/private/nav-main"
import { NavUser } from "@/components/private/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavPersonal } from "@/components/private/nav-personal"
import { sidebarMenu } from "@/config/sidebar-menu"
// @ts-ignore
import { useAuth } from "../../context/AuthContext"

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
              <a href="">
                <span className="text-base font-semibold">
                  {user?.role === "admin_hr" ? "HRIS " : user?.role === "manager" ? "Manager Management " : "Employee Management "}
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={user?.role === "admin_hr" ? sidebarMenu.navMain.admin_hr : user?.role === "manager" ? sidebarMenu.navMain.manager : []} />
        <NavPersonal items={sidebarMenu.personal} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
