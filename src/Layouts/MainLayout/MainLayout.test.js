import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter, useLocation } from "react-router";
import MainLayout from "./MainLayout";
import { Routes, Route } from "react-router-dom";
import WelcomePage from "@pages/Welcome/WelcomePage";
import EntryPage from "@pages/Welcome/EntryPage";
import { AuthContextProvider } from "../../context/AuthContext";
function LocationDisplay() {
    const location = useLocation();
    return _jsx("div", { "data-testid": "location", children: location.pathname });
}
test("MainLayout renders and navigation works", () => {
    render(_jsx(AuthContextProvider, { children: _jsxs(MemoryRouter, { children: [_jsx(MainLayout, {}), _jsx(LocationDisplay, {})] }) }));
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByTestId("location")).toHaveTextContent("/");
});
test("MainLayout with actual page components", () => {
    render(_jsx(AuthContextProvider, { children: _jsx(MemoryRouter, { initialEntries: ["/welcome"], children: _jsx(Routes, { children: _jsxs(Route, { path: "/", element: _jsx(MainLayout, {}), children: [_jsx(Route, { path: "welcome", element: _jsx(WelcomePage, {}) }), _jsx(Route, { path: "entry", element: _jsx(EntryPage, {}) })] }) }) }) }));
    expect(screen.getByText("Professional Tools when you need them")).toBeInTheDocument();
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByText("Get connected with us on social networks:")).toBeInTheDocument();
});
test("MainLayout with actual page components", () => {
    render(_jsx(AuthContextProvider, { children: _jsx(MemoryRouter, { initialEntries: ["/entry"], children: _jsx(Routes, { children: _jsxs(Route, { path: "/", element: _jsx(MainLayout, {}), children: [_jsx(Route, { path: "welcome", element: _jsx(WelcomePage, {}) }), _jsx(Route, { path: "entry", element: _jsx(EntryPage, {}) })] }) }) }) }));
    expect(screen.getByText("We provide the best tools for your needs.")).toBeInTheDocument();
});
