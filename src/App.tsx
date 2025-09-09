import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout/MainLayout";
import WelcomePage from "@pages/WelcomePage";
const pages = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { index: true, element: <WelcomePage /> },
            { path: "/about", element: <div>About Us</div> },
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
