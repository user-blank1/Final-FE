import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./AllProducts.module.scss";
import ToolCard from "@components/ToolCard";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
function AllProducts() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const { token, isLoading, user } = useAuthContext();
    useEffect(() => {
        const getAll = async () => {
            setError(null);
            if (isLoading)
                return;
            const res = await fetch("/api/products/all", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: ` Bearer ${token}`,
                },
            });
            const json = await res.json();
            console.log(json);
            if (!res.ok) {
                setError(json.error);
            }
            if (res.ok) {
                setProducts(json.products);
            }
        };
        getAll();
    }, [token, isLoading, user]);
    return (_jsxs("div", { className: "d-flex  container align-items-center gap-4 py-5 w-100 flex-wrap", children: [_jsx("div", { className: "text-white fs-1 text-center w-100", children: "All Products" }), error && _jsx("div", { className: "text-danger", children: error }), _jsxs("div", { className: `${styles["all-products-container"]} justify-content-center d-flex flex-column flex-lg-row flex-wrap gap-5 w-100`, children: [products.length === 0 && !error && _jsx("div", { className: "text-white", children: "No products available" }), products.map((product) => (_jsx(ToolCard, { title: product.name, text: product.description, imgSrc: `http://localhost:3000/uploads/${product.imageUrl.replace("uploads/", "")}`, price: product.price, available: product.available, isWide: true, whoRented: product.rentedBy }, product._id)))] }), _jsx("div", { className: "text-white" })] }));
}
export default AllProducts;
