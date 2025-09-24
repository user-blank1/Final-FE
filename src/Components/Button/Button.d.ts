import type { ButtonHTMLAttributes } from "react";
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    isBordered: boolean;
    textColor?: string;
    backgroundColor?: string;
}
declare function Button({ text, isBordered, textColor, backgroundColor, ...props }: ButtonProps): import("react/jsx-runtime").JSX.Element;
export default Button;
