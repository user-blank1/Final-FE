import styles from "./ToolCard.module.scss";
import { useNavigate } from "react-router";
import { useState, useEffect, useRef } from "react";
import Button from "@components/Button";
import { useLocation } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEditReturnDate } from "../../utils/returnDate";
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
    showDeleteBtn = false,
    onDelete,
    productId,
    adminActions = false,
    adminDelete = false,
    draft = false,
    isRented = false,
    rezervationShow = false,
    whoRented = "",
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
    showDeleteBtn?: boolean;
    adminActions?: boolean;
    onDelete?: (productId?: string) => void;
    productId?: string;
    adminDelete?: boolean;
    draft?: boolean;
    isRented?: boolean;
    rezervationShow?: boolean;
    whoRented?: string;
}) {
    const h5Ref = useRef<HTMLHeadingElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const returnDateRef = useRef<HTMLParagraphElement>(null);
    const priceRef = useRef<HTMLParagraphElement>(null);
    const [isEditing, setIsEditing] = useState(false);

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
    useEffect(() => {
        truncateText();
    }, [text]);
    const location = useLocation();

    /////////////////////////////////////////////////////////////////
    const { token, isLoading, user } = useAuthContext()!;

    const [editedTitle, setEditedTitle] = useState(title);
    const [isEditingTitle, setIsEditingTitle] = useState(false);

    const [editedDescription, setEditedDescription] = useState(text);
    const [isEditingDescription, setIsEditingDescription] = useState(false);

    const [editedPrice, setEditedPrice] = useState(price.toString());
    const [isEditingPrice, setIsEditingPrice] = useState(false);

    const editTitle = async () => {
        setIsEditingTitle(!isEditingTitle);
    };
    const cancelEditTitle = () => {
        setIsEditingTitle(false);
        setEditedTitle(title);
    };
    const handleTitleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            saveTitle();
        } else if (e.key === "Escape") {
            cancelEditTitle();
        }
    };
    const saveTitle = async () => {
        if (editedTitle.trim() === "") return;
        if (!token) return;
        if (isLoading) return;
        const res = await fetch(`https://final-be-production-ddac.up.railway.app/api/products/edit/title/${productId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ newTitle: editedTitle }),
        });
        const json = await res.json();
        if (!res.ok) {
            alert(json.message || "Failed to update title");
            setEditedTitle(title);
        }
        if (res.ok) {
            alert("Title updated successfully");
            setIsEditingTitle(false);
        }
        window.location.reload();
        return;
    };

    const editDescription = () => {
        setIsEditingDescription(!isEditingDescription);
    };
    const cancelEditDescription = () => {
        setIsEditingDescription(false);
        setEditedDescription(text);
    };
    const handleDescriptionKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            saveDescription();
        } else if (e.key === "Escape") {
            cancelEditDescription();
        }
    };
    const saveDescription = async () => {
        if (editedDescription.trim() === "") return;
        if (!token) return;
        if (isLoading) return;
        const res = await fetch(`https://final-be-production-ddac.up.railway.app/api/products/edit/description/${productId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ newDescription: editedDescription }),
        });
        const json = await res.json();
        if (!res.ok) {
            alert(json.message || "Failed to update description");
            setEditedDescription(text);
        }
        if (res.ok) {
            alert("Description updated successfully");
            setIsEditingDescription(false);
        }
        window.location.reload();
        return;
    };

    const editPrice = () => {
        setIsEditingPrice(!isEditingPrice);
    };
    const cancelEditPrice = () => {
        setIsEditingPrice(false);
        setEditedPrice(price.toString());
    };
    const handlePriceKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            savePrice();
        } else if (e.key === "Escape") {
            cancelEditPrice();
        }
    };
    const savePrice = async () => {
        const numericPrice = parseFloat(editedPrice);
        if (isNaN(numericPrice) || numericPrice <= 0) {
            alert("Please enter a valid price");
            return;
        }
        if (!token) return;
        if (isLoading) return;
        const res = await fetch(`https://final-be-production-ddac.up.railway.app/api/products/edit/price/${productId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ newPrice: numericPrice }),
        });
        const json = await res.json();
        if (!res.ok) {
            alert(json.message || "Failed to update price");
            setEditedPrice(price.toString());
        }
        if (res.ok) {
            alert("Price updated successfully");
            setIsEditingPrice(false);
        }
        window.location.reload();
        return;
    };

    useEffect(() => {
        if (isEditingTitle === true || isEditingDescription === true || isEditingPrice === true) {
            setIsEditing(true);
        } else {
            setIsEditing(false);
        }
    }, [isEditingTitle, isEditingDescription, isEditingPrice]);

    const draftFn = async () => {
        if (!token) return;
        if (isLoading) return;
        const res = await fetch(`https://final-be-production-ddac.up.railway.app/api/products/edit/draft/${productId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const json = await res.json();
        if (!res.ok) {
            alert(json.message || "Failed to update draft status");
        }
        if (res.ok) {
            alert("Draft status updated successfully");
            window.location.reload();
        }
    };
    if (isRented) {
        return (
            <div className={`border border-5 rounded-4 overflow-hidden ${isWide ? styles["wide-card"] : styles.card}`}>
                <div className={`w-100 ${styles["image-container"]}`}>
                    <img src={imgSrc} className="h-100 w-100" alt={title} />
                </div>
                <div className={`d-flex flex-column align-items-center pt-2 ${styles["text-container"]}`}>
                    <h5 className={`text-white ${styles.title}`}>{title}</h5>
                    <p className="text-info my-2">Currently Rented- cannot edit</p>
                </div>
            </div>
        );
    }
    const [expired, setExpired] = useState(false);
    useEffect(() => {
        if (returnDate) {
            const now = new Date();
            const target = new Date(returnDate);
            const diffMs = target.getTime() - now.getTime();
            setExpired(diffMs <= 0);
        }
    }, [returnDate]);
    const getTimeLeft = (dateString: string) => {
        const now = new Date();
        const target = new Date(dateString);
        const diffMs = target.getTime() - now.getTime();

        if (diffMs <= 0) {
            return "Expired";
        }

        const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

        return `${days} days, ${hours} hours, and ${minutes + 1} minute left`;
    };

    const { editedReturnDate, setEditedReturnDate, isEditingReturnDate, editReturnDate, cancelEditReturnDate, handleReturnDateKeyPress, saveReturnDate } =
        useEditReturnDate(returnDate, productId, token ?? undefined, isLoading);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isEditingTitle && h5Ref.current && !h5Ref.current.contains(event.target as Node)) {
                cancelEditTitle();
            }
            if (isEditingDescription && descriptionRef.current && !descriptionRef.current.contains(event.target as Node)) {
                cancelEditDescription();
            }
            if (isEditingPrice && priceRef.current && !priceRef.current.contains(event.target as Node)) {
                cancelEditPrice();
            }
            if (isEditingReturnDate && returnDateRef.current && !returnDateRef.current.contains(event.target as Node)) {
                cancelEditReturnDate();
            }
        };

        if (isEditingTitle || isEditingDescription || isEditingPrice || isEditingReturnDate) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isEditingTitle, isEditingDescription, isEditingPrice, isEditingReturnDate]);

    const cancelReservation = async () => {
        if (!token) return;
        if (isLoading) return;
        const res = await fetch(`https://final-be-production-ddac.up.railway.app/api/products/edit/returndate/${productId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ newReturnDate: new Date().toISOString().slice(0, 16) }),
        });
        const json = await res.json();
        if (!res.ok) {
            alert(json.message || "Failed to update return date");
            setEditedReturnDate(returnDate ? returnDate.slice(0, 16) : "");
        }
        if (res.ok) {
            alert("Cancelled successfully");
        }
        window.location.reload();
    };

    if (rezervationShow) {
        return (
            <div className={`border border-5 rounded-4 overflow-hidden ${isWide ? styles["wide-card"] : styles.card}`}>
                <div className={`w-100 ${styles["image-container"]}`}>
                    <img src={imgSrc} className="h-100 w-100" alt={title} />
                </div>
                <div className={`d-flex flex-column align-items-center pt-2 position-relative ${styles["text-container"]}`}>
                    <h5 className={`text-white ${styles.title}`}>{title}</h5>
                    {whoRented && <p className="text-info my-2">Rezerved by {whoRented}</p>}
                    <p className="text-white position-relative mt-2" ref={returnDateRef}>
                        {" "}
                        {returnDate ? getTimeLeft(returnDate) : ""}
                        <span
                            className="position-absolute  start-50 translate-middle badge rounded-pill "
                            style={{ cursor: "pointer", bottom: "-5rem" }}
                            onClick={editReturnDate}
                        >
                            {isEditingReturnDate ? (
                                <>
                                    <input
                                        type="datetime-local"
                                        value={editedReturnDate}
                                        onChange={(e) => setEditedReturnDate(e.target.value)}
                                        onKeyDown={handleReturnDateKeyPress}
                                        className="form-control"
                                        autoFocus
                                    />
                                    <button
                                        onClick={saveReturnDate}
                                        className="btn btn-primary btn-sm m-1 position-absolute  translate-middle"
                                        style={{ cursor: "pointer", bottom: "-3.5rem" }}
                                    >
                                        Save
                                    </button>
                                </>
                            ) : (
                                <span>
                                    {!expired && (
                                        <span onClick={editReturnDate} className={`${styles.editDate}`}>
                                            Edit Return date
                                        </span>
                                    )}
                                </span>
                            )}
                        </span>
                    </p>
                    {!expired && (
                        <button className={`btn btn-primary position-absolute `} onClick={cancelReservation}>
                            Cancel Reservation
                        </button>
                    )}
                </div>
            </div>
        );
    }
    return (
        <>
            {isEditing && <div className={`overlay position-fixed top-0 start-0 w-100 h-100 ${styles.overlay}`}></div>}
            <div
                className={`${draft ? `${styles.draftCard}` : ""} border border-5 rounded-4 position-relative overflow-hidden ${isWide ? styles["wide-card"] : styles.card}`}
            >
                {adminActions && draft && (
                    <div onClick={() => draftFn()} className={`position-absolute text-white border border-2 rounded-2 p-1 ${styles.draft}`}>
                        {" "}
                        Unset as draft
                    </div>
                )}
                {adminActions && !draft && (
                    <div onClick={() => draftFn()} className={`position-absolute text-white border border-2 rounded-2 p-1 ${styles.draft}`}>
                        {" "}
                        Set as draft
                    </div>
                )}
                <div className={`  w-100 ${styles["image-container"]}`}>
                    <img src={imgSrc} className="h-100 w-100 " alt={title} />
                </div>
                <div className={`d-flex flex-column align-items-center  pt-2 ${styles["text-container"]}`}>
                    <h5 ref={h5Ref} className={`text-white ${styles.title}  position-relative `}>
                        {title}
                        {(adminActions || adminDelete) && (
                            <span
                                onClick={editTitle}
                                className={`position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger ${styles.admin}`}
                            >
                                Edit
                            </span>
                        )}
                        {isEditingTitle ? (
                            <div className={`d-flex flex-column gap-2 ${styles.editingCard}`}>
                                <input
                                    type="text"
                                    value={editedTitle}
                                    onChange={(e) => setEditedTitle(e.target.value)}
                                    onKeyDown={handleTitleKeyPress}
                                    className="form-control"
                                    autoFocus
                                />
                                <div className="d-flex gap-2">
                                    <button onClick={saveTitle} className="btn btn-success btn-sm">
                                        Save
                                    </button>
                                    <button onClick={cancelEditTitle} className="btn btn-secondary btn-sm">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : null}
                    </h5>
                    <hr className="bg-white border w-100 m-0 p-0"></hr>

                    <div ref={descriptionRef} className={`card-text text-white w-75 mt-3 text-center text-break ${styles.text} position-relative`}>
                        {truncateText()}
                        {(adminActions || adminDelete) && (
                            <span
                                onClick={editDescription}
                                className={`position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning ${styles.admin}`}
                                style={{ cursor: "pointer" }}
                            >
                                Edit
                            </span>
                        )}
                        {isEditingDescription ? (
                            <div className={`d-flex flex-column gap-2 mt-2 ${styles.editingCard}`}>
                                <textarea
                                    value={editedDescription}
                                    onChange={(e) => setEditedDescription(e.target.value)}
                                    onKeyDown={handleDescriptionKeyPress}
                                    className="form-control"
                                    rows={3}
                                    autoFocus
                                />
                                <div className="d-flex gap-2">
                                    <button onClick={saveDescription} className="btn btn-success btn-sm">
                                        Save
                                    </button>
                                    <button onClick={cancelEditDescription} className="btn btn-secondary btn-sm">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        ) : null}
                    </div>
                    <hr className="bg-white border w-100 m-0 p-0"></hr>
                    {!location.pathname.includes("/products/user") && (
                        <div className={`d-flex w-100 justify-content-around align-items-center ${location.pathname === "/" ? "border" : ""} py-1`}>
                            {showBtn && (
                                <Button
                                    text="rent now"
                                    textColor="black"
                                    backgroundColor="orange"
                                    isBordered={false}
                                    onClick={handleClick}
                                    disabled={!available}
                                />
                            )}
                            {popularity !== undefined && <p className="card-text m-0 p-0 text-white">Popularity: {popularity}</p>}
                        </div>
                    )}

                    {showPrice && (
                        <div ref={priceRef} className="card-text text-white position-relative">
                            Price: {price}$/Day
                            {(adminActions || adminDelete) && (
                                <span
                                    onClick={editPrice}
                                    className={`position-absolute top-0 start-100 translate-middle badge rounded-pill bg-info ${styles.admin}`}
                                    style={{ cursor: "pointer" }}
                                >
                                    Edit
                                </span>
                            )}
                            {isEditingPrice ? (
                                <div
                                    className={`d-flex flex-column gap-2 mt-2 position-absolute bg-dark p-2 rounded top-0 start-100 translate-middle ${styles.editingCard}`}
                                >
                                    <input
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        value={editedPrice}
                                        onChange={(e) => setEditedPrice(e.target.value)}
                                        onKeyDown={handlePriceKeyPress}
                                        className="form-control"
                                        autoFocus
                                    />
                                    <div className="d-flex gap-2">
                                        <button onClick={savePrice} className="btn btn-success btn-sm">
                                            Save
                                        </button>
                                        <button onClick={cancelEditPrice} className="btn btn-secondary btn-sm">
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    )}

                    {!available && !location.pathname.includes("/products/user") && <p className="text-danger my-1">Currently Unavailable</p>}
                    {whoRented === user?._id && <p className="text-info my-1">You have rented this tool</p>}
                    {returnDate && location.pathname.includes("/products/user") && (
                        <div>
                            <p className="text-white my-2">Return Date: {new Date(returnDate).toLocaleDateString()}</p>
                            <p className="text-white">
                                You have {Math.floor((new Date(returnDate).getTime() - new Date().getTime()) / 1000 / 60 / 60 / 24)} days left
                            </p>
                        </div>
                    )}
                    {showDeleteBtn && returnDate && (
                        <div className="d-flex justify-content-center gap-3 flex-column align-items-center my-2">
                            <p className="text-white my-2">Return Date: {new Date(returnDate).toLocaleDateString()}</p>
                            <Button text="Delete" textColor="white" backgroundColor="red" isBordered={false} onClick={() => onDelete?.(productId!)} />
                        </div>
                    )}
                    {adminDelete && (
                        <div className="d-flex justify-content-center gap-3 flex-column align-items-center my-2">
                            <Button text="Delete" textColor="white" backgroundColor="red" isBordered={false} onClick={() => onDelete?.()} />
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default ToolCard;
