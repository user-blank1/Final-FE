import styles from "./WelcomePage.module.scss";
import img1 from "@assets/build.png";
function WelcomePage() {
    return (
        <div className={styles.container}>
            <hr className={`p-0 m-0 ${styles.hr}`}></hr>
            <div className="container-fluid bg-black py-4">
                <div className="row gap-5 gap-lg-0">
                    <div className={`col-lg-6 order-2 order-lg-1 ${styles["img-col"]}`}>
                        <div className={`${styles.imgContainer}`}>
                            <img src={img1} alt="Build" className={`${styles.image}`} />
                            <div className={`position-absolute${styles.overlay}`}></div>
                        </div>
                    </div>
                    <div className="col-lg-6 d-flex order-1 order-lg-2 flex-column justify-content-center align-items-center px-5">
                        <h1 className={`text-white ${styles.title}`}>Professional Tools when you need them</h1>
                        <p className="text-white ">
                            Access premium construction tools and equipment without the commitment of ownership. From power tools to heavy machinery, we provide
                            reliable rental solutions for contractors, DIY enthusiasts, and businesses of all sizes.
                        </p>
                        <button className={`btn btn-primary ${styles.button}`}>Learn More</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WelcomePage;
