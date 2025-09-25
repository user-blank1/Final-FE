import { render, screen } from "@testing-library/react";
import { fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router";
import { AuthContextProvider } from "../../context/AuthContext";
import Login from "./Login";

test("Login component", () => {
    render(
        <AuthContextProvider>
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        </AuthContextProvider>
    );
    const form = screen.getByText(/Log In to Best Rent/i);
    expect(form).toBeInTheDocument();
});

test("input fields work", () => {
    render(
        <AuthContextProvider>
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        </AuthContextProvider>
    );
    const usernameInput = screen.getByTestId("username-input");
    const passwordInput = screen.getByTestId("password-input");
    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    expect((usernameInput as HTMLInputElement).value).toBe("testuser");
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    expect((passwordInput as HTMLInputElement).value).toBe("password123");
    const submitBtn = screen.getByTestId("login-submit-button");
    expect(submitBtn).toBeDisabled();
    fireEvent.change(passwordInput, { target: { value: "Password@123" } });
    expect((passwordInput as HTMLInputElement).value).toBe("Password@123");
    expect(submitBtn).not.toBeDisabled();
});
