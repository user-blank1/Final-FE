import { useState } from "react";

export function useEditReturnDate(returnDate: string | undefined, productId: string | undefined, token: string | undefined, isLoading: boolean) {
    const [editedReturnDate, setEditedReturnDate] = useState(returnDate ? returnDate.slice(0, 16) : "");
    const [isEditingReturnDate, setIsEditingReturnDate] = useState(false);

    const editReturnDate = () => {
        setIsEditingReturnDate(true);
        setEditedReturnDate(returnDate ? returnDate.slice(0, 16) : "");
    };
    const cancelEditReturnDate = () => {
        setIsEditingReturnDate(false);
        setEditedReturnDate(returnDate ? returnDate.slice(0, 16) : "");
    };
    const handleReturnDateKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            saveReturnDate();
        } else if (e.key === "Escape") {
            cancelEditReturnDate();
        }
    };
    const saveReturnDate = async () => {
        if (!editedReturnDate || !token || !productId || isLoading) return;
        const res = await fetch(`https://final-be-production-ddac.up.railway.app/api/products/edit/returndate/${productId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ newReturnDate: new Date(editedReturnDate).toISOString() }),
        });
        const json = await res.json();
        if (!res.ok) {
            alert(json.message || "Failed to update return date");
            setEditedReturnDate(returnDate ? returnDate.slice(0, 16) : "");
        }
        if (res.ok) {
            alert("Return date updated successfully");
            setIsEditingReturnDate(false);
        }
        window.location.reload();
    };

    return {
        editedReturnDate,
        setEditedReturnDate,
        isEditingReturnDate,
        editReturnDate,
        cancelEditReturnDate,
        handleReturnDateKeyPress,
        saveReturnDate,
    };
}
