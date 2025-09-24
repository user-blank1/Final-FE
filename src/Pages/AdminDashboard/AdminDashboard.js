import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router";
import styles from "./AdminDashboard.module.scss";
function AdminDashboard() {
    const navigate = useNavigate();
    const formSubmit = (e) => {
        e.preventDefault();
        const from = e.currentTarget;
        const formData = new FormData(from);
        const action = formData.get("adminActions");
        if (action === "Add Products") {
            navigate("/admin/add-product");
        }
        else if (action === "ManageUsers") {
            navigate("/admin/manage-users");
        }
        else if (action === "Edit Products") {
            navigate("/admin/edit-products");
        }
        else if (action === "rezervations") {
            navigate("/admin/rezervations");
        }
    };
    return (_jsxs("div", { className: styles.adminDashboard, children: [_jsx("div", { className: `${styles.backButton}`, onClick: () => navigate(-1), children: _jsx("a", { href: "#", className: `text-white`, children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "48", height: "48", fill: "white", className: "bi bi-arrow-left", viewBox: "0 0 16 16", children: _jsx("path", { fillRule: "evenodd", d: "M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" }) }) }) }), _jsxs("div", { className: "d-flex w-100 h-100 flex-column justify-content-center align-items-center", children: [_jsx("h1", { className: "text-white", children: "Admin Dashboard" }), _jsx("p", { className: "text-white", children: "Choose an action:" }), _jsxs("form", { className: "d-flex gap-3 flex-column", onSubmit: (e) => {
                            e.preventDefault();
                            formSubmit(e);
                        }, children: [_jsxs("select", { name: "adminActions", className: "form-select w-100 mb-3", "aria-label": "Admin actions", children: [_jsx("option", { defaultValue: "AddProducts", children: " Add Products" }), _jsx("option", { value: "ManageUsers", children: " Manage Users" }), _jsx("option", { value: "Edit Products", children: "Edit products" }), _jsx("option", { value: "rezervations", children: "View Reservations" })] }), _jsx("button", { className: "btn btn-primary", children: "Go" })] })] })] }));
}
export default AdminDashboard;
