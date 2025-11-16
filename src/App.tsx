import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/main-layouts"
import AdminDashboard from "@/pages/admin/admin-dashboard";
import { ThemeProvider } from "next-themes"
import LoginPage from "./features/auth/pages/login-page";
import EmployeeCreatePage from "@/features/employees/pages/EmployeeCreatePage";
import EmployeeEditPage from "@/features/employees/pages/EmployeeEditPage";

// @ts-ignore
import ProtectedRoute from "./routes/ProtectedRoute";
// @ts-ignore
import GuestRoute from "./routes/GuestRoute";
// @ts-ignore
import PublicLayout from "./layouts/public-layouts";
// @ts-ignore
import EmployeePage from "./features/employees/pages/EmployeePage";


export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <BrowserRouter>
        <Routes>

          {/* AUTH ROUTES */}
          <Route element={<GuestRoute />}>
            <Route element={<PublicLayout />}>
              <Route path="login" element={<LoginPage />} />
            </Route>
          </Route>

          <Route element={<MainLayout />}>

            {/* AUTHENTICATED */}
            <Route
              element={<ProtectedRoute allowedRoles={["admin_hr"]} />}
            >
              <Route path="/admin/dashboard" element={<AdminDashboard />} />

            </Route>

          </Route>

        </Routes>
      </BrowserRouter>
    </ThemeProvider>

  );
}
