import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const pages = createBrowserRouter([
    {
        path: "/",
        element: <div>Main Layout</div>,
        children: [
            // { index: true, element: <MainPage /> },
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
