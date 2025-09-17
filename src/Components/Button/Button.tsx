import styles from "./Button.module.scss";
import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    isBordered: boolean;
    textColor?: string;
    backgroundColor?: string;
}

function Button({ text, isBordered, textColor, backgroundColor, ...props }: ButtonProps) {
    return (
        <button className={`${styles.button} ${isBordered ? "" : styles["not-bordered"]}`} style={{ color: textColor, backgroundColor }} {...props}>
            {text}
        </button>
    );
}

export default Button;
