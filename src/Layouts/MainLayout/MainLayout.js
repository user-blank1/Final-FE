import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from "react-router-dom";
import { Navbar } from "../LayoutComponents/Navbar";
import Footer from "../LayoutComponents/Footer";
import styles from "./MainLayout.module.scss";
function MainLayout() {
    return (_jsxs("div", { className: styles.mainLayout, children: [_jsx(Navbar, {}), _jsxs("div", { className: `${styles.content}`, children: [_jsx("hr", { className: "border border-2 m-0 p-0" }), _jsx(Outlet, {})] }), _jsx(Footer, {})] }));
}
export default MainLayout;
