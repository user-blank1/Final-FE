import { Outlet } from "react-router-dom";
import { Navbar } from "../LayoutComponents/Navbar";
import Footer from "../LayoutComponents/Footer";
import styles from "./MainLayout.module.scss";
function MainLayout() {
    return (
        <div className={styles.mainLayout}>
            <Navbar />
            <div className={`${styles.content}`}>
                <hr className="border border-2 m-0 p-0" />
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}

export default MainLayout;
