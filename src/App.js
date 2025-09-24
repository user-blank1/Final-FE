import { jsx as _jsx } from "react/jsx-runtime";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout/MainLayout";
import Signup from "@components/Signup";
import AuthLayout from "./Layouts/AuthLayout/AuthLayout";
import Login from "@components/Login";
import Contact from "@pages/Contact";
import { HomeIndex } from "@components/RouterConfig/RouterConfig";
import { RequireAdmin } from "@components/RequireAdmin/RequireAdmin";
import AdminDashboard from "@pages/AdminDashboard/AdminDashboard";
import AddProduct from "@pages/AddProduct";
import ProductPage from "@pages/ProductPage";
import { RequireAuth } from "@components/RequireAuth/RequireAuth";
import UserPage from "@pages/UserPage";
import ManageUsers from "@pages/ManageUsers";
import EditUser from "@pages/EditUser";
import EditProducts from "@pages/EditProducts";
import Rezervations from "@pages/Rezervations";
const pages = createBrowserRouter([
    {
        path: "/",
        element: _jsx(MainLayout, {}),
        children: [
            { index: true, element: _jsx(HomeIndex, {}) },
            { path: "/about", element: _jsx("div", { style: { color: "white", height: "100vh" }, children: "Learn About Us" }) },
            { path: "/contact", element: _jsx(Contact, {}) },
            { path: "/products/:title", element: _jsx(ProductPage, {}) },
        ],
    },
    {
        path: "/products",
        element: _jsx(RequireAuth, {}),
        children: [
            {
                element: _jsx(MainLayout, {}),
                children: [
                    { path: ":title", element: _jsx(ProductPage, {}) },
                    {
                        path: "user",
                        element: _jsx(UserPage, {}),
                    },
                ],
            },
        ],
    },
    {
        path: "/auth",
        element: _jsx(AuthLayout, {}),
        children: [
            { path: "signup", element: _jsx(Signup, {}) },
            { path: "login", element: _jsx(Login, {}) },
        ],
    },
    {
        path: "/admin",
        element: _jsx(RequireAdmin, {}),
        children: [
            { index: true, element: _jsx(AdminDashboard, {}) },
            { path: "add-product", element: _jsx(AddProduct, {}) },
            { path: "manage-users", element: _jsx(ManageUsers, {}) },
            {
                path: "edit-user/:id",
                element: _jsx(MainLayout, {}),
                children: [{ index: true, element: _jsx(EditUser, {}) }],
            },
            {
                path: "edit-products",
                element: _jsx(MainLayout, {}),
                children: [{ index: true, element: _jsx(EditProducts, {}) }],
            },
            {
                path: "rezervations",
                element: _jsx(MainLayout, {}),
                children: [{ index: true, element: _jsx(Rezervations, {}) }],
            },
        ],
    },
]);
function App() {
    return _jsx(RouterProvider, { router: pages });
}
export default App;
