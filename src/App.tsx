import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/main-layouts"
import AdminDashboard from "@/pages/admin/admin-dashboard";
import { ThemeProvider } from "next-themes"

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>

  );
}
