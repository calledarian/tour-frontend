import { Link } from "react-router-dom";
import { PackageEditForm } from "./packageEditForm";

export const PackageListItem = ({ pkg, editId, onEdit, onDelete, onSaveEdit, onCancelEdit }) => {
    return (
        <li className="tour-packages-item">
            <Link
                to={`/tours/${(pkg.id)}`}
                className="tour-packages-content-link"
                style={{ textDecoration: "none", color: "inherit" }}
            >
                <div className="tour-packages-image">
                    {pkg.images && pkg.images.length > 0 && (
                        <img
                            src={pkg.images[0]}
                            alt={pkg.title}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                borderRadius: "5px",
                            }}
                        />
                    )}
                </div>
                <div className="tour-packages-content">
                    <h3 className="tour-packages-item-title">{pkg.title}</h3>
                    <p className="tour-packages-item-text">Location: {pkg.location}</p>
                    <p className="tour-packages-item-text">Price: ${pkg.price}</p>
                    <p className="tour-packages-item-text">Duration: {pkg.duration}</p>
                    <Link
                        to={`/tours/${(pkg.id)}`}
                        className="tour-packages-content-link"
                        style={{ textDecoration: "none", color: "green", display: "block" }}
                    >
                        External Details
                    </Link>
                </div>
            </Link>

            <div className="tour-packages-actions">
                {editId === pkg.id ? (
                    <PackageEditForm
                        pkg={pkg}
                        onSave={onSaveEdit}
                        onCancel={onCancelEdit}
                    />
                ) : (
                    <>
                        <button
                            className="tour-packages-btn edit-btn"
                            onClick={(e) => {
                                e.stopPropagation();
                                onEdit(pkg);
                            }}
                        >
                            Edit
                        </button>
                        <button
                            className="tour-packages-btn delete-btn"
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete(pkg.id);
                            }}
                        >
                            Delete
                        </button>
                    </>
                )}
            </div>
        </li>
    );
};