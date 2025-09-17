import styles from "./AllProducts.module.scss";
import ToolCard from "@components/ToolCard";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
function AllProducts() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState<string | null>(null);
    const { token, isLoading } = useAuthContext();
    useEffect(() => {
        const getAll = async () => {
            setError(null);
            if (isLoading) return;
            const res = await fetch("/api/products/all", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: ` Bearer ${token}`,
                },
            });
            const json = await res.json();
            console.log(json.products);
            if (!res.ok) {
                setError(json.error);
            }
            if (res.ok) {
                setProducts(json.products);
            }
        };
        getAll();
    }, [token, isLoading]);
    return (
        <div className="d-flex  container align-items-center gap-4 py-5 w-100 flex-wrap">
            <div className="text-white fs-1 text-center w-100">All Products</div>
            {error && <div className="text-danger">{error}</div>}
            <div className={`${styles["all-products-container"]} justify-content-center d-flex flex-column flex-lg-row flex-wrap gap-5 w-100`}>
                {products.length === 0 && !error && <div className="text-white">No products available</div>}
                {products.map((product: any) => (
                    <ToolCard
                        key={product._id}
                        title={product.name}
                        text={product.description}
                        imgSrc={`http://localhost:3000/uploads/${product.imageUrl.replace("uploads\\", "")}`}
                        price={product.price}
                        available={product.available}
                    />
                ))}
            </div>
            <div className="text-white"></div>
        </div>
    );
}

export default AllProducts;
