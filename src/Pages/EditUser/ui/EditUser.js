import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./EditUser.module.scss";
import ToolCard from "@components/ToolCard";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
function EditUser() {
    const { token, isLoading } = useAuthContext();
    const { id } = useParams();
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [fetchError, setFetchError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            setError(null);
            const response = await fetch(`/api/auth/user/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (!response.ok) {
                setError("Failed to fetch user data");
                return;
            }
            if (response.ok) {
                setUserData(data.products);
                setError(null);
                return;
            }
        };
        fetchData();
    }, [isLoading, token]);
    useEffect(() => {
        if (userData && userData.length === 0) {
            setError("This user has no active rentals");
        }
        setSuccessMessage(null);
        setFetchError(null);
    }, [userData]);
    const deleteRentedProduct = async (id) => {
        const res = await fetch(`/api/products/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (!res.ok) {
            setFetchError("Failed to delete the product");
        }
        if (res.ok) {
            setFetchError(null);
            setSuccessMessage("Product deleted successfully");
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    };
    return (_jsxs("div", { className: styles.EditUser, children: [error && _jsx("div", { className: " text-white text-center w-100", children: error }), !error && _jsx("h1", { className: "text-white", children: "User's active rentals" }), _jsxs("div", { className: "container-fluid my-4 gap-4 d-flex flex-column flex-xl-row flex-wrap justify-content-center align-items-center", children: [userData &&
                        userData.map((rental) => (_jsx(ToolCard, { title: rental.name, imgSrc: `http://localhost:3000/uploads/${rental.imageUrl.replace("uploads/", "")}`, price: rental.price, isWide: false, text: rental.description, showBtn: false, returnDate: rental.returnDate, showDeleteBtn: true, productId: rental._id, onDelete: deleteRentedProduct }, rental.id))), ";"] }), successMessage && _jsx("p", { className: `${successMessage ? "text-white" : ""}w-100 text-center text-white`, children: successMessage }), fetchError && _jsx("p", { className: `${fetchError ? "text-danger" : ""}w-100 text-center  text-danger`, children: fetchError })] }));
}
export default EditUser;
