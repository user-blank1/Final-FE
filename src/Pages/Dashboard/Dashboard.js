import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./Dashboard.module.scss";
import img1 from "@assets/build.png";
import img2 from "@assets/tools.png";
import img3 from "@assets/blender.webp";
import img4 from "@assets/tools2.png";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useState, useEffect } from "react";
import ToolCard from "@components/ToolCard";
import AllProducts from "@components/AllProducts";
function Dashboard() {
    const { token, isLoading } = useAuthContext();
    const [error, setError] = useState("");
    const [popular, setPopular] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1200);
    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth < 1200);
        }
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [window.innerWidth]);
    useEffect(() => {
        if (isLoading || !token)
            return;
        setError("");
        const getPopularProducts = async () => {
            const res = await fetch("/api/products/popular", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();
            if (!res.ok) {
                setError("Error fetchintg most popular products");
            }
            if (res.ok) {
                setError("");
                setPopular(data.products);
            }
        };
        getPopularProducts();
    }, [token, isLoading]);
    console.log("isMobile:", isMobile);
    return (_jsxs("div", { className: `${styles.dashboard} d-flex flex-column align-items-center  `, children: [_jsx("h1", { className: "text-white mt-4 mb-0 p-0 ", children: "Welcome to Best Rent!" }), _jsx("div", { className: `container-fluid ${styles["dashboard-container"]}`, children: _jsxs("div", { id: "carouselExample", className: `carousel slide d-flex justify-content-center align-items-center  ${styles.carousel}`, children: [_jsxs("div", { className: "carousel-inner h-75 w-75", children: [_jsx("div", { className: "carousel-item active  h-100", children: _jsx("img", { src: img1, className: "d-block w-100 h-100 object-fit-contain", alt: "..." }) }), _jsx("div", { className: "carousel-item  h-100", children: _jsx("img", { src: img2, className: "d-block w-100 h-100 object-fit-contain", alt: "..." }) }), _jsx("div", { className: "carousel-item  h-100", children: _jsx("img", { src: img3, className: "d-block w-100 h-100 object-fit-contain ", alt: "..." }) }), _jsx("div", { className: "carousel-item  h-100", children: _jsx("img", { src: img4, className: "d-block w-100 h-100 object-fit-contain ", alt: "..." }) })] }), _jsxs("button", { className: "carousel-control-prev", type: "button", "data-bs-target": "#carouselExample", "data-bs-slide": "prev", children: [_jsx("span", { className: "carousel-control-prev-icon", "aria-hidden": "true" }), _jsx("span", { className: "visually-hidden", children: "Previous" })] }), _jsxs("button", { className: "carousel-control-next", type: "button", "data-bs-target": "#carouselExample", "data-bs-slide": "next", children: [_jsx("span", { className: "carousel-control-next-icon", "aria-hidden": "true" }), _jsx("span", { className: "visually-hidden", children: "Next" })] })] }) }), _jsx("hr", { className: "border border-white w-100" }), _jsxs("div", { className: " w-100 pb-5", children: [_jsx("h1", { className: "text-center text-white mb-4", children: "3 most popular Tools" }), _jsx("div", { children: error }), _jsx("div", { className: `d-flex flex-column flex-lg-row justify-content-center align-items-center gap-4 `, children: popular &&
                            popular.map((card) => {
                                return (_jsx(ToolCard, { title: card.name, text: card.description, price: card.price, available: card.available, popularity: card.popularity, imgSrc: `http://localhost:3000/uploads/${card.imageUrl.replace("uploads/", "")}`, whoRented: card.rentedBy }, card._id));
                            }) })] }), _jsx("hr", { className: "border border-white w-100" }), _jsx("div", { className: `${styles["all-products-container"]}  w-100 mb-5`, children: _jsx(AllProducts, {}) })] }));
}
export default Dashboard;
