import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function SuggestionCard({ icon, title, description }) {
    return (_jsxs("div", { className: "suggestion-card bg-black p-4 rounded-3", children: [_jsx("div", { className: "icon", children: icon }), _jsx("h3", { className: "text-light text-center", children: title }), _jsx("p", { className: "text-secondary", children: description })] }));
}
export default SuggestionCard;
