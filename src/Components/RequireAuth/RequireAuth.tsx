import { useAuthContext } from "../../hooks/useAuthContext";
import { Navigate, Outlet } from "react-router-dom";

export function RequireAuth() {
    const { user, isLoading } = useAuthContext();

    if (isLoading) {
        return <div className="text-white">Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/auth/login" replace />;
    }

    return <Outlet />;
}
