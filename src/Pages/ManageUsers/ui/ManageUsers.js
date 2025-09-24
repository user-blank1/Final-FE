import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./ManageUsers.module.scss";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import Button from "@components/Button";
function ManageUsers() {
    const [users, setUsers] = useState([]);
    const { user, isLoading, token } = useAuthContext();
    const [error, setError] = useState(null);
    const [id, setId] = useState("");
    const [disabled, setDisabled] = useState(true);
    useEffect(() => {
        if (isLoading)
            return;
        if (!user || user.role !== "admin") {
            return;
        }
        const fetchUsers = async () => {
            setError(null);
            const res = await fetch("/api/auth/users", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const json = await res.json();
            if (res.ok) {
                setUsers(json);
            }
            if (!res.ok) {
                setError(json.error);
            }
        };
        fetchUsers();
    }, []);
    useEffect(() => { }, [users, isLoading]);
    const navigate = useNavigate();
    const navigateFn = () => {
        navigate(`/admin/edit-user/${id}`);
    };
    return (_jsxs("div", { className: styles.ManageUsers, children: [" ", _jsx("div", { className: `${styles.backButton}`, onClick: () => navigate(-1), children: _jsx("a", { href: "#", className: `text-white`, children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "48", height: "48", fill: "white", className: "bi bi-arrow-left", viewBox: "0 0 16 16", children: _jsx("path", { fillRule: "evenodd", d: "M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" }) }) }) }), _jsxs("div", { className: "h-100 w-100 d-flex flex-column justify-content-center align-items-center", children: [error && _jsx("p", { className: "text-danger text-center w-100 my-5 fs-2", children: error }), users.length === 0 && !isLoading && _jsx("p", { children: "No users found" }), isLoading && _jsx("p", { children: "Loading..." }), _jsx("h2", { className: "text-white py-4 text-center", children: "Select User to Manage" }), _jsx("div", { className: "my-4", children: _jsxs("select", { className: `form-select ${styles.select}`, defaultValue: "", "aria-label": "Select user to manage", onChange: (e) => {
                                if (e.target.value === "") {
                                    setDisabled(true);
                                    return;
                                }
                                setDisabled(false);
                                setId(e.target.value);
                            }, children: [_jsx("option", { value: "", children: "Select User..." }, "default"), users
                                    .filter((user) => user.role !== "admin")
                                    .map((user) => (_jsx("option", { value: user._id, children: user.username }, user._id)))] }) }), _jsx(Button, { disabled: disabled, text: "View User", isBordered: false, textColor: "white", backgroundColor: "orange", onClick: (e) => {
                            e.preventDefault();
                            navigateFn();
                        } })] })] }));
}
export default ManageUsers;
