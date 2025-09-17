import styles from "./Contact.module.scss";
function Contact() {
    return (
        <div className={styles.contact}>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1194745.2100103782!2d-31.427613215806453!3d82.93751253731469!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1slt!2slt!4v1757954181396!5m2!1slt!2slt"
                width="600"
                height="450"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div className={``}>
                <p className="text-white mt-4 text-center">Visit us</p>
                <p className="text-white text-center">123 Main St, Anytown, USA</p>
                <p className="text-white text-center">Phone: (123) 456-7890</p>
                <p className="text-white text-center">Email: contact@anytown.com</p>
            </div>
        </div>
    );
}

export default Contact;
