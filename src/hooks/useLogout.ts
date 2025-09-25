import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router";
export const useLogout = () => {
    const { dispatch } = useAuthContext()!;
    const navigate = useNavigate();
    const logout = async () => {
        try {
            await fetch("https://final-be-production-ddac.up.railway.app/api/auth/logout", {
                method: "GET",
                credentials: "include",
            });
        } catch (error) {
            console.error("Logout request failed:", error);
        }
        localStorage.removeItem("user");

        dispatch({ type: "LOGOUT" });
        navigate("/auth/login");
    };

    return { logout };
};
