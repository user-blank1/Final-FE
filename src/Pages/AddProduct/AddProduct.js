import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./AddProduct.module.scss";
import Button from "@components/Button";
import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
function AddProduct() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const { token } = useAuthContext();
    console.log(token);
    const submitProduct = async (e) => {
        e.preventDefault();
        setError("");
        const form = e.currentTarget;
        const productName = form.productName.value;
        const productDescription = form.productDescription.value;
        const productPrice = form.productPrice.value;
        const productImage = form.productImage.files[0];
        const available = form.available.checked;
        const popularity = form.popularity.value;
        const formData = new FormData();
        formData.append("productName", productName);
        formData.append("productDescription", productDescription);
        formData.append("productPrice", productPrice);
        formData.append("productImage", productImage);
        formData.append("available", available.toString());
        formData.append("popularity", popularity);
        const res = await fetch("/api/products", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });
        const json = await res.json();
        if (!res.ok) {
            setError(json.error);
        }
        if (res.ok) {
            setError("Product added!");
        }
    };
    return (_jsxs("div", { className: styles.AddProduct, children: [_jsx("h1", { children: "Add Product to the store" }), _jsx("div", { className: `${styles.backButton}`, onClick: () => navigate(-1), children: _jsx("a", { href: "#", className: `text-white`, children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "48", height: "48", fill: "black", className: "bi bi-arrow-left", viewBox: "0 0 16 16", children: _jsx("path", { fillRule: "evenodd", d: "M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" }) }) }) }), _jsxs("form", { className: `px-1 py-5 bg-black ${styles.form} rounded-1 `, onSubmit: (e) => {
                    submitProduct(e);
                }, children: [_jsxs("div", { className: "d-flex flex-column gap-2 mb-4", children: [_jsx("label", { htmlFor: "productName", className: "text-white", children: "Product Name" }), _jsx("input", { type: "text", id: "productName", name: "productName", className: "rounded-2", required: true })] }), _jsxs("div", { className: "d-flex flex-column gap-2 mb-4", children: [_jsx("label", { htmlFor: "productDescription", className: "text-white", children: "Product Description" }), _jsx("textarea", { id: "productDescription", name: "productDescription", className: "rounded-2", required: true })] }), _jsxs("div", { className: "d-flex flex-column gap-2 mb-4", children: [_jsx("label", { htmlFor: "productPrice", className: "text-white", children: "Product Price/Day" }), _jsx("input", { type: "number", id: "productPrice", name: "productPrice", className: "rounded-2", required: true })] }), _jsxs("div", { className: "d-flex flex-column gap-2 mb-4", children: [_jsx("label", { htmlFor: "productImage", className: "text-white", children: "Product Image" }), _jsx("input", { type: "file", id: "productImage", name: "productImage", accept: "image/*", required: true, className: "text-white border rounded-2" })] }), _jsxs("div", { className: "d-flex flex-row gap-2 mb-4", children: [_jsx("label", { htmlFor: "popularity", className: "text-white", children: "Popularity" }), _jsx("input", { min: "0", type: "number", id: "popularity", name: "popularity", className: " border rounded-2" })] }), _jsxs("div", { className: "d-flex flex-row gap-2 mb-4", children: [_jsx("label", { htmlFor: "available", className: "text-white", children: "Available" }), _jsx("input", { type: "checkbox", id: "available", name: "available" })] }), _jsx(Button, { text: "Add Product", isBordered: false, type: "submit" }), error && _jsx("div", { className: ` ${error !== "Product added!" ? "text-danger" : "text-success"}`, children: error })] })] }));
}
export default AddProduct;
