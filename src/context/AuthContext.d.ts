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
    payload?: {
        user: User;
        token: string;
    } | {
        products: Product[];
    };
}
export interface AuthContextType {
    user: User | null;
    token: string | null;
    products?: Product[];
    isLoading: boolean;
    dispatch: React.Dispatch<AuthAction>;
}
export declare const AuthContext: import("react").Context<AuthContextType | null>;
export declare const authReducer: (state: AuthState, action: AuthAction) => AuthState;
export declare const AuthContextProvider: ({ children }: {
    children: ReactNode;
}) => import("react/jsx-runtime").JSX.Element;
export {};
