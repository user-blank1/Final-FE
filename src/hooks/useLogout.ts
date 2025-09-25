import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router";
export const useLogout = () => {
    const navigate = useNavigate();
    const { dispatch } = useAuthContext()!;

    const logout = async () => {
        try {
            await fetch("/api/auth/logout", {
                method: "GET",
                credentials: "include",
            });
        } catch (error) {
            console.error("Logout request failed:", error);
        }
        localStorage.removeItem("user");
        navigate("/auth/login");
        dispatch({ type: "LOGOUT" });
    };

    return { logout };
};
