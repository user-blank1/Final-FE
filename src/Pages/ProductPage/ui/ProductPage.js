import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./ProductPage.module.scss";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import ToolCard from "@components/ToolCard";
import { useNavigate } from "react-router-dom";
import Button from "@components/Button/Button";
function ProductPage() {
    const navigate = useNavigate();
    const { title } = useParams();
    const [product, setProduct] = useState(null);
    const { token, isLoading, user } = useAuthContext();
    const [days, setDays] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [error, setError] = useState(null);
    const [show, setShow] = useState(false);
    useEffect(() => {
        const fetchProduct = async () => {
            if (isLoading)
                return;
            const response = await fetch(`/api/products/single/${title}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            console.log(data.product);
            if (!response.ok) {
                console.error(data.error);
            }
            else {
                setProduct(data.product);
            }
        };
        fetchProduct();
    }, [title, token, isLoading]);
    const rentFunction = async () => {
        const res = await fetch("/api/products/rent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                productTitle: product?.name,
                days,
                minutes,
                userId: user?._id,
            }),
        });
        const json = await res.json();
        if (!res.ok) {
            console.error(json.error);
            setError(json.error);
        }
        if (res.ok) {
            setError("Success!");
            setTimeout(() => {
                navigate("/");
            }, 1000);
        }
    };
    return (_jsx("div", { className: styles.productPage, children: _jsxs("div", { className: "d-flex h-100 w-100 align-items-center justify-content-center flex-column gap-4", children: [product && _jsx("h1", { className: "text-center text-white", children: product.available ? " Product is Available!" : "Not Available!" }), product ? (_jsx(ToolCard, { title: product.name, text: product.description, price: product.price, imgSrc: `http://localhost:3000/uploads/${product.imageUrl.replace("uploads/", "")}`, showBtn: false, showPrice: true })) : (_jsx("p", { children: "Loading..." })), _jsxs("div", { className: "rent-choose  d-flex flex-column align-items-center gap-4", children: [_jsx(Button, { disabled: !product?.available, text: product?.available ? " Rent Now" : "Not Available", textColor: "black", backgroundColor: "orange", isBordered: false, onClick: () => setShow(true) }), show && (_jsxs("div", { className: " d-flex flex-column gap-3 align-items-center justify-content-center p-4 bg-white rounded", children: [_jsx("label", { className: "fs-5 fw-bold", children: "Enter number of days to rent:" }), _jsx("input", { min: "0", defaultValue: "0", required: true, type: "number", placeholder: "Number of days", className: "p-2 rounded border w-100", onChange: (e) => setDays(Number(e.target.value)) }), _jsx("label", { className: "fs-5 fw-bold", children: "Enter number of minutes to rent:" }), _jsx("input", { min: "1", type: "number", placeholder: "Number of minutes", className: "p-2 rounded border w-100", onChange: (e) => setMinutes(Number(e.target.value)) }), _jsx(Button, { text: "Confirm", textColor: "white", backgroundColor: "blue", isBordered: false, onClick: () => rentFunction() })] })), _jsx("div", { children: error === "Success!" ? _jsx("p", { className: "text-success fs-3", children: error }) : _jsx("p", { className: "text-danger fs-3", children: error }) })] })] }) }));
}
export default ProductPage;
