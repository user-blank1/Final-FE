import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    const [error, setError] = useState<null | string>(null);
    const [loading, setIsLoading] = useState<boolean>(false);
    const { dispatch } = useAuthContext()!;

    const signup = async (username: string, email: string, password: string) => {
        setIsLoading(true);
        setError(null);

        const res = await fetch("/api/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, username, password }),
        });
        const json = await res.json();

        if (!res.ok) {
            setIsLoading(false);
            setError(json.error);
        }
        if (res.ok) {
            localStorage.setItem("user", JSON.stringify(json));
            dispatch({ type: "LOGIN", payload: json });
            setIsLoading(false);
        }
    };
    return { signup, loading, error };
};
