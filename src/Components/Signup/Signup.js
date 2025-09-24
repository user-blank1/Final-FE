import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./Signup.module.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSignup } from "../../hooks/useSignup";
function Signup() {
    const { signup, loading } = useSignup();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [emailError, setEmailError] = useState("");
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
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setEmailError("Invalid email format.");
        }
        else {
            setEmailError("Format is correct");
        }
        if (email.length === 0)
            setEmailError("");
    }, [email]);
    const submitForm = async (e) => {
        const form = e.currentTarget;
        const formData = new FormData(form);
        const email = formData.get("email");
        const username = formData.get("username");
        const password = formData.get("password");
        setResponseText("");
        const result = await signup(username, email, password);
        if (result?.success) {
            setResponseText("Success!");
            setTimeout(() => {
                navigate("/");
            }, 1000);
        }
        else {
            setResponseText(result?.error);
        }
    };
    return (_jsxs("div", { className: `${styles["form-wrap"]}`, children: [_jsx("h1", { className: "mb-4 text-success", children: "Sign Up to Best Rent" }), _jsxs("form", { className: "d-flex flex-column gap-4", onSubmit: (e) => {
                    e.preventDefault();
                    submitForm(e);
                }, children: [_jsxs("div", { children: [_jsx("label", { htmlFor: "email", className: "form-label text-white", children: "Email address" }), _jsx("input", { type: "email", className: "form-control", id: "email", name: "email", onChange: (e) => setEmail(e.target.value) }), _jsx("div", { className: `${emailError === "Format is correct" ? "text-white" : "text-warning"} ${styles.errorEmail}`, children: emailError })] }), _jsxs("div", { children: [_jsx("label", { htmlFor: "username", className: "form-label text-white", children: "Username" }), _jsx("input", { type: "text", className: "form-control", id: "username", name: "username", onChange: (e) => setUsername(e.target.value) }), _jsx("div", { className: `${usernameError === "Format is correct" ? "text-white" : "text-warning"} ${styles.errorUsername}`, children: usernameError })] }), _jsxs("div", { className: "mt-3", children: [_jsx("label", { htmlFor: "password", className: "form-label text-white", children: "Password" }), _jsx("input", { type: "password", className: "form-control", id: "password", name: "password", onChange: (e) => setPassword(e.target.value) }), _jsx("div", { className: `${passwordError === "Format is correct" ? "text-white" : "text-warning"} ${styles.errorPassword}`, children: passwordError })] }), _jsx("button", { type: "submit", className: "btn btn-success mt-4", disabled: usernameError !== "Format is correct" || passwordError !== "Format is correct" || emailError !== "Format is correct", children: "Sign Up" }), loading && _jsx("div", { children: "Loading..." })] }), _jsx("div", { className: `${responseText.includes("Error") ? "text-warning" : "text-white"}`, children: responseText })] }));
}
export default Signup;
