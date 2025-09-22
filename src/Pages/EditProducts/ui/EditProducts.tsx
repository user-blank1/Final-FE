import styles from "./EditProducts.module.scss";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import ToolCard from "@components/ToolCard";
function EditProducts() {
    const { token, isLoading } = useAuthContext();
    const [err, setError] = useState<string | null>(null);
    const [products, setProducts] = useState<any[]>([]);
    useEffect(() => {
        if (isLoading) return;
        if (!token) return;
        const getAll = async () => {
            const res = await fetch("/api/products/all", {
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
    const deleteRentedProduct = async (id: string) => {
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
    return (
        <div className={styles.editProducts}>
            <h1 className="text-white text-center my-3">Edit Products</h1>
            <div>{err && <p className={`text-danger w-100 fs-3`}>{err}</p>}</div>
            {!err && (
                <div className="container d-flex flex-wrap flex-column flex-xl-row justify-content-center align-items-center gap-4 my-4">
                    {products.map((product) => {
                        return (
                            <ToolCard
                                key={product._id}
                                price={product.price}
                                showPrice={true}
                                text={product.description}
                                title={product.name}
                                isWide={true}
                                showBtn={false}
                                adminDelete={true}
                                onDelete={() => deleteRentedProduct(product._id)}
                                productId={product._id}
                                imgSrc={`http://localhost:3000/uploads/${product.imageUrl.replace("uploads/", "")}`}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default EditProducts;
