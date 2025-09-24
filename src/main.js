import { jsx as _jsx } from "react/jsx-runtime";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
createRoot(document.getElementById("root")).render(_jsx(StrictMode, { children: _jsx(AuthContextProvider, { children: _jsx(App, {}) }) }));
