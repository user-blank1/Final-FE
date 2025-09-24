import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router";
import { Routes, Route } from "react-router-dom";
test("renders contact route", () => {
    render(_jsx(MemoryRouter, { initialEntries: ["/contact"], children: _jsx(Routes, { children: _jsx(Route, { path: "/contact", element: _jsx("div", { children: "Contact Us" }) }) }) }));
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
});
test("renders about route", () => {
    render(_jsx(MemoryRouter, { initialEntries: ["/about"], children: _jsx(Routes, { children: _jsx(Route, { path: "/about", element: _jsx("div", { children: "About Us" }) }) }) }));
    expect(screen.getByText("About Us")).toBeInTheDocument();
});
