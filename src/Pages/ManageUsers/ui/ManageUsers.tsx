import styles from "./ManageUsers.module.scss";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import Button from "@components/Button";
interface User {
    _id: string;
    username: string;
    email: string;
    role: string;
}
function ManageUsers() {
    const [users, setUsers] = useState<User[]>([]);
    const { user, isLoading, token } = useAuthContext()!;
    const [error, setError] = useState<null | string>(null);
    const [id, setId] = useState<string>("");
    const [disabled, setDisabled] = useState<boolean>(true);
    useEffect(() => {
        if (isLoading) return;
        if (!user || user.role !== "admin") {
            return;
        }
        const fetchUsers = async () => {
            setError(null);
            const res = await fetch("https://final-be-production-ddac.up.railway.app/api/auth/users", {
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

    useEffect(() => {}, [users, isLoading]);

    const navigate = useNavigate();
    const navigateFn = () => {
        navigate(`/admin/edit-user/${id}`);
    };
    return (
        <div className={styles.ManageUsers}>
            {" "}
            <div className={`${styles.backButton}`} onClick={() => navigate(-1)}>
                <a href="#" className={`text-white`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="white" className="bi bi-arrow-left" viewBox="0 0 16 16">
                        <path
                            fillRule="evenodd"
                            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                        />
                    </svg>
                </a>
            </div>
            <div className="h-100 w-100 d-flex flex-column justify-content-center align-items-center">
                {error && <p className="text-danger text-center w-100 my-5 fs-2">{error}</p>}
                {users.length === 0 && !isLoading && <p>No users found</p>}
                {isLoading && <p>Loading...</p>}
                <h2 className="text-white py-4 text-center">Select User to Manage</h2>
                <div className="my-4">
                    <select
                        className={`form-select ${styles.select}`}
                        defaultValue=""
                        aria-label="Select user to manage"
                        onChange={(e) => {
                            if (e.target.value === "") {
                                setDisabled(true);
                                return;
                            }
                            setDisabled(false);
                            setId(e.target.value);
                        }}
                    >
                        <option key={"default"} value={""}>
                            Select User...
                        </option>
                        {users
                            .filter((user) => user.role !== "admin")
                            .map((user) => (
                                <option key={user._id} value={user._id}>
                                    {user.username}
                                </option>
                            ))}
                    </select>
                </div>
                <Button
                    disabled={disabled}
                    text="View User"
                    isBordered={false}
                    textColor="white"
                    backgroundColor="orange"
                    onClick={(e) => {
                        e.preventDefault();
                        navigateFn();
                    }}
                />
            </div>
        </div>
    );
}

export default ManageUsers;
