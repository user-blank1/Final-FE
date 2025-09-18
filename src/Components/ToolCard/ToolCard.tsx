import styles from "./ToolCard.module.scss";
import { useNavigate } from "react-router";
import Button from "@components/Button";
import { useLocation } from "react-router-dom";
function ToolCard({
    title,
    text,
    imgSrc,
    price,
    showBtn = true,
    showPrice = false,
    available = true,
    popularity,
    isWide = false,
    returnDate,
}: {
    title: string;
    text: string;
    imgSrc: string;
    price: number;
    showBtn?: boolean;
    showPrice?: boolean;
    available?: boolean;
    popularity?: number;
    isWide?: boolean;
    returnDate?: string;
}) {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/products/${title}`);
    };
    const truncateText = () => {
        if (text.length > 100) {
            return text.slice(0, 97) + "...";
        }
        return text;
    };
    const location = useLocation();
    if (location.pathname === "/") text = truncateText();
    return (
        <div className={` border border-5 rounded-4 overflow-hidden ${isWide ? styles["wide-card"] : styles.card}`}>
            <div className={`  w-100 ${styles["image-container"]}`}>
                <img src={imgSrc} className="h-100 w-100 " alt={title} />
            </div>
            <div className={`d-flex flex-column align-items-center  pt-2 ${styles["text-container"]}`}>
                <h5 className={`text-white ${styles.title} `}>{title}</h5>
                <p className={`card-text text-white w-75 mt-3 text-center text-break ${styles.text}`}>{text}</p>
                {!location.pathname.includes("/products/user") && (
                    <div className={`d-flex w-100 justify-content-around align-items-center ${location.pathname === "/" ? "border" : ""} py-1`}>
                        {showBtn && (
                            <Button text="rent now" textColor="black" backgroundColor="orange" isBordered={false} onClick={handleClick} disabled={!available} />
                        )}
                        {popularity !== undefined && <p className="card-text m-0 p-0 text-white">Popularity: {popularity}</p>}
                    </div>
                )}
                {showPrice && <p className="card-text text-white">Price: {price}$/Day</p>}
                {!available && !location.pathname.includes("/products/user") && <p className="text-danger my-2">Currently Unavailable</p>}
                {returnDate && location.pathname.includes("/products/user") && (
                    <div>
                        <p className="text-white my-2">Return Date: {new Date(returnDate).toLocaleDateString()}</p>
                        <p className="text-white">
                            You have {Math.ceil((new Date(returnDate).getTime() - new Date().getTime()) / 1000 / 60 / 60 / 24)} days left
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ToolCard;
