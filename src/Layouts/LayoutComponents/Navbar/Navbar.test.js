import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { render, screen } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter, useLocation } from "react-router";
import Navbar from "./Navbar";
import { Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "../../../context/AuthContext";
import Contact from "@pages/Contact/Contact";
function LocationDisplay() {
    const location = useLocation();
    return _jsx("div", { "data-testid": "location", children: location.pathname });
}
describe("Navbar", () => {
    it("renders the navbar", () => {
        render(_jsx(AuthContextProvider, { children: _jsx(MemoryRouter, { children: _jsx(Navbar, {}) }) }));
        expect(screen.getByText("Best Rent")).toBeInTheDocument();
    });
    it("redirects to the about page", () => {
        render(_jsx(AuthContextProvider, { children: _jsxs(MemoryRouter, { initialEntries: ["/"], children: [_jsx(Navbar, {}), _jsx(Routes, { children: _jsx(Route, { path: "/contact", element: _jsx(Contact, {}) }) }), _jsx(LocationDisplay, {})] }) }));
        const aboutLink = screen.getByTestId("navbar-contact-link");
        expect(aboutLink).toBeInTheDocument();
        expect(aboutLink).toHaveAttribute("href", "/contact");
        fireEvent.click(aboutLink);
        expect(screen.getByTestId("location")).toHaveTextContent("/contact");
        expect(screen.getByText(/contact@anytown\.com/i)).toBeInTheDocument();
    });
});
