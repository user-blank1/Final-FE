import { useAuthContext } from "../../hooks/useAuthContext";
import { Navigate, Outlet } from "react-router-dom";

export function RequireAdmin() {
    const { user, isLoading } = useAuthContext();
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (!user || user.role !== "admin") {
        return <Navigate to="/" replace />;
    }
    return <Outlet />;
}
