import styles from "./Dashboard.module.scss";
import img1 from "@assets/build.png";
import img2 from "@assets/tools.png";
import img3 from "@assets/blender.webp";
import img4 from "@assets/tools2.png";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useState, useEffect } from "react";
import ToolCard from "@components/ToolCard";
function Dashboard() {
    const { token } = useAuthContext();
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
        const getPopularProducts = async () => {
            await fetch("/api/products/popular", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        };
        getPopularProducts();
    }, []);
    return (
        <div className={`${styles.dashboard} d-flex flex-column align-items-center  `}>
            <h1 className="text-white mt-4 mb-0 p-0 ">Welcome to Best Rent!</h1>
            <div className={`container-fluid ${styles["dashboard-container"]}`}>
                <div id="carouselExample" className={`carousel slide d-flex justify-content-center align-items-center  ${styles.carousel}`}>
                    <div className="carousel-inner h-75 w-75  ">
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
                <div className={`d-flex justify-content-center align-items-center gap-4 flex-wrap  flex-column flex-lg-row`}>
                    <ToolCard title="Card 1" text="This is card 1" imgSrc={img1} />
                    <ToolCard title="Card 2" text="This is card 2" imgSrc={img2} />
                    <ToolCard title="Card 3" text="This is card 3" imgSrc={img4} />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
