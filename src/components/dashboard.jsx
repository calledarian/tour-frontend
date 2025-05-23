import { useState } from "react";
import { usePackages } from "../hooks/usePackages";
import '../styles/dashboard.css';
import { CreatePackageForm } from "./createPackageForm";
import { PackagesList } from "./packageList";
import AdminBookings from "./bookingsManage";

export default function Dashboard() {
    const { packages, loading, error, deletePackage, updatePackage, addPackage, getAuthHeaders } = usePackages();
    const [editId, setEditId] = useState(null);

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    const handleEdit = (pkg) => {
        setEditId(pkg.id);
    };

    const handleCancelEdit = () => {
        setEditId(null);
    };

    const handleSaveEdit = async (id, editFormData) => {
        try {
            await updatePackage(id, editFormData);
            setEditId(null);
        } catch (err) {
            // Error handling is done in the hook
        }
    };

    if (loading) return <p>Loading packages...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="create-package-container">
            <button
                onClick={handleLogout}
                style={{
                    padding: "8px 16px",
                    backgroundColor: "crimson",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    marginBottom: "20px",
                }}
            >
                Logout
            </button>

            <CreatePackageForm
                onPackageCreated={addPackage}
                getAuthHeaders={getAuthHeaders}
            />

            <PackagesList
                packages={packages}
                editId={editId}
                onEdit={handleEdit}
                onDelete={deletePackage}
                onSaveEdit={handleSaveEdit}
                onCancelEdit={handleCancelEdit}
            />

            <AdminBookings />
        </div>
    );
}