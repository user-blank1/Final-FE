import { render, screen } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter, useLocation } from "react-router";
import Navbar from "./Navbar";
import { Routes, Route } from "react-router-dom";

function LocationDisplay() {
    const location = useLocation();
    return <div data-testid="location">{location.pathname}</div>;
}
describe("Navbar", () => {
    it("renders the navbar", () => {
        render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        );
        expect(screen.getByText("Best Rent")).toBeInTheDocument();
    });
    it("redirects to the about page", () => {
        render(
            <MemoryRouter initialEntries={["/"]}>
                <Navbar />
                <Routes>
                    <Route path="/about" element={<div>Learn About Us</div>} />
                </Routes>
                <LocationDisplay />
            </MemoryRouter>
        );
        const aboutLink = screen.getByTestId("navbar-about-link");
        expect(aboutLink).toBeInTheDocument();
        expect(aboutLink).toHaveAttribute("href", "/about");
        fireEvent.click(aboutLink);
        expect(screen.getByTestId("location")).toHaveTextContent("/about");
        expect(screen.getByText("Learn About Us")).toBeInTheDocument();
    });
});
