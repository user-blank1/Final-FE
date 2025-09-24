import { jsx as _jsx } from "react/jsx-runtime";
import { useAuthContext } from "../../hooks/useAuthContext";
import Welcome from "@pages/Welcome";
import Dashboard from "@pages/Dashboard";
export const HomeIndex = () => {
    const { user } = useAuthContext();
    return user ? _jsx(Dashboard, {}) : _jsx(Welcome, {});
};
