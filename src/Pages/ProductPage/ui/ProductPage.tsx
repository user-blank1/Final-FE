import styles from "./ProductPage.module.scss";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import ToolCard from "@components/ToolCard";
import { useNavigate } from "react-router-dom";
import Button from "@components/Button/Button";
interface Product {
    available: boolean;
    _id: string;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
}
function ProductPage() {
    const navigate = useNavigate();
    const { title } = useParams<{ title: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const { token, isLoading, user } = useAuthContext();
    const [days, setDays] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [error, setError] = useState<string | null>(null);
    const [show, setShow] = useState(false);
    useEffect(() => {
        const fetchProduct = async () => {
            if (isLoading) return;

            const response = await fetch(`https://final-be-production-ddac.up.railway.app/api/products/single/${title}`, {
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

    const rentFunction = async () => {
        const res = await fetch("https://final-be-production-ddac.up.railway.app/api/products/rent", {
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
    return (
        <div className={styles.productPage}>
            <div className="d-flex h-100 w-100 align-items-center justify-content-center flex-column gap-4">
                {product && <h1 className="text-center text-white">{product.available ? " Product is Available!" : "Not Available!"}</h1>}
                {product ? (
                    <ToolCard
                        title={product.name}
                        text={product.description}
                        price={product.price}
                        imgSrc={`https://final-be-production-ddac.up.railway.app/uploads/${product.imageUrl.replace("uploads/", "")}`}
                        showBtn={false}
                        showPrice={true}
                    />
                ) : (
                    <p>Loading...</p>
                )}
                <div className="rent-choose  d-flex flex-column align-items-center gap-4">
                    <Button
                        disabled={!product?.available}
                        text={product?.available ? " Rent Now" : "Not Available"}
                        textColor="black"
                        backgroundColor="orange"
                        isBordered={false}
                        onClick={() => setShow(true)}
                    />
                    {show && (
                        <div className=" d-flex flex-column gap-3 align-items-center justify-content-center p-4 bg-white rounded">
                            <label className="fs-5 fw-bold">Enter number of days to rent:</label>
                            <input
                                min="0"
                                defaultValue="0"
                                required
                                type="number"
                                placeholder="Number of days"
                                className="p-2 rounded border w-100"
                                onChange={(e) => setDays(Number(e.target.value))}
                            />
                            <label className="fs-5 fw-bold">Enter number of minutes to rent:</label>
                            <input
                                min="1"
                                type="number"
                                placeholder="Number of minutes"
                                className="p-2 rounded border w-100"
                                onChange={(e) => setMinutes(Number(e.target.value))}
                            />
                            <Button text="Confirm" textColor="white" backgroundColor="blue" isBordered={false} onClick={() => rentFunction()} />
                        </div>
                    )}
                    <div>{error === "Success!" ? <p className="text-success fs-3">{error}</p> : <p className="text-danger fs-3">{error}</p>}</div>
                </div>
            </div>
        </div>
    );
}

export default ProductPage;
