import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { fireEvent } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router";
import Footer from "../Footer";
function LocationDisplay() {
    const location = useLocation();
    return _jsx("div", { "data-testid": "location", children: location.pathname });
}
test("renders Footer component", () => {
    const { container } = render(_jsx(MemoryRouter, { children: _jsx(Footer, {}) }));
    const footer = container.querySelector("footer");
    expect(footer).toBeInTheDocument();
});
test("footer has correct text", () => {
    const { container } = render(_jsx(MemoryRouter, { children: _jsx(Footer, {}) }));
    const footer = container.querySelector("footer");
    expect(footer).toHaveTextContent(/company name/i);
});
test("navigation links work correctly", () => {
    const { container } = render(_jsxs(MemoryRouter, { initialEntries: ["/"], children: [_jsx(Footer, {}), _jsx(LocationDisplay, {})] }));
    const products = container.querySelector("[data-testid='footer-products-heading']");
    expect(products).toBeInTheDocument();
    expect(products).toHaveTextContent("Products");
    const aboutLink = screen.getByTestId("footer-about-link");
    fireEvent.click(aboutLink);
    expect(screen.getByTestId("location")).toHaveTextContent("/about");
});
