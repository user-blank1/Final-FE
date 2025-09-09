import { Outlet } from "react-router-dom";
import { Navbar } from "../LayoutComponents/Navbar";
import Footer from "../LayoutComponents/Footer";
import styles from "./MainLayout.module.scss";
function MainLayout() {
    return (
        <div className={styles.mainLayout}>
            <Navbar />
            <div className={`${styles.content}`}>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}

export default MainLayout;
