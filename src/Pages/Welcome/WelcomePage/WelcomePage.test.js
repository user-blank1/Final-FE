import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import WelcomePage from "./WelcomePage";
test("renders WelcomePage component", () => {
    const { container } = render(_jsx(MemoryRouter, { children: _jsx(WelcomePage, {}) }));
    expect(screen.getByText("Professional Tools when you need them")).toBeInTheDocument();
    expect(screen.getByText("Fast Delivery")).toBeInTheDocument();
    const paragraph = container.querySelector("[data-testid='overlay-text']");
    expect(paragraph).toBeInTheDocument();
    expect(paragraph).toHaveTextContent("Ready to Pickup");
});
test("Browse Tools button is interactive", () => {
    const { container } = render(_jsx(MemoryRouter, { children: _jsx(WelcomePage, {}) }));
    const button = container.querySelector('[data-testid="browse-tools-button"]');
    expect(button).toBeInTheDocument();
    fireEvent.mouseEnter(button);
    fireEvent.mouseLeave(button);
    fireEvent.click(button);
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
});
