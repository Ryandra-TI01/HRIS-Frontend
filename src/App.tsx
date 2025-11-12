import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/main-layouts"
import AdminDashboard from "@/pages/admin/admin-dashboard";
import { ThemeProvider } from "next-themes"
import LoginPage from "./features/auth/pages/login-page";

// @ts-ignore
import ProtectedRoute from "./routes/ProtectedRoute";
// @ts-ignore
import GuestRoute from "./routes/GuestRoute";
// @ts-ignore
import PubicLayout from "./layouts/public-layouts";

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <BrowserRouter>
        <Routes>

          {/* ROUTE TESTER BEFORE AUTH BACKEND */}
          <Route element={<PubicLayout />}>
            <Route path="login" element={<LoginPage />} />
          </Route>

          <Route element={<MainLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Route>

          {/* AUTH ROUTES */}
          <Route element={<GuestRoute />}>
          </Route>

          {/* AUTHENTICATED */}
           <Route
            element={<ProtectedRoute allowedRoles={["admin_hr", "manager", "employee"]} />}
          >
          </Route>

        </Routes>
      </BrowserRouter>
    </ThemeProvider>

  );
}
