import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import Footer from "../Footer";

test("renders Footer component", () => {
    const { container } = render(<Footer />);
    const footer = container.querySelector("footer");
    expect(footer).toBeInTheDocument();
});

test("footer has correct text", () => {
    const { container } = render(<Footer />);
    const footer = container.querySelector("footer");
    expect(footer).toHaveTextContent(/company name/i);
});
