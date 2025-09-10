import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter, useLocation } from "react-router";

import { Routes, Route } from "react-router-dom";

test("renders contact route", () => {
    render(
        <MemoryRouter initialEntries={["/contact"]}>
            <Routes>
                <Route path="/contact" element={<div>Contact Us</div>} />
            </Routes>
        </MemoryRouter>
    );
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
});
test("renders about route", () => {
    render(
        <MemoryRouter initialEntries={["/about"]}>
            <Routes>
                <Route path="/about" element={<div>About Us</div>} />
            </Routes>
        </MemoryRouter>
    );
    expect(screen.getByText("About Us")).toBeInTheDocument();
});
