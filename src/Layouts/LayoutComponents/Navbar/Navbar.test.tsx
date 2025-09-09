import { render, screen } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter, useLocation } from "react-router";
import Navbar from "./Navbar";

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
                <LocationDisplay />
            </MemoryRouter>
        );
        expect(screen.getByText("About")).toHaveAttribute("href", "/about");
        fireEvent.click(screen.getByText("About"));
        expect(screen.getByTestId("location")).toHaveTextContent("/about");
        expect(screen.getByText("About")).toBeInTheDocument();
    });
});
