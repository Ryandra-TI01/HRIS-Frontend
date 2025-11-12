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

// example user data
const resUser = {
  "success": true,
  "message": "Login successful",
  "data": {
    "access_token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
    "token_type": "bearer",
    "user": {
      "id": 1,
      "name": "Admin HR",
      "email": "admin@hris.com",
      "role": "admin_hr"
    }
  }
}

const dataUser = resUser.data.user

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
                  {dataUser.role === "admin_hr" ? "HRIS " : dataUser.role === "manager" ? "Manager Management " : "Employee Management "}
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={dataUser.role === "admin_hr" ? sidebarMenu.navMain.admin_hr : dataUser.role === "manager" ? sidebarMenu.navMain.manager : []} />
        <NavPersonal items={sidebarMenu.personal} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={dataUser} />
      </SidebarFooter>
    </Sidebar>
  )
}
