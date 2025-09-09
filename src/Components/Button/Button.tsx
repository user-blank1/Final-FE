import styles from "./Button.module.scss";
import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    isBordered: boolean;
}

function Button({ text, isBordered, ...props }: ButtonProps) {
    return (
        <button className={`${styles.button} ${isBordered ? "" : styles["not-bordered"]}`} {...props}>
            {text}
        </button>
    );
}

export default Button;
