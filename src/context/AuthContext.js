import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useReducer, useEffect } from "react";
export const AuthContext = createContext(null);
export const authReducer = (state, action) => {
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
export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, { user: null, token: null, products: [], isLoading: true });
    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("user"));
        if (stored && stored.user && stored.token) {
            dispatch({ type: "LOGIN", payload: { user: stored.user, token: stored.token } });
        }
        dispatch({ type: "LOADED" });
    }, []);
    return _jsx(AuthContext.Provider, { value: { ...state, dispatch }, children: children });
};
