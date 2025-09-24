import styles from "./WelcomePage.module.scss";
import img1 from "@assets/build.png";
import { useState } from "react";
import Button from "@components/Button";
function WelcomePage() {
    const [available] = useState(true);
    return (
        <div className={`${styles.container}  bg-black`}>
            <hr className={`p-0 m-0 ${styles.hr}`}></hr>
            <div className="container-fluid bg-black py-4 ">
                <div className="row gap-5 gap-lg-0 ">
                    <div className={`col-lg-6 order-2 order-lg-1    ${styles["img-col"]}`}>
                        <div className="row d-flex justify-content-center">
                            <div className={` col-10 h-100 b d-flex`}>
                                <div className={` ${styles.imgContainer} `}>
                                    <img src={img1} alt="Build" className={`${styles.image}  rounded rounded-3 `} />
                                    <div className={`position-absolute d-flex align-items-center gap-2 gap-lg-3 ${styles.overlay} z-3`}>
                                        <div className={available ? styles["circle"] : styles["circle-not-available"]}></div>
                                        <div className={`text-white ${styles.overlayContent}`}>
                                            <h3 className={`text-white fw-bold ${styles.overlayTitle}`}>Available Tools</h3>
                                            <p data-testid="overlay-text" className={`text-white fw-bold ${styles.overlayText}`}>
                                                Ready to Pickup
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`col-lg-6 d-flex order-1 order-lg-2 flex-column justify-content-center align-items-start px-5  ${styles["text-col"]}`}>
                        <h1 className={`text-white ${styles.title}`}>Professional Tools when you need them</h1>
                        <p className="text-white text-opacity-75">
                            Access premium construction tools and equipment without the commitment of ownership. From power tools to heavy machinery, we provide
                            reliable rental solutions for contractors, DIY enthusiasts, and businesses of all sizes.
                        </p>
                        <div className="d-flex gap-3">
                            <Button
                                className={`btn btn-primary ${styles.customButton}`}
                                text="Browse Tools"
                                isBordered={true}
                                data-testid="browse-tools-button"
                            />
                            <Button className={`btn btn-primary ${styles.customButton}`} text="Get Quote" isBordered={true} />
                        </div>
                        <div className="d-flex flex-column flex-sm-row justify-content-around w-100 mt-4 p-3 gap-3">
                            <div className="d-flex flex-column align-items-center">
                                <p className="text-white fs-4 fw-bold m-0 text-center">Fast Delivery</p>
                                <p className="text-white text-opacity-75">Order Now</p>
                            </div>
                            <div className="d-flex flex-column align-items-center">
                                <p className="text-white fs-4 fw-bold m-0 text-center">Quality Assurance</p>
                                <p className="text-white text-opacity-75">With Certificates</p>
                            </div>
                            <div className="d-flex flex-column align-items-center">
                                <p className="text-white fs-4 fw-bold m-0 text-center">24/7 Support</p>
                                <p className="text-white text-opacity-75">Chat now</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WelcomePage;
