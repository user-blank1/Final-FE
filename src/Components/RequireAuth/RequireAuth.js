import { jsx as _jsx } from "react/jsx-runtime";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Navigate, Outlet } from "react-router-dom";
export function RequireAuth() {
    const { user, isLoading } = useAuthContext();
    if (isLoading) {
        return _jsx("div", { className: "text-white", children: "Loading..." });
    }
    if (!user) {
        return _jsx(Navigate, { to: "/auth/login", replace: true });
    }
    return _jsx(Outlet, {});
}
