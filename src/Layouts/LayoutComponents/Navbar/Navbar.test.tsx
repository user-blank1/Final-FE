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
    return <div data-testid="location">{location.pathname}</div>;
}
describe("Navbar", () => {
    it("renders the navbar", () => {
        render(
            <AuthContextProvider>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </AuthContextProvider>
        );
        expect(screen.getByText("Best Rent")).toBeInTheDocument();
    });
    it("redirects to the about page", () => {
        render(
            <AuthContextProvider>
                <MemoryRouter initialEntries={["/"]}>
                    <Navbar />
                    <Routes>
                        <Route path="/contact" element={<Contact />} />
                    </Routes>
                    <LocationDisplay />
                </MemoryRouter>
            </AuthContextProvider>
        );
        const aboutLink = screen.getByTestId("navbar-contact-link");
        expect(aboutLink).toBeInTheDocument();
        expect(aboutLink).toHaveAttribute("href", "/contact");
        fireEvent.click(aboutLink);
        expect(screen.getByTestId("location")).toHaveTextContent("/contact");
        expect(screen.getByText(/contact@anytown\.com/i)).toBeInTheDocument();
    });
});
