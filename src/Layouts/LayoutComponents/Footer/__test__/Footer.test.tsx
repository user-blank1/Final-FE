import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { fireEvent } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router";
import Footer from "../Footer";
function LocationDisplay() {
    const location = useLocation();
    return <div data-testid="location">{location.pathname}</div>;
}
test("renders Footer component", () => {
    const { container } = render(
        <MemoryRouter>
            <Footer />
        </MemoryRouter>
    );
    const footer = container.querySelector("footer");
    expect(footer).toBeInTheDocument();
});

test("footer has correct text", () => {
    const { container } = render(
        <MemoryRouter>
            <Footer />
        </MemoryRouter>
    );
    const footer = container.querySelector("footer");
    expect(footer).toHaveTextContent(/company name/i);
});

test("navigation links work correctly", () => {
    const { container } = render(
        <MemoryRouter initialEntries={["/"]}>
            <Footer />
            <LocationDisplay />
        </MemoryRouter>
    );
    const products = container.querySelector("[data-testid='footer-products-heading']");
    expect(products).toBeInTheDocument();
    expect(products).toHaveTextContent("Products");
    const aboutLink = screen.getByTestId("footer-about-link");
    fireEvent.click(aboutLink);
    expect(screen.getByTestId("location")).toHaveTextContent("/about");
});
