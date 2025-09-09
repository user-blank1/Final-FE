import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout/MainLayout";
const pages = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            // { index: true, element: <MainPage /> },
            { path: "/about", element: <div>About Us</div> },
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
