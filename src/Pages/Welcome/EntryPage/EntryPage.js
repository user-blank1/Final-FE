import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from "./EntryPage.module.scss";
import SuggestionCard from "@components/SuggestionCard";
const suggestionCardContent = [
    {
        icon: (_jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "28", height: "28", fill: "white", className: "bi bi-1-circle", viewBox: "0 0 16 16", children: _jsx("path", { d: "M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M9.283 4.002V12H7.971V5.338h-.065L6.072 6.656V5.385l1.899-1.383z" }) })),
        title: "Quality Guaranteed",
        description: "All tools are professionally maintained and tested before each rental.",
    },
    {
        icon: (_jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "28", height: "28", fill: "white", className: "bi bi-2-circle", viewBox: "0 0 16 16", children: _jsx("path", { d: "M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M6.646 6.24v.07H5.375v-.064c0-1.213.879-2.402 2.637-2.402 1.582 0 2.613.949 2.613 2.215 0 1.002-.6 1.667-1.287 2.43l-.096.107-1.974 2.22v.077h3.498V12H5.422v-.832l2.97-3.293c.434-.475.903-1.008.903-1.705 0-.744-.557-1.236-1.313-1.236-.843 0-1.336.615-1.336 1.306" }) })),
        title: "Flexible Rental",
        description: "Daily, weekly, or monthly rentals to fit your project timeline.",
    },
    {
        icon: (_jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "28", height: "28", fill: "white", className: "bi bi-3-circle", viewBox: "0 0 16 16", children: [_jsx("path", { d: "M7.918 8.414h-.879V7.342h.838c.78 0 1.348-.522 1.342-1.237 0-.709-.563-1.195-1.348-1.195-.79 0-1.312.498-1.348 1.055H5.275c.036-1.137.95-2.115 2.625-2.121 1.594-.012 2.608.885 2.637 2.062.023 1.137-.885 1.776-1.482 1.875v.07c.703.07 1.71.64 1.734 1.917.024 1.459-1.277 2.396-2.93 2.396-1.705 0-2.707-.967-2.754-2.144H6.33c.059.597.68 1.06 1.541 1.066.973.006 1.6-.563 1.588-1.354-.006-.779-.621-1.318-1.541-1.318" }), _jsx("path", { d: "M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8" })] })),
        title: "Expert Support",
        description: "Get guidance on tool selection and usage from our experienced team.",
    },
];
function EntryPage() {
    return (_jsxs("div", { className: styles.container, children: [_jsxs("div", { className: "mt-5", children: [_jsx("h1", { className: "text-white text-center", children: "Why Choose Us?" }), _jsx("p", { className: "text-center text-secondary", children: "We provide the best tools for your needs." })] }), _jsx("hr", { className: "border" }), _jsx("div", { className: "d-flex flex-column flex-lg-row justify-content-around gap-4", children: suggestionCardContent.map((card, index) => (_jsx(SuggestionCard, { icon: card.icon, title: card.title, description: card.description }, index))) })] }));
}
export default EntryPage;
