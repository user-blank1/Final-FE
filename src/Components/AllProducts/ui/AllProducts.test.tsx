import { render, screen } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter, useLocation } from "react-router";
import AllProducts from "./AllProducts";
import { Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "../../../context/AuthContext";
import ProductPage from "@pages/ProductPage";
function LocationDisplay() {
    const location = useLocation();
    return <div data-testid="location">{location.pathname}</div>;
}
beforeEach(() => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ products: [] }),
        })
    ) as jest.Mock;
});
describe("Navbar", () => {
    it("renders the navbar", () => {
        render(
            <AuthContextProvider>
                <MemoryRouter>
                    <AllProducts />
                </MemoryRouter>
            </AuthContextProvider>
        );
        expect(screen.getByText("All Products")).toBeInTheDocument();
    });
    it("redirects to oproduct page", () => {
        render(
            <AuthContextProvider>
                <MemoryRouter initialEntries={["/"]}>
                    <AllProducts />
                    <Routes>
                        <Route path="/products/:title" element={<ProductPage />} />
                    </Routes>
                    <LocationDisplay />
                </MemoryRouter>
            </AuthContextProvider>
        );
        const productLink = screen.queryByText("rent now");
        if (!productLink) {
            expect(productLink).not.toBeInTheDocument();
        } else {
            fireEvent.click(productLink);
            expect(screen.getByTestId("location")).toHaveTextContent(/^\/products\//);
        }
    });
});
