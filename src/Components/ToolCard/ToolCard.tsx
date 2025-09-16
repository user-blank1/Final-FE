import styles from "./ToolCard.module.scss";
function ToolCard({ title, text, imgSrc }: { title: string; text: string; imgSrc: string }) {
    return (
        <div className={` border border-5 rounded-4 ${styles.card}`}>
            <div className=" h-75 w-100">
                <img src={imgSrc} className="h-100 w-100" alt={title} />
            </div>
            <div className="d-flex flex-column align-items-center h-25 pt-2">
                <h5 className="card-title text-white">{title}</h5>
                <p className="card-text text-white">{text}</p>
                <a href="#" className="btn btn-primary">
                    Rent Now
                </a>
            </div>
        </div>
    );
}

export default ToolCard;
