import { jsx as _jsx } from "react/jsx-runtime";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Navigate, Outlet } from "react-router-dom";
export function RequireAdmin() {
    const { user, isLoading } = useAuthContext();
    if (isLoading) {
        return _jsx("div", { children: "Loading..." });
    }
    if (!user || user.role !== "admin") {
        return _jsx(Navigate, { to: "/", replace: true });
    }
    return _jsx(Outlet, {});
}
