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

    return (
        <div className={styles.userPage}>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <div className="d-flex flex-column flex-lg-row align-items-center justify-content-center flex-wrap mx-auto mb-2 mb-lg-0 gap-4 px-1 px-lg-4 py-5">
                {products && products.length > 0 ? (
                    products.map((product) => (
                        <ToolCard
                            key={product._id}
                            title={product.name}
                            text={product.description}
                            price={product.price}
                            available={product.available}
                            popularity={product.popularity}
                            returnDate={product.returnDate ?? undefined}
                            imgSrc={`http://localhost:3000/uploads/${product.imageUrl.replace("uploads/", "")}`}
                        />
                    ))
                ) : (
                    <p className="text-white">No products Rented</p>
                )}
            </div>
        </div>
    );
}

export default UserPage;
