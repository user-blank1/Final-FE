import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { render, screen, waitFor } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter, useLocation } from "react-router";
import AllProducts from "./AllProducts";
import { Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "../../../context/AuthContext";
import ProductPage from "@pages/ProductPage";
function LocationDisplay() {
    const location = useLocation();
    return _jsx("div", { "data-testid": "location", children: location.pathname });
}
beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
            products: [
                {
                    _id: "1",
                    name: "Hammer",
                    description: "A strong hammer.",
                    imageUrl: "hammer.png",
                    price: 10,
                    available: true,
                },
            ],
        }),
    }));
});
afterEach(() => {
    jest.resetAllMocks();
});
describe("All Products", () => {
    it("renders all products", async () => {
        render(_jsx(AuthContextProvider, { children: _jsx(MemoryRouter, { children: _jsx(AllProducts, {}) }) }));
        await waitFor(() => {
            expect(screen.getByText("All Products")).toBeInTheDocument();
        });
    });
    it("redirects to the product page", () => {
        render(_jsx(AuthContextProvider, { children: _jsxs(MemoryRouter, { initialEntries: ["/"], children: [_jsx(AllProducts, {}), _jsx(Routes, { children: _jsx(Route, { path: "/products/:id", element: _jsx(ProductPage, {}) }) }), _jsx(LocationDisplay, {})] }) }));
        const rentBtn = screen.queryByText("rent now");
        if (rentBtn === null) {
            expect(rentBtn).not.toBeInTheDocument();
            return;
        }
        expect(rentBtn).toHaveAttribute("href", "/contact");
        fireEvent.click(rentBtn);
        expect(screen.getByText(/Price:/i)).toBeInTheDocument();
        expect(screen.getByText(/\/Day/i)).toBeInTheDocument();
    });
});
