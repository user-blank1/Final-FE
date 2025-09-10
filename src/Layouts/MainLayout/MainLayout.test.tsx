import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { fireEvent } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router";
import MainLayout from "./MainLayout";
import { Routes, Route } from "react-router-dom";
import WelcomePage from "@pages/Welcome/WelcomePage";
import EntryPage from "@pages/Welcome/EntryPage";

function LocationDisplay() {
    const location = useLocation();
    return <div data-testid="location">{location.pathname}</div>;
}

test("MainLayout renders and navigation works", () => {
    render(
        <MemoryRouter>
            <MainLayout />
            <LocationDisplay />
        </MemoryRouter>
    );
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByTestId("location")).toHaveTextContent("/");
});

test("MainLayout with actual page components", () => {
    render(
        <MemoryRouter initialEntries={["/welcome"]}>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route path="welcome" element={<WelcomePage />} />
                    <Route path="entry" element={<EntryPage />} />
                </Route>
            </Routes>
        </MemoryRouter>
    );

    expect(screen.getByText("Professional Tools when you need them")).toBeInTheDocument();
    expect(screen.getByRole("navigation")).toBeInTheDocument();

    expect(screen.getByText("Get connected with us on social networks:")).toBeInTheDocument();
});

test("MainLayout with actual page components", () => {
    render(
        <MemoryRouter initialEntries={["/entry"]}>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route path="welcome" element={<WelcomePage />} />
                    <Route path="entry" element={<EntryPage />} />
                </Route>
            </Routes>
        </MemoryRouter>
    );

    expect(screen.getByText("We provide the best tools for your needs.")).toBeInTheDocument();
});
