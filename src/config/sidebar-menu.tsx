import { Calendar, ChartNoAxesColumnIncreasing, CreditCard, LayoutDashboard, Send, UserCircle, Users } from "lucide-react"

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
        url: "/admin/employees",
        icon: Users,
      },
      {
        title: "Team Attadance",
        url: "/admin/attendances",
        icon: Calendar,
      },
      {
        title: "Leaves",
        url: "/admin/leave-requests",
        icon: Send,
      },
      {
        title: "Salary Slips",
        url: "/admin/salary-slips",
        icon: CreditCard,
      },
      {
        title: "Performance Reviews",
        url: "/admin/performance-reviews",
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
        title: "Team Members",
        url: "/manager/employees",
        icon: Users,
      },
      {
        title: "Team Attadance",
        url: "/manager/attendances",
        icon: Calendar,
      },
      {
        title: "Team Leaves",
        url: "/manager/leave-requests",
        icon: Send,
      },
      {
        title: "Team Performances",
        url: "/manager/performance-reviews",
        icon: ChartNoAxesColumnIncreasing,
      }
    ]
  },
  personalEmployee: [
    {
      title: "Dashboard",
      url: "/employee/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "My Leaves",
      url: "/employee/leave-requests",
      icon: Send,
    },
    {
      title: "My Attendance",
      url: "/attendances/me",
      icon: Calendar,
    },
    {
      title: "My Salary",
      url: "/employee/salary-slips",
      icon: CreditCard,
    },
    {
      title: "My Performance Review",
      url: "/employee/performance-reviews",
      icon: ChartNoAxesColumnIncreasing,
    },
    {
      title: "My Profile",
      url: "/employee/profile",
      icon: UserCircle,
    }
  ],
  personalManager: [
    {
      title: "My Salary",
      url: "/employee/salary-slips",
      icon: CreditCard,
    },
    {
      title: "My Profile",
      url: "/employee/profile",
      icon: UserCircle,
    }
  ],
}