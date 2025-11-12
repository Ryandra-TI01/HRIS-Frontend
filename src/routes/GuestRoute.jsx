import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function GuestRoute() {
  const { token, user } = useAuth();

  // if authenticated → redirect to appropriate dashboard
  if (token && user) {
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
