import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./EditProducts.module.scss";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import ToolCard from "@components/ToolCard";
function EditProducts() {
    const { token, isLoading } = useAuthContext();
    const [err, setError] = useState(null);
    const [products, setProducts] = useState([]);
    useEffect(() => {
        if (isLoading)
            return;
        if (!token)
            return;
        const getAll = async () => {
            const res = await fetch("/api/products/all/admin", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const json = await res.json();
            console.log(json);
            if (!res.ok) {
                setError(json.message);
            }
            if (res.ok) {
                setError(null);
                setProducts(json.products);
            }
        };
        getAll();
    }, [isLoading, token]);
    const deleteRentedProduct = async (id) => {
        console.log(id);
        const res = await fetch(`/api/products/admin/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (!res.ok) {
            alert("Failed to delete the product");
        }
        if (res.ok) {
            alert("Product deleted successfully");
            setTimeout(() => {
                window.location.reload();
            }, 300);
        }
    };
    return (_jsxs("div", { className: styles.editProducts, children: [_jsx("h1", { className: "text-white text-center my-3", children: "Edit Products" }), _jsx("div", { children: err && _jsx("p", { className: `text-danger w-100 fs-3`, children: err }) }), !err && (_jsx("div", { className: "container d-flex flex-wrap flex-column flex-xl-row justify-content-center align-items-center gap-4 my-4", children: products.map((product) => {
                    return (_jsx(ToolCard, { price: product.price, showPrice: true, text: product.description, title: product.name, isWide: true, showBtn: false, adminDelete: true, onDelete: () => deleteRentedProduct(product._id), productId: product._id, adminActions: true, draft: product.draft, isRented: product.rentedBy, imgSrc: `http://localhost:3000/uploads/${product.imageUrl.replace("uploads/", "")}` }, product._id));
                }) }))] }));
}
export default EditProducts;
