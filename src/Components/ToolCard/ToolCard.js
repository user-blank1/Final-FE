import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import styles from "./ToolCard.module.scss";
import { useNavigate } from "react-router";
import { useState, useEffect, useRef } from "react";
import Button from "@components/Button";
import { useLocation } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEditReturnDate } from "../../utils/returnDate";
function ToolCard({ title, text, imgSrc, price, showBtn = true, showPrice = false, available = true, popularity, isWide = false, returnDate, showDeleteBtn = false, onDelete, productId, adminActions = false, adminDelete = false, draft = false, isRented = false, rezervationShow = false, whoRented = "", }) {
    const h5Ref = useRef(null);
    const descriptionRef = useRef(null);
    const returnDateRef = useRef(null);
    const priceRef = useRef(null);
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
    const { token, isLoading, user } = useAuthContext();
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
    const handleTitleKeyPress = (e) => {
        if (e.key === "Enter") {
            saveTitle();
        }
        else if (e.key === "Escape") {
            cancelEditTitle();
        }
    };
    const saveTitle = async () => {
        if (editedTitle.trim() === "")
            return;
        if (!token)
            return;
        if (isLoading)
            return;
        const res = await fetch(`/api/products/edit/title/${productId}`, {
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
    const handleDescriptionKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            saveDescription();
        }
        else if (e.key === "Escape") {
            cancelEditDescription();
        }
    };
    const saveDescription = async () => {
        if (editedDescription.trim() === "")
            return;
        if (!token)
            return;
        if (isLoading)
            return;
        const res = await fetch(`/api/products/edit/description/${productId}`, {
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
    const handlePriceKeyPress = (e) => {
        if (e.key === "Enter") {
            savePrice();
        }
        else if (e.key === "Escape") {
            cancelEditPrice();
        }
    };
    const savePrice = async () => {
        const numericPrice = parseFloat(editedPrice);
        if (isNaN(numericPrice) || numericPrice <= 0) {
            alert("Please enter a valid price");
            return;
        }
        if (!token)
            return;
        if (isLoading)
            return;
        const res = await fetch(`/api/products/edit/price/${productId}`, {
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
        }
        else {
            setIsEditing(false);
        }
    }, [isEditingTitle, isEditingDescription, isEditingPrice]);
    const draftFn = async () => {
        if (!token)
            return;
        if (isLoading)
            return;
        const res = await fetch(`/api/products/edit/draft/${productId}`, {
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
        return (_jsxs("div", { className: `border border-5 rounded-4 overflow-hidden ${isWide ? styles["wide-card"] : styles.card}`, children: [_jsx("div", { className: `w-100 ${styles["image-container"]}`, children: _jsx("img", { src: imgSrc, className: "h-100 w-100", alt: title }) }), _jsxs("div", { className: `d-flex flex-column align-items-center pt-2 ${styles["text-container"]}`, children: [_jsx("h5", { className: `text-white ${styles.title}`, children: title }), _jsx("p", { className: "text-info my-2", children: "Currently Rented- cannot edit" })] })] }));
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
    const getTimeLeft = (dateString) => {
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
    const { editedReturnDate, setEditedReturnDate, isEditingReturnDate, editReturnDate, cancelEditReturnDate, handleReturnDateKeyPress, saveReturnDate } = useEditReturnDate(returnDate, productId, token ?? undefined, isLoading);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isEditingTitle && h5Ref.current && !h5Ref.current.contains(event.target)) {
                cancelEditTitle();
            }
            if (isEditingDescription && descriptionRef.current && !descriptionRef.current.contains(event.target)) {
                cancelEditDescription();
            }
            if (isEditingPrice && priceRef.current && !priceRef.current.contains(event.target)) {
                cancelEditPrice();
            }
            if (isEditingReturnDate && returnDateRef.current && !returnDateRef.current.contains(event.target)) {
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
        if (!token)
            return;
        if (isLoading)
            return;
        const res = await fetch(`/api/products/edit/returndate/${productId}`, {
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
        return (_jsxs("div", { className: `border border-5 rounded-4 overflow-hidden ${isWide ? styles["wide-card"] : styles.card}`, children: [_jsx("div", { className: `w-100 ${styles["image-container"]}`, children: _jsx("img", { src: imgSrc, className: "h-100 w-100", alt: title }) }), _jsxs("div", { className: `d-flex flex-column align-items-center pt-2 position-relative ${styles["text-container"]}`, children: [_jsx("h5", { className: `text-white ${styles.title}`, children: title }), whoRented && _jsxs("p", { className: "text-info my-2", children: ["Rezerved by ", whoRented] }), _jsxs("p", { className: "text-white position-relative mt-2", ref: returnDateRef, children: [" ", returnDate ? getTimeLeft(returnDate) : "", _jsx("span", { className: "position-absolute  start-50 translate-middle badge rounded-pill ", style: { cursor: "pointer", bottom: "-5rem" }, onClick: editReturnDate, children: isEditingReturnDate ? (_jsxs(_Fragment, { children: [_jsx("input", { type: "datetime-local", value: editedReturnDate, onChange: (e) => setEditedReturnDate(e.target.value), onKeyDown: handleReturnDateKeyPress, className: "form-control", autoFocus: true }), _jsx("button", { onClick: saveReturnDate, className: "btn btn-primary btn-sm m-1 position-absolute  translate-middle", style: { cursor: "pointer", bottom: "-3.5rem" }, children: "Save" })] })) : (_jsx("span", { children: !expired && (_jsx("span", { onClick: editReturnDate, className: `${styles.editDate}`, children: "Edit Return date" })) })) })] }), !expired && (_jsx("button", { className: `btn btn-primary position-absolute `, onClick: cancelReservation, children: "Cancel Reservation" }))] })] }));
    }
    return (_jsxs(_Fragment, { children: [isEditing && _jsx("div", { className: `overlay position-fixed top-0 start-0 w-100 h-100 ${styles.overlay}` }), _jsxs("div", { className: `${draft ? `${styles.draftCard}` : ""} border border-5 rounded-4 position-relative overflow-hidden ${isWide ? styles["wide-card"] : styles.card}`, children: [adminActions && draft && (_jsxs("div", { onClick: () => draftFn(), className: `position-absolute text-white border border-2 rounded-2 p-1 ${styles.draft}`, children: [" ", "Unset as draft"] })), adminActions && !draft && (_jsxs("div", { onClick: () => draftFn(), className: `position-absolute text-white border border-2 rounded-2 p-1 ${styles.draft}`, children: [" ", "Set as draft"] })), _jsx("div", { className: `  w-100 ${styles["image-container"]}`, children: _jsx("img", { src: imgSrc, className: "h-100 w-100 ", alt: title }) }), _jsxs("div", { className: `d-flex flex-column align-items-center  pt-2 ${styles["text-container"]}`, children: [_jsxs("h5", { ref: h5Ref, className: `text-white ${styles.title}  position-relative `, children: [title, (adminActions || adminDelete) && (_jsx("span", { onClick: editTitle, className: `position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger ${styles.admin}`, children: "Edit" })), isEditingTitle ? (_jsxs("div", { className: `d-flex flex-column gap-2 ${styles.editingCard}`, children: [_jsx("input", { type: "text", value: editedTitle, onChange: (e) => setEditedTitle(e.target.value), onKeyDown: handleTitleKeyPress, className: "form-control", autoFocus: true }), _jsxs("div", { className: "d-flex gap-2", children: [_jsx("button", { onClick: saveTitle, className: "btn btn-success btn-sm", children: "Save" }), _jsx("button", { onClick: cancelEditTitle, className: "btn btn-secondary btn-sm", children: "Cancel" })] })] })) : null] }), _jsx("hr", { className: "bg-white border w-100 m-0 p-0" }), _jsxs("div", { ref: descriptionRef, className: `card-text text-white w-75 mt-3 text-center text-break ${styles.text} position-relative`, children: [truncateText(), (adminActions || adminDelete) && (_jsx("span", { onClick: editDescription, className: `position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning ${styles.admin}`, style: { cursor: "pointer" }, children: "Edit" })), isEditingDescription ? (_jsxs("div", { className: `d-flex flex-column gap-2 mt-2 ${styles.editingCard}`, children: [_jsx("textarea", { value: editedDescription, onChange: (e) => setEditedDescription(e.target.value), onKeyDown: handleDescriptionKeyPress, className: "form-control", rows: 3, autoFocus: true }), _jsxs("div", { className: "d-flex gap-2", children: [_jsx("button", { onClick: saveDescription, className: "btn btn-success btn-sm", children: "Save" }), _jsx("button", { onClick: cancelEditDescription, className: "btn btn-secondary btn-sm", children: "Cancel" })] })] })) : null] }), _jsx("hr", { className: "bg-white border w-100 m-0 p-0" }), !location.pathname.includes("/products/user") && (_jsxs("div", { className: `d-flex w-100 justify-content-around align-items-center ${location.pathname === "/" ? "border" : ""} py-1`, children: [showBtn && (_jsx(Button, { text: "rent now", textColor: "black", backgroundColor: "orange", isBordered: false, onClick: handleClick, disabled: !available })), popularity !== undefined && _jsxs("p", { className: "card-text m-0 p-0 text-white", children: ["Popularity: ", popularity] })] })), showPrice && (_jsxs("div", { ref: priceRef, className: "card-text text-white position-relative", children: ["Price: ", price, "$/Day", (adminActions || adminDelete) && (_jsx("span", { onClick: editPrice, className: `position-absolute top-0 start-100 translate-middle badge rounded-pill bg-info ${styles.admin}`, style: { cursor: "pointer" }, children: "Edit" })), isEditingPrice ? (_jsxs("div", { className: `d-flex flex-column gap-2 mt-2 position-absolute bg-dark p-2 rounded top-0 start-100 translate-middle ${styles.editingCard}`, children: [_jsx("input", { type: "number", step: "0.01", min: "0", value: editedPrice, onChange: (e) => setEditedPrice(e.target.value), onKeyDown: handlePriceKeyPress, className: "form-control", autoFocus: true }), _jsxs("div", { className: "d-flex gap-2", children: [_jsx("button", { onClick: savePrice, className: "btn btn-success btn-sm", children: "Save" }), _jsx("button", { onClick: cancelEditPrice, className: "btn btn-secondary btn-sm", children: "Cancel" })] })] })) : null] })), !available && !location.pathname.includes("/products/user") && _jsx("p", { className: "text-danger my-2 mb-1", children: "Currently Unavailable" }), whoRented === user?._id && _jsx("p", { className: "text-white m-0 p-0", children: "You are the current renter" }), returnDate && location.pathname.includes("/products/user") && (_jsxs("div", { children: [_jsxs("p", { className: "text-white my-2", children: ["Return Date: ", new Date(returnDate).toLocaleDateString()] }), _jsxs("p", { className: "text-white", children: ["You have ", Math.floor((new Date(returnDate).getTime() - new Date().getTime()) / 1000 / 60 / 60 / 24), " days left"] })] })), showDeleteBtn && returnDate && (_jsxs("div", { className: "d-flex justify-content-center gap-3 flex-column align-items-center my-2", children: [_jsxs("p", { className: "text-white my-2", children: ["Return Date: ", new Date(returnDate).toLocaleDateString()] }), _jsx(Button, { text: "Delete", textColor: "white", backgroundColor: "red", isBordered: false, onClick: () => onDelete?.(productId) })] })), adminDelete && (_jsx("div", { className: "d-flex justify-content-center gap-3 flex-column align-items-center my-2", children: _jsx(Button, { text: "Delete", textColor: "white", backgroundColor: "red", isBordered: false, onClick: () => onDelete?.() }) }))] })] })] }));
}
export default ToolCard;
