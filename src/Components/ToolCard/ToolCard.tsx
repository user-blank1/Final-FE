import styles from "./ToolCard.module.scss";
import { useNavigate } from "react-router";
import Button from "@components/Button";
import { useLocation } from "react-router-dom"; // ✅ Import useLocation instead

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
            <div className={`d-flex flex-column align-items-center h-25 pt-2 ${styles["text-container"]}`}>
                <h5 className="card-title text-white">{title}</h5>
                <p className="card-text text-white w-75 mt-3 text-center text-break">{text}</p>
                <div className={`d-flex w-100 justify-content-around align-items-center ${location.pathname === "/" ? "border" : ""} py-1`}>
                    {showBtn && (
                        <Button text="rent now" textColor="black" backgroundColor="orange" isBordered={false} onClick={handleClick} disabled={!available} />
                    )}
                    {popularity !== undefined && <p className="card-text m-0 p-0 text-white">Popularity: {popularity}</p>}
                </div>
                {showPrice && <p className="card-text text-white">Price: {price}$/Day</p>}
                {!available && <p className="text-danger my-3">Currently Unavailable</p>}
            </div>
        </div>
    );
}

export default ToolCard;
