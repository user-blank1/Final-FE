import styles from "./WelcomePage.module.scss";
import img1 from "@assets/build.png";
import { useState } from "react";
function WelcomePage() {
    const [available, setAvailable] = useState(true);
    return (
        <div className={`${styles.container}  bg-black`}>
            <hr className={`p-0 m-0 ${styles.hr}`}></hr>
            <div className="container-fluid bg-black py-4 ">
                <div className="row gap-5 gap-lg-0 ">
                    <div className={`col-lg-6 order-2 order-lg-1    ${styles["img-col"]}`}>
                        <div className="row d-flex justify-content-center">
                            <div className={`col-lg-7 col-9 h-100`}>
                                <div className={` ${styles.imgContainer} `}>
                                    <img src={img1} alt="Build" className={`${styles.image}  rounded rounded-3 `} />
                                    <div className={`position-absolute d-flex align-items-center gap-2 gap-lg-3 ${styles.overlay} z-3`}>
                                        <div className={available ? styles["circle"] : styles["circle-not-available"]}></div>
                                        <div className={`text-white ${styles.overlayContent}`}>
                                            <h3 className={`text-white fw-bold ${styles.overlayTitle}`}>Available Tools</h3>
                                            <p className={`text-white fw-bold ${styles.overlayText}`}>Ready to Pickup</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 d-flex order-1 order-lg-2 flex-column justify-content-center align-items-center px-5">
                        <h1 className={`text-white ${styles.title}`}>Professional Tools when you need them</h1>
                        <p className="text-white text-opacity-75">
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
