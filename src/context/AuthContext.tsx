import { createContext, useReducer, useEffect } from "react";
import type { ReactNode } from "react";
interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    available: boolean;
    rentedBy: string | null;
    rentedFor: number;
    popularity: number;
    returnDate: string | null;
    __v: number;
}
interface User {
    _id: string;
    username: string;
    email: string;
    role: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    products?: Product[];
    isLoading: boolean;
}

interface AuthAction {
    type: "LOGIN" | "LOGOUT" | "LOADED" | "UPDATE_USER_PRODUCTS";
    payload?: { user: User; token: string } | { products: Product[] };
}

export interface AuthContextType {
    user: User | null;
    token: string | null;
    products?: Product[];
    isLoading: boolean;
    dispatch: React.Dispatch<AuthAction>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case "LOGIN":
            if (action.payload && "user" in action.payload) {
                return {
                    user: action.payload.user,
                    token: action.payload.token,
                    isLoading: false,
                };
            }
            return state;
        case "LOGOUT":
            return { user: null, token: null, isLoading: false };
        case "LOADED":
            return { ...state, isLoading: false };
        case "UPDATE_USER_PRODUCTS":
            if (action.payload && "products" in action.payload) {
                return {
                    ...state,
                    products: action.payload.products,
                };
            }
            return state;
        default:
            return state;
    }
};

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(authReducer, { user: null, token: null, products: [], isLoading: true });
    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("user")!);
        if (stored && stored.user && stored.token) {
            dispatch({ type: "LOGIN", payload: { user: stored.user, token: stored.token } });
        }
        dispatch({ type: "LOADED" });
    }, []);
    return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>;
};
