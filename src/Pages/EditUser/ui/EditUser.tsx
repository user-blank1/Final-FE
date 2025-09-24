import styles from "./EditUser.module.scss";
import ToolCard from "@components/ToolCard";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
function EditUser() {
    const { token, isLoading } = useAuthContext();
    const { id } = useParams<{ id: string }>();
    const [userData, setUserData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            setError(null);
            const response = await fetch(`final-be-production-ddac.up.railway.app/api/auth/user/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (!response.ok) {
                setError("Failed to fetch user data");
                return;
            }
            if (response.ok) {
                setUserData(data.products);
                setError(null);
                return;
            }
        };
        fetchData();
    }, [isLoading, token]);

    useEffect(() => {
        if (userData && userData.length === 0) {
            setError("This user has no active rentals");
        }
        setSuccessMessage(null);
        setFetchError(null);
    }, [userData]);

    const deleteRentedProduct = async (id?: string) => {
        const res = await fetch(`final-be-production-ddac.up.railway.app/api/products/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (!res.ok) {
            setFetchError("Failed to delete the product");
        }
        if (res.ok) {
            setFetchError(null);
            setSuccessMessage("Product deleted successfully");
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    };
    return (
        <div className={styles.EditUser}>
            {error && <div className=" text-white text-center w-100">{error}</div>}
            {!error && <h1 className="text-white">User's active rentals</h1>}
            <div className="container-fluid my-4 gap-4 d-flex flex-column flex-xl-row flex-wrap justify-content-center align-items-center">
                {userData &&
                    userData.map((rental: any) => (
                        <ToolCard
                            key={rental.id}
                            title={rental.name}
                            imgSrc={`http://localhost:3000/uploads/${rental.imageUrl.replace("uploads/", "")}`}
                            price={rental.price}
                            isWide={false}
                            text={rental.description}
                            showBtn={false}
                            returnDate={rental.returnDate}
                            showDeleteBtn={true}
                            productId={rental._id}
                            onDelete={deleteRentedProduct}
                        />
                    ))}
                ;
            </div>
            {successMessage && <p className={`${successMessage ? "text-white" : ""}w-100 text-center text-white`}>{successMessage}</p>}
            {fetchError && <p className={`${fetchError ? "text-danger" : ""}w-100 text-center  text-danger`}>{fetchError}</p>}
        </div>
    );
}

export default EditUser;
