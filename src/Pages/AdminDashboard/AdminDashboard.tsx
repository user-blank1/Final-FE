import { useNavigate } from "react-router";
import styles from "./AdminDashboard.module.scss";

function AdminDashboard() {
    const navigate = useNavigate();
    const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const from = e.currentTarget;
        const formData = new FormData(from);
        const action = formData.get("adminActions") as string;

        if (action === "Add Products") {
            navigate("/admin/add-product");
        } else if (action === "ManageUsers") {
            navigate("/admin/manage-users");
        } else if (action === "Edit Products") {
            navigate("/admin/edit-products");
        } else if (action === "rezervations") {
            navigate("/admin/rezervations");
        }
    };
    return (
        <div className={styles.adminDashboard}>
            <div className={`${styles.backButton}`} onClick={() => navigate(-1)}>
                <a href="#" className={`text-white`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="white" className="bi bi-arrow-left" viewBox="0 0 16 16">
                        <path
                            fillRule="evenodd"
                            d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                        />
                    </svg>
                </a>
            </div>
            <div className="d-flex w-100 h-100 flex-column justify-content-center align-items-center">
                <h1 className="text-white">Admin Dashboard</h1>
                <p className="text-white">Choose an action:</p>
                <form
                    className="d-flex gap-3 flex-column"
                    onSubmit={(e) => {
                        e.preventDefault();
                        formSubmit(e);
                    }}
                >
                    <select name="adminActions" className="form-select w-100 mb-3" aria-label="Admin actions">
                        <option defaultValue={"AddProducts"}> Add Products</option>
                        <option value="ManageUsers"> Manage Users</option>
                        <option value="Edit Products">Edit products</option>
                        <option value="rezervations">View Reservations</option>
                    </select>
                    <button className="btn btn-primary">Go</button>
                </form>
            </div>
        </div>
    );
}

export default AdminDashboard;
