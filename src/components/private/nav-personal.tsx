import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link, useLocation } from "react-router"

export function NavPersonal({
  items,
}: {
  items: {
    title: string
    url: string
    icon: any
  }[]
}) {
  const location = useLocation();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Personal</SidebarGroupLabel>
      <SidebarMenu>
        {items.map(item => {
          const isActive = location.pathname === item.url;

          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                isActive={isActive} 
              >
                <Link to={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
