import { Calendar, ChartNoAxesColumnIncreasing, CreditCard, LayoutDashboard, Send, Users } from "lucide-react"

export const sidebarMenu = {
  navMain: {
    admin_hr: [
      {
        title: "Dashboard",
        url: "/admin/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Employees",
        url: "/employees",
        icon: Users,
      },
      {
        title: "Team Attadance",
        url: "/attendances",
        icon: Calendar,
      },
      {
        title: "Leaves",
        url: "/leave-requests",
        icon: Send,
      },
      {
        title: "Salary Slips",
        url: "/salary-slips",
        icon: CreditCard,
      },
      {
        title: "Performance Reviews",
        url: "/performance-reviews",
        icon: ChartNoAxesColumnIncreasing,
      },

    ],
    manager: [
      {
        title: "Dashboard",
        url: "/manager/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Team Attadance",
        url: "/attendances",
        icon: Calendar,
      },
      {
        title: "Team Leaves",
        url: "/leave-requests",
        icon: Send,
      },
      {
        title: "Team Performances",
        url: "/performance-reviews",
        icon: ChartNoAxesColumnIncreasing,
      }
    ]
  },
  personal: [
    {
      title: "Dashboard",
      url: "/personal/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "My Leaves",
      url: "/leave-requests/me",
      icon: Send,
    },
    {
      title: "My Attendance",
      url: "/attendances/me",
      icon: Calendar,
    },
    {
      title: "My Salary",
      url: "/salary-slips/me",
      icon: CreditCard,
    },
    {
      title: "My Performance Review",
      url: "/performance-reviews/me",
      icon: ChartNoAxesColumnIncreasing,
    },
  ],
}