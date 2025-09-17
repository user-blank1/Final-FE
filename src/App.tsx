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
const pages = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { index: true, element: <HomeIndex /> },
            { path: "/about", element: <div>Learn About Us</div> },
            { path: "/contact", element: <Contact /> },
            { path: "/products/:title", element: <ProductPage /> },
        ],
    },
    {
        path: "/products",
        element: <RequireAuth />,
        children: [
            {
                element: <MainLayout />,
                children: [{ path: ":title", element: <ProductPage /> }],
            },
        ],
    },
    {
        path: "/auth",
        element: <AuthLayout />,
        children: [
            { path: "signup", element: <Signup /> },
            { path: "login", element: <Login /> },
        ],
    },

    {
        path: "/admin",
        element: <RequireAdmin />,
        children: [
            { index: true, element: <AdminDashboard /> },
            { path: "add-product", element: <AddProduct /> },
        ],
    },
]);
function App() {
    return <RouterProvider router={pages} />;
}

export default App;
