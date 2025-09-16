import styles from "./AddProduct.module.scss";
import Button from "@components/Button";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
function AddProduct() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const { token } = useAuthContext();
    console.log(token);
    const submitProduct = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        const form = e.currentTarget;
        const productName = form.productName.value;
        const productDescription = form.productDescription.value;
        const productPrice = form.productPrice.value;
        const productImage = form.productImage.files[0];
        const available = form.available.checked;

        const formData = new FormData();
        formData.append("productName", productName);
        formData.append("productDescription", productDescription);
        formData.append("productPrice", productPrice);
        formData.append("productImage", productImage);
        formData.append("available", available.toString());

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
    return (
        <div className={styles.AddProduct}>
            <h1>Add Product to the store</h1>
            <div className={`${styles.backButton}`} onClick={() => navigate(-1)}>
                <a href="#" className={`text-white`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="black" className="bi bi-arrow-left" viewBox="0 0 16 16">
                        <path
                            fillRule="evenodd"
                            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                        />
                    </svg>
                </a>
            </div>
            <form
                className={`px-1 py-5 bg-black ${styles.form} rounded-1 `}
                onSubmit={(e) => {
                    submitProduct(e);
                }}
            >
                <div className="d-flex flex-column gap-2 mb-4">
                    <label htmlFor="productName" className="text-white">
                        Product Name
                    </label>
                    <input type="text" id="productName" name="productName" className="rounded-2" required />
                </div>
                <div className="d-flex flex-column gap-2 mb-4">
                    <label htmlFor="productDescription" className="text-white">
                        Product Description
                    </label>
                    <textarea id="productDescription" name="productDescription" className="rounded-2" required></textarea>
                </div>
                <div className="d-flex flex-column gap-2 mb-4">
                    <label htmlFor="productPrice" className="text-white">
                        Product Price/Day
                    </label>
                    <input type="number" id="productPrice" name="productPrice" className="rounded-2" required />
                </div>
                <div className="d-flex flex-column gap-2 mb-4">
                    <label htmlFor="productImage" className="text-white">
                        Product Image
                    </label>
                    <input type="file" id="productImage" name="productImage" accept="image/*" required className="text-white border rounded-2" />
                </div>
                <div className="d-flex flex-row gap-2 mb-4">
                    <label htmlFor="available" className="text-white">
                        Available
                    </label>
                    <input type="checkbox" id="available" name="available" />
                </div>
                <Button text="Add Product" isBordered={false} type="submit" />
                {error && <div className={` ${error !== "Product added!" ? "text-danger" : "text-success"}`}>{error}</div>}
            </form>
        </div>
    );
}

export default AddProduct;
