import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./UserPage.module.scss";
import { useEffect } from "react";
import { useFetchProducts } from "../../../hooks/useFetchProducts";
import { useAuthContext } from "../../../hooks/useAuthContext";
import ToolCard from "@components/ToolCard";
function UserPage() {
    const { fetchProducts, loading, error } = useFetchProducts();
    const { products } = useAuthContext();
    useEffect(() => {
        fetchProducts();
    }, []);
    useEffect(() => {
        console.log("products loaded:", products);
    }, [products]);
    return (_jsxs("div", { className: styles.userPage, children: [loading && _jsx("p", { children: "Loading..." }), error && _jsx("p", { children: error }), _jsx("h1", { className: "text-white w-100 text-center", children: "My Rentals" }), _jsx("div", { className: "d-flex flex-column flex-lg-row align-items-center justify-content-center flex-wrap mx-auto mb-2 mb-lg-0 gap-4 px-1 px-lg-4 py-5", children: products && products.length > 0 ? (products.map((product) => (_jsx(ToolCard, { title: product.name, text: product.description, price: product.price, productId: product._id, rezervationShow: true, available: product.available, popularity: product.popularity, returnDate: product.returnDate ?? undefined, imgSrc: `http://localhost:3000/uploads/${product.imageUrl.replace("uploads/", "")}` }, product._id)))) : (_jsx("p", { className: "text-white", children: "No products Rented" })) })] }));
}
export default UserPage;
