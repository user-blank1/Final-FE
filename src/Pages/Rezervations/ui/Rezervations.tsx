import styles from "./Rezervations.module.scss";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import ToolCard from "@components/ToolCard";
interface ReservationProduct {
    _id: string;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    popularity: number;
    available: boolean;
    draft: boolean;
    rentedBy: {
        _id: string;
        email: string;
        username: string;
    };
    rentedFor: number;
    returnDate: string;
    __v: number;
}
function Rezervations() {
    const [data, setData] = useState<ReservationProduct[]>([]);
    const { token, isLoading } = useAuthContext();
    const [error, setError] = useState(null);
    useEffect(() => {
        const getData = async () => {
            if (!token || isLoading) return;
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
    return (
        <div className={styles.rezervations}>
            {error && <p className="w-100 text-danger fs-3">{error}</p>}
            <h1 className="w-100 text-center text-white ">All rezervations</h1>
            {data.length > 0 && (
                <div className="d-flex flex-column flex-xl-row justify-content-center align-items-center flex-wrap gap-4 mt-4">
                    {data.map((card) => (
                        <ToolCard
                            key={card._id}
                            title={card.name}
                            text={card.description}
                            imgSrc={`http://localhost:3000/uploads/${card.imageUrl.replace("uploads/", "")}`}
                            price={card.price}
                            showBtn={false}
                            showPrice={true}
                            productId={card._id}
                            available={false}
                            whoRented={card.rentedBy.username}
                            rezervationShow={true}
                            returnDate={card.returnDate}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Rezervations;
