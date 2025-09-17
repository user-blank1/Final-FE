import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
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

        dispatch({ type: "LOGOUT" });
    };

    return { logout };
};
