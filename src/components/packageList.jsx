import { PackageListItem } from "./packageListItem";
import { PackageSearch } from "lucide-react"; // optional icon for title
import "../styles/packageList.css";

export const PackagesList = ({ packages, editId, onEdit, onDelete, onSaveEdit, onCancelEdit }) => {
    if (packages.length === 0) {
        return <p className="empty-message">No packages available.</p>;
    }

    return (
        <div className="tour-packages-container">
            <h2 className="tour-packages-title">
                <PackageSearch size={20} /> Tour Packages
            </h2>
            <ul className="tour-packages-list">
                {packages.map((pkg) => (
                    <PackageListItem
                        key={pkg.id}
                        pkg={pkg}
                        editId={editId}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onSaveEdit={onSaveEdit}
                        onCancelEdit={onCancelEdit}
                    />
                ))}
            </ul>
        </div>
    );
};
