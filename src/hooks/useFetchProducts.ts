import { useState, useEffect } from "react";
import { useAuthContext } from "./useAuthContext";

export const useFetchProducts = () => {
    const { user, isLoading, token, dispatch } = useAuthContext();

    const [error, setError] = useState<null | string>(null);
    const [loading, setIsLoading] = useState<boolean>(false);

    const fetchProducts = async () => {
        if (isLoading || !token || !user?._id) {
            setError("Authentication not ready");

            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            const res = await fetch(`/api/auth/products/${user?._id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const json = await res.json();

            if (!res.ok) {
                setError(json.error || "Failed to fetch products");
                setIsLoading(false);
                return;
            }

            dispatch({ type: "UPDATE_USER_PRODUCTS", payload: { products: json.products } });
            setIsLoading(false);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Failed to fetch products");
            }
            setIsLoading(false);
        }
    };
    useEffect(() => {
        if (!isLoading && token && user?._id) {
            fetchProducts();
        }
    }, [isLoading, token, user?._id]);

    return { fetchProducts, loading, error };
};
