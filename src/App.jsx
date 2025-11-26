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
import MyLeavesPage from "./features/leave-requests/pages/MyLeavesPage";
import MyLeaveCreatePage from "./features/leave-requests/pages/MyLeaveCreatePage";

import PerformanceReviewPage from "./features/performance-reviews/pages/PerformanceReviewPage";
import PerformanceReviewCreatePage from "./features/performance-reviews/pages/PerformanceReviewCreatePage";
import PerformanceReviewEditPage from "./features/performance-reviews/pages/PerformanceReviewEditPage";
import MyPerformanceReviewPage from "./features/performance-reviews/pages/MyPerformanceReviewPage";
import LeavesPage from "./features/leave-requests/pages/LeavesPage";
import SalarySlipsPage from "./features/salary-slips/pages/SalarySlipsPage";
import SalarySlipCreatePage from "./features/salary-slips/pages/SalarySlipCreatePage";
import SalarySlipEditPage from "./features/salary-slips/pages/SalarySlipEditPage";
import MySalaryPage from "./features/salary-slips/pages/MySalaryPage";
import ProfilePage from "./features/profile/pages/ProfilePage";


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
              
              {/* ADMIN DASHBOARD */}
              <Route path="/admin/dashboard" element={<AdminDashboard />} />

              {/* EMPLOYEE MANAGEMENT */}
              <Route path="/admin/employees" element={<EmployeePage />} />
              <Route path="/admin/employees/create" element={<EmployeeCreatePage />} />
              <Route path="/admin/employees/edit/:id" element={<EmployeeEditPage />} />
              
              {/* ATTENDANCE MANAGEMENT */}
              <Route path="/admin/attendances" element={<AttadancePage />} />
              
              {/* PERFORMANCE REVIEW MANAGEMENT */}
              <Route path="/admin/performance-reviews" element={<PerformanceReviewPage />} />
              <Route path="/admin/performance-reviews/create" element={<PerformanceReviewCreatePage />} />
              <Route path="/admin/performance-reviews/edit/:id" element={<PerformanceReviewEditPage />} />

              {/* LEAVE REQUEST MANAGEMENT */}
              <Route path="/admin/leave-requests" element={<LeavesPage />} />

              {/* SALARY SLIP MANAGEMENT */}
              <Route path="/admin/salary-slips" element={<SalarySlipsPage />} />
              <Route path="/admin/salary-slips/create" element={<SalarySlipCreatePage />} />
              <Route path="/admin/salary-slips/edit/:id" element={<SalarySlipEditPage />} />

            </Route>

            {/* ROLE MANAGER */}
            <Route element={<ProtectedRoute allowedRoles={["manager"]} />} >
              <Route path="/manager/dashboard" element={<ManagerDashboard />} />
              <Route path="/manager/attendances" element={<AttadancePage />} />
              <Route path="/manager/employees" element={<EmployeePage />} />
              <Route path="/manager/leave-requests" element={<LeavesPage />} />
              <Route path="/manager/performance-reviews" element={<PerformanceReviewPage />} />
              <Route path="/manager/performance-reviews/create" element={<PerformanceReviewCreatePage />} />
              <Route path="/manager/performance-reviews/edit/:id" element={<PerformanceReviewEditPage />} />

            </Route>

            {/* ROLE EMPLOYEE, DEFAULT ALL */}
            <Route element={<ProtectedRoute allowedRoles={["employee", "admin_hr", "manager"]} />}>
              <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
              <Route path="/attendances/me" element={<MyAttendancePage />} />
              <Route path="/employee/leave-requests" element={<MyLeavesPage />} />
              <Route path="/employee/leaves/create" element={<MyLeaveCreatePage />} />
              <Route path="/employee/performance-reviews" element={<MyPerformanceReviewPage />} />
              <Route path="/employee/salary-slips" element={<MySalaryPage />} />
              <Route path="/employee/profile" element={<ProfilePage />} />

            </Route>

          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
