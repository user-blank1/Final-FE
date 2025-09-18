import styles from "./Navbar.module.scss";
import { Link } from "react-router";
import { useState, useEffect } from "react";
import Button from "../../../Components/Button";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useLogout } from "../../../hooks/useLogout";
function Navbar() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth < 992);
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    const { logout } = useLogout();

    const { user, token } = useAuthContext();

    console.log("Navbar user:", user);
    return (
        <nav className={`navbar px-4 navbar-expand-lg position-relative ${styles.navbar}`}>
            <div className="container-fluid">
                <Link className={`navbar-brand text-white ${styles["nav-item"]}`} to="/">
                    Best Rent
                </Link>

                <button
                    className={`navbar-toggler ${styles["navbar-toggler"]}`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav d-flex flex-column flex-lg-row align-items-center mx-auto mb-2 mb-lg-0 gap-4 ">
                        <li className="nav-item ">
                            <Link className={`nav-link  ${styles["nav-item"]}`} aria-current="page" to="/">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link  ${styles["nav-item"]}`} to="/contact">
                                Contact
                            </Link>
                        </li>
                        {!user && (
                            <li className={`nav-item`}>
                                <Link data-testid="navbar-about-link" className={`nav-link  ${styles["nav-item"]}`} to="/auth/login">
                                    Login
                                </Link>
                            </li>
                        )}
                        {!user && (
                            <li className={`nav-item`}>
                                <Link data-testid="navbar-about-link" className={`nav-link  ${styles["nav-item"]}`} to="/auth/signup">
                                    Sign Up
                                </Link>
                            </li>
                        )}
                        {user && (
                            <li className={`nav-item`}>
                                <div data-testid="navbar-about-link" className={`nav-link  ${styles["nav-item"]}`} onClick={logout}>
                                    Log Out
                                </div>
                            </li>
                        )}{" "}
                        {user && (
                            <li className={`nav-item`}>
                                <Link data-testid="navbar-about-link" className={`nav-link  ${styles["nav-item"]}`} to="/products/user">
                                    My Profile
                                </Link>
                            </li>
                        )}
                        {user && user.role === "admin" && (
                            <li className={`nav-item`}>
                                <Link data-testid="navbar-about-link" className={`nav-link  ${styles["nav-item"]}`} to="/admin">
                                    Admin Panel
                                </Link>
                            </li>
                        )}
                        {isMobile && <Button text="Get Started" isBordered={false} />}
                    </ul>
                    {isMobile && (
                        <div className="d-flex flex-column align-items-center">
                            <hr className="border border-2 w-100" />
                            <div className={`d-flex align-items-center gap-2  ${styles["contact-info"]}`}>
                                <a href="#" className={`d-flex align-items-center icon-link icon-link-hover text-white ${styles["nav-item"]}`}>
                                    Email@mail.com
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-envelope" viewBox="0 0 16 16">
                                        <path
                                            fill="white"
                                            d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"
                                        />
                                    </svg>
                                </a>
                            </div>
                            <div className={`d-flex align-items-center gap-2  ${styles["contact-info"]}`}>
                                <a href="#" className={`d-flex align-items-center icon-link icon-link-hover text-white 1875rem ${styles["nav-item"]}`}>
                                    +1 234 567 890
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        className="bi bi-telephone"
                                        viewBox="0 0 16 16"
                                    >
                                        <path
                                            fill="white"
                                            d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"
                                        />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    )}
                </div>
                {!isMobile && <Button text="Get Started" isBordered={false} />}
            </div>
        </nav>
    );
}
export default Navbar;
