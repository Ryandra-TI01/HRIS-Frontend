import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ allowedRoles }) {
    const { token, user } = useAuth();
    // if not authenticated → redirect to login
    if (!token || !user) return <Navigate to="/login" replace />

    // if role not allowed → redirect to home
    if(allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/" replace />
    return <Outlet />;
}