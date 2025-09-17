import { createContext, useReducer, useEffect } from "react";
import type { ReactNode } from "react";

interface User {
    _id: string;
    username: string;
    email: string;
    role: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
}

interface AuthAction {
    type: "LOGIN" | "LOGOUT" | "LOADED";
    payload?: { user: User; token: string };
}

export interface AuthContextType {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    dispatch: React.Dispatch<AuthAction>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case "LOGIN":
            return { user: action.payload!.user, token: action.payload!.token, isLoading: false };
        case "LOGOUT":
            return { user: null, token: null, isLoading: false };
        case "LOADED":
            return { ...state, isLoading: false };
        default:
            return state;
    }
};

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(authReducer, { user: null, token: null, isLoading: true });
    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("user")!);
        if (stored && stored.user && stored.token) {
            dispatch({ type: "LOGIN", payload: { user: stored.user, token: stored.token } });
        }
        dispatch({ type: "LOADED" });
    }, []);
    return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>;
};
