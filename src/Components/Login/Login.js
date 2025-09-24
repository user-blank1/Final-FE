import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./Login.module.scss";
import { useState, useEffect } from "react";
import { useLogin } from "../../hooks/useLogin";
function Login() {
    const { login, loading, error } = useLogin();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [responseText, setResponseText] = useState("");
    useEffect(() => {
        if (username && (username.length < 3 || username.length > 20)) {
            setUsernameError("Username must be between 3 and 20 characters.");
        }
        else {
            setUsernameError("Format is correct");
        }
        if (username.length === 0)
            setUsernameError("");
    }, [username]);
    useEffect(() => {
        if (password && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(password)) {
            setPasswordError("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.");
        }
        else {
            setPasswordError("Format is correct");
        }
        if (password.length === 0)
            setPasswordError("");
    }, [password]);
    useEffect(() => {
        if (loading)
            return;
        if (error) {
            setResponseText("Error: " + error);
        }
        else if (!error && username && password) {
            setResponseText("Success!");
        }
        else {
            setResponseText("");
        }
    }, [error, loading]);
    const submitForm = async (e) => {
        const form = e.currentTarget;
        const formData = new FormData(form);
        const username = formData.get("username");
        const password = formData.get("password");
        setResponseText("");
        await login(username, password);
    };
    return (_jsxs("div", { className: `${styles["form-wrap"]}`, children: [_jsx("h1", { className: "mb-4 text-success", children: "Log In to Best Rent" }), _jsxs("form", { className: "d-flex flex-column gap-4", onSubmit: (e) => {
                    e.preventDefault();
                    submitForm(e);
                }, children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "username", className: "form-label text-white", children: "Username" }), _jsx("input", { type: "text", className: "form-control", id: "username", name: "username", onChange: (e) => setUsername(e.target.value) }), _jsx("div", { className: `${usernameError === "Format is correct" ? "text-white" : "text-warning"} ${styles.errorUsername}`, children: usernameError })] }), _jsxs("div", { className: "mt-3", children: [_jsx("label", { htmlFor: "password", className: "form-label text-white", children: "Password" }), _jsx("input", { type: "password", className: "form-control", id: "password", name: "password", onChange: (e) => setPassword(e.target.value) }), _jsx("div", { className: `${passwordError === "Format is correct" ? "text-white" : "text-warning"} ${styles.errorPassword}`, children: passwordError })] }), _jsx("button", { type: "submit", className: "btn btn-success mt-4", disabled: usernameError !== "Format is correct" || passwordError !== "Format is correct" || loading, children: "Log In" })] }), _jsx("div", { className: `${responseText.includes("Error") ? "text-warning" : "text-white"}`, children: responseText })] }));
}
export default Login;
