import styles from "./ProductPage.module.scss";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import ToolCard from "@components/ToolCard";
interface Product {
    _id: string;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
}
function ProductPage() {
    const { title } = useParams<{ title: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const { token, isLoading } = useAuthContext();

    useEffect(() => {
        const fetchProduct = async () => {
            if (isLoading) return;
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
            } else {
                setProduct(data.product);
            }
        };
        fetchProduct();
    }, [title, token, isLoading]);
    return (
        <div className={styles.productPage}>
            <div className="d-flex h-100 w-100 align-items-center justify-content-center flex-column gap-4">
                {product ? (
                    <ToolCard
                        title={product.name}
                        text={product.description}
                        price={product.price}
                        imgSrc={`http://localhost:3000/uploads/${product.imageUrl.replace("uploads\\", "")}`}
                        showBtn={false}
                        showPrice={true}
                    />
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}

export default ProductPage;
