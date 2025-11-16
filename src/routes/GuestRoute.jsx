import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function GuestRoute() {
  const { token, loading , user} = useAuth();

  if (loading) return null; // atau splash

  // Jika user SUDAH login dan dia coba buka /login /register → redirect
  if (token) {
    return (
      <Navigate
        to={
          user.role === "admin_hr"
            ? "/admin/dashboard"
            : user.role === "manager"
            ? "/manager/dashboard"
            : "/employee/dashboard"
        }
        replace
      />
    );
  }

  return <Outlet />;
}
