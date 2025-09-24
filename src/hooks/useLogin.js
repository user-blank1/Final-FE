import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";
export const useLogin = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();
    const login = async (username, password) => {
        setIsLoading(true);
        setError(null);
        const res = await fetch("/api/auth/login", {
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
