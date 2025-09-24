import { jsx as _jsx } from "react/jsx-runtime";
import styles from "./Button.module.scss";
function Button({ text, isBordered, textColor, backgroundColor, ...props }) {
    return (_jsx("button", { className: `${styles.button} ${isBordered ? "" : styles["not-bordered"]} ${props.disabled ? styles.disabled : ""}`, style: { color: textColor, backgroundColor }, ...props, children: text }));
}
export default Button;
