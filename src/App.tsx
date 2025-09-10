import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout/MainLayout";
import Welcome from "@pages/Welcome";
const pages = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { index: true, element: <Welcome /> },
            { path: "/about", element: <div>Learn About Us</div> },
            { path: "/contact", element: <div>Contact Us</div> },
        ],
    },

    //   {
    //     path: "/admin",
    //     element: <AdminLayout />,
    //     children: [
    //       { index: true, element: <Home /> },
    //       { path: "*", element: <Klaida /> },
    //     ],
    //   },
]);
function App() {
    return <RouterProvider router={pages} />;
}

export default App;
