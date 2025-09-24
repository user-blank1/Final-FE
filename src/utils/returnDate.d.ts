export declare function useEditReturnDate(returnDate: string | undefined, productId: string | undefined, token: string | undefined, isLoading: boolean): {
    editedReturnDate: string;
    setEditedReturnDate: import("react").Dispatch<import("react").SetStateAction<string>>;
    isEditingReturnDate: boolean;
    editReturnDate: () => void;
    cancelEditReturnDate: () => void;
    handleReturnDateKeyPress: (e: React.KeyboardEvent) => void;
    saveReturnDate: () => Promise<void>;
};
