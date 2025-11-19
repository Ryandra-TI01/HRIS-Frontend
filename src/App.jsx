import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/main-layouts";
import { ThemeProvider } from "next-themes";
import LoginPage from "./features/auth/pages/login-page";

import ProtectedRoute from "./routes/ProtectedRoute";
import GuestRoute from "./routes/GuestRoute";
import PublicLayout from "./layouts/public-layouts";
import EmployeePage from "./features/employees/pages/EmployeePage";
import EmployeeCreatePage from "./features/employees/pages/EmployeeCreatePage";
import EmployeeEditPage from "./features/employees/pages/EmployeeEditPage";
import AttadancePage from "./features/attendances/pages/AttendancePage";
import AdminDashboard from "./features/dashboards/pages/AdminDashboard";
import ManagerDashboard from "./features/dashboards/pages/ManagerDashboard";
import EmployeeDashboard from "./features/dashboards/pages/EmployeeDashboard";
import MyAttendancePage from "./features/attendances/pages/MyAttendancePage";
import LandingPage from "./features/landing/pages/LandingPage";

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <BrowserRouter>
        <Routes>
          {/* AUTH ROUTES */}
          <Route element={<GuestRoute />}>
            <Route element={<PublicLayout />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
            </Route>
          </Route>

            {/* AUTHENTICATED */}
          <Route element={<MainLayout />}>
            {/* ROLE ADMIN */}
            <Route element={<ProtectedRoute allowedRoles={["admin_hr"]} />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/employees" element={<EmployeePage />} />
              <Route path="/admin/employees/create" element={<EmployeeCreatePage />} />
              <Route path="/admin/employees/edit/:id" element={<EmployeeEditPage />} />
              <Route path="/admin/attendances" element={<AttadancePage />} />
            </Route>

            {/* ROLE MANAGER */}
            <Route element={<ProtectedRoute allowedRoles={["manager"]} />} >
              <Route path="/manager/dashboard" element={<ManagerDashboard />} />
            </Route>

            {/* ROLE EMPLOYEE, DEFAULT ALL */}
            <Route element={<ProtectedRoute allowedRoles={["employee", "admin_hr", "manager"]} />}>
              <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
              <Route path="/attendances/me" element={<MyAttendancePage />} />
            </Route>

          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
