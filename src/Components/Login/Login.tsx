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
        } else {
            setUsernameError("Format is correct");
        }
        if (username.length === 0) setUsernameError("");
    }, [username]);
    useEffect(() => {
        if (password && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(password)) {
            setPasswordError("Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.");
        } else {
            setPasswordError("Format is correct");
        }
        if (password.length === 0) setPasswordError("");
    }, [password]);

    useEffect(() => {
        if (loading) return;
        if (error) {
            setResponseText("Error: " + error);
        } else if (!error && username && password) {
            setResponseText("Success!");
        } else {
            setResponseText("");
        }
    }, [error, loading]);

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        const form = e.currentTarget;
        const formData = new FormData(form);

        const username = formData.get("username") as string;
        const password = formData.get("password") as string;
        setResponseText("");
        await login(username, password);
    };
    return (
        <div className={`${styles["form-wrap"]}`}>
            <h1 className="mb-4 text-success">Log In to Best Rent</h1>
            <form
                className="d-flex flex-column gap-4"
                onSubmit={(e) => {
                    e.preventDefault();
                    submitForm(e);
                }}
            >
                <div>
                    <label htmlFor="username" className="form-label text-white">
                        Username
                    </label>
                    <input type="text" className="form-control" id="username" name="username" onChange={(e) => setUsername(e.target.value)} />
                    <div className={`${usernameError === "Format is correct" ? "text-white" : "text-warning"} ${styles.errorUsername}`}>{usernameError}</div>
                </div>
                <div className="mt-3">
                    <label htmlFor="password" className="form-label text-white">
                        Password
                    </label>
                    <input type="password" className="form-control" id="password" name="password" onChange={(e) => setPassword(e.target.value)} />
                    <div className={`${passwordError === "Format is correct" ? "text-white" : "text-warning"} ${styles.errorPassword}`}>{passwordError}</div>
                </div>
                <button
                    type="submit"
                    className="btn btn-success mt-4"
                    disabled={usernameError !== "Format is correct" || passwordError !== "Format is correct" || loading}
                >
                    Log In
                </button>
            </form>
            <div className={`${responseText.includes("Error") ? "text-warning" : "text-white"}`}>{responseText}</div>
        </div>
    );
}

export default Login;
