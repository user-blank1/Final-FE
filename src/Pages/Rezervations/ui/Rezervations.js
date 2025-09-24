import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./Rezervations.module.scss";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import ToolCard from "@components/ToolCard";
function Rezervations() {
    const [data, setData] = useState([]);
    const { token, isLoading } = useAuthContext();
    const [error, setError] = useState(null);
    useEffect(() => {
        const getData = async () => {
            if (!token || isLoading)
                return;
            const res = await fetch("/api/products/rezervations", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            const json = await res.json();
            console.log(json);
            if (res.ok) {
                setData(json.products);
                setError(null);
            }
            if (!res.ok) {
                setError(json.error || "Failed to fetch data");
            }
        };
        getData();
    }, [token, isLoading]);
    return (_jsxs("div", { className: styles.rezervations, children: [error && _jsx("p", { className: "w-100 text-danger fs-3", children: error }), _jsx("h1", { className: "w-100 text-center text-white ", children: "All rezervations" }), data.length > 0 && (_jsx("div", { className: "d-flex flex-column flex-xl-row justify-content-center align-items-center flex-wrap gap-4 mt-4", children: data.map((card) => (_jsx(ToolCard, { title: card.name, text: card.description, imgSrc: `http://localhost:3000/uploads/${card.imageUrl.replace("uploads/", "")}`, price: card.price, showBtn: false, showPrice: true, productId: card._id, available: false, whoRented: card.rentedBy.username, rezervationShow: true, returnDate: card.returnDate }, card._id))) }))] }));
}
export default Rezervations;
