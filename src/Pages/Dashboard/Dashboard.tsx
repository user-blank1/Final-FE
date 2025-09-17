import styles from "./Dashboard.module.scss";
import img1 from "@assets/build.png";
import img2 from "@assets/tools.png";
import img3 from "@assets/blender.webp";
import img4 from "@assets/tools2.png";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useState, useEffect } from "react";
import ToolCard from "@components/ToolCard";
import AllProducts from "@components/AllProducts";
interface Product {
    _id: string;
    available: boolean;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    popularity: number;
}
function Dashboard() {
    const { token, isLoading } = useAuthContext();
    const [error, setError] = useState("");
    const [popular, setPopular] = useState<Product[] | null>(null);
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
        if (isLoading || !token) return;
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
    return (
        <div className={`${styles.dashboard} d-flex flex-column align-items-center  `}>
            <h1 className="text-white mt-4 mb-0 p-0 ">Welcome to Best Rent!</h1>
            <div className={`container-fluid ${styles["dashboard-container"]}`}>
                <div id="carouselExample" className={`carousel slide d-flex justify-content-center align-items-center  ${styles.carousel}`}>
                    <div className="carousel-inner h-75 w-75">
                        <div className="carousel-item active  h-100">
                            <img src={img1} className="d-block w-100 h-100 object-fit-contain" alt="..." />
                        </div>
                        <div className="carousel-item  h-100">
                            <img src={img2} className="d-block w-100 h-100 object-fit-contain" alt="..." />
                        </div>
                        <div className="carousel-item  h-100">
                            <img src={img3} className="d-block w-100 h-100 object-fit-contain " alt="..." />
                        </div>
                        <div className="carousel-item  h-100">
                            <img src={img4} className="d-block w-100 h-100 object-fit-contain " alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <hr className="border border-white w-100" />
            <div className=" w-100 pb-5">
                <h1 className="text-center text-white mb-4">3 most popular Tools</h1>
                <div>{error}</div>
                <div className={`d-flex justify-content-center align-items-center gap-4 `}>
                    {popular &&
                        popular.map((card) => {
                            return (
                                <ToolCard
                                    key={card._id}
                                    title={card.name}
                                    text={card.description}
                                    price={card.price}
                                    available={card.available}
                                    popularity={card.popularity}
                                    imgSrc={`http://localhost:3000/uploads/${card.imageUrl.replace("uploads\\", "")}`}
                                />
                            );
                        })}
                </div>
            </div>
            <hr className="border border-white w-100" />
            <div className={`${styles["all-products-container"]}  w-100 mb-5`}>
                <AllProducts />
            </div>
        </div>
    );
}

export default Dashboard;
