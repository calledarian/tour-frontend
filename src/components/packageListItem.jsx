import { Link } from "react-router-dom";
import { PackageEditForm } from "./packageEditForm";
import { Pencil, Trash2 } from "lucide-react";
import "../styles/packageListItem.css";

export const PackageListItem = ({ pkg, editId, onEdit, onDelete, onSaveEdit, onCancelEdit }) => {
    return (
        <li className="package-item">
            <Link to={`/tours/${pkg.id}`} className="package-link">
                <div className="package-image">
                    {pkg.images?.length > 0 && (
                        <img
                            src={pkg.images[0]}
                            alt={pkg.title}
                            className="package-img"
                        />
                    )}
                </div>
                <div className="package-details">
                    <p className="package-id">Tour Id: {pkg.id}</p>
                    <h3 className="package-title">{pkg.title}</h3>
                    <p className="package-text">Location: {pkg.location}</p>
                    <p className="package-text">Price: ${pkg.price}</p>
                    <p className="package-text">Duration: {pkg.duration} day(s)</p>
                    <span className="external-link">External Details →</span>
                </div>
            </Link>

            <div className="package-actions">
                {editId === pkg.id ? (
                    <PackageEditForm
                        pkg={pkg}
                        onSave={onSaveEdit}
                        onCancel={onCancelEdit}
                    />
                ) : (
                    <>
                        <button
                            className="action-btn edit"
                            onClick={(e) => {
                                e.stopPropagation();
                                onEdit(pkg);
                            }}
                        >
                            <Pencil size={16} /> Edit
                        </button>
                        <button
                            className="action-btn delete"
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete(pkg.id);
                            }}
                        >
                            <Trash2 size={16} /> Delete
                        </button>
                    </>
                )}
            </div>
        </li>
    );
};
