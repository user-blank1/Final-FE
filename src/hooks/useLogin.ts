import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
    const navigate = useNavigate();

    const [error, setError] = useState<null | string>(null);
    const [loading, setIsLoading] = useState<boolean>(false);
    const { dispatch } = useAuthContext()!;

    const login = async (username: string, password: string) => {
        setIsLoading(true);
        setError(null);

        const res = await fetch("https://final-be-production-ddac.up.railway.app/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });
        const json = await res.json();

        if (!res.ok) {
            setIsLoading(false);
            console.log(json);
            setError(json.error);
        }
        if (res.ok) {
            localStorage.setItem("user", JSON.stringify(json));
            console.log(json);
            setError(null);
            dispatch({ type: "LOGIN", payload: json });
            setIsLoading(false);
            setTimeout(() => {
                navigate("/");
            }, 1000);
        }
    };
    return { login, loading, error };
};
