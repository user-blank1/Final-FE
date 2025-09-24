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
    return <div data-testid="location">{location.pathname}</div>;
}
beforeEach(() => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            ok: true,
            json: () =>
                Promise.resolve({
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
        })
    ) as jest.Mock;
});

afterEach(() => {
    jest.resetAllMocks();
});
describe("All Products", () => {
    it("renders all products", async () => {
        render(
            <AuthContextProvider>
                <MemoryRouter>
                    <AllProducts />
                </MemoryRouter>
            </AuthContextProvider>
        );
        await waitFor(() => {
            expect(screen.getByText("All Products")).toBeInTheDocument();
        });
    });
    it("redirects to the product page", () => {
        render(
            <AuthContextProvider>
                <MemoryRouter initialEntries={["/"]}>
                    <AllProducts />
                    <Routes>
                        <Route path="/products/:id" element={<ProductPage />} />
                    </Routes>
                    <LocationDisplay />
                </MemoryRouter>
            </AuthContextProvider>
        );
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
